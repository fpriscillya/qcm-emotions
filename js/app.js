/* QCM Émotions et apprentissage : application de révision
   Charge data/manifest.js puis chaque fichier de semaine qui y est listé.
   Aucune dépendance externe : fonctionne sur GitHub Pages et en file://. */
(function () {
  "use strict";

  var VERSION = "1.0.0";
  var STORE_KEY = "qcm-emoapp-progress-v1";
  var PREF_KEY = "qcm-emoapp-prefs-v1";
  var CODE_PREFIX = "QCMEA1:";
  var EXAM_SECONDS_PER_Q = 100; // 30 questions en 50 minutes, comme au QCM du cours
  var REQUEUE_GAP = 4;          // une question ratée revient 4 questions plus loin
  var LETTERS = "ABCDEFGHIJ";

  var app = document.getElementById("app");

  var state = {
    bank: [],
    byId: {},
    invalid: [],
    failedFiles: [],
    progress: {},
    storageOk: true,
    prefs: { mode: "practice", filter: "all", week: "", topic: "", count: "20", timer: true },
    session: null,
    browse: { q: "", week: "", topic: "", status: "" },
    timerId: null
  };

  /* ---------------------------------------------------------------- */
  /* Utilitaires                                                       */
  /* ---------------------------------------------------------------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function range(n) { var r = []; for (var i = 0; i < n; i++) r.push(i); return r; }

  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    var s = {};
    a.forEach(function (x) { s[x] = true; });
    return b.every(function (x) { return s[x]; });
  }

  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    return Math.floor(sec / 60) + ":" + pad2(sec % 60);
  }

  function plural(n, one, many) { return n + " " + (n > 1 ? many : one); }

  /* ---------------------------------------------------------------- */
  /* Stockage local                                                    */
  /* ---------------------------------------------------------------- */

  function readJSON(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      state.storageOk = false;
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      state.storageOk = false;
      return false;
    }
  }

  function saveProgress() { writeJSON(STORE_KEY, state.progress); }
  function savePrefs() { writeJSON(PREF_KEY, state.prefs); }

  function record(id, ok) {
    var p = state.progress[id] || { a: 0, c: 0, m: false, last: 0, t: 0 };
    p.a += 1;
    if (ok) { p.c += 1; p.m = false; p.last = 1; }
    else { p.m = true; p.last = 0; }
    p.t = Date.now();
    state.progress[id] = p;
  }

  function isMissed(id) { var p = state.progress[id]; return !!(p && p.m); }
  function isMastered(id) { var p = state.progress[id]; return !!(p && p.last === 1 && !p.m); }
  function isSeen(id) { return !!state.progress[id]; }

  /* Code d'export : préfixe + JSON encodé en base64 (UTF-8). */
  function encodeCode(obj) {
    var json = JSON.stringify(obj);
    var bytes = new TextEncoder().encode(json);
    var bin = "";
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return CODE_PREFIX + btoa(bin);
  }

  function decodeCode(code) {
    var c = String(code || "").replace(/\s+/g, "");
    if (c.indexOf(CODE_PREFIX) !== 0) throw new Error("prefix");
    var bin = atob(c.slice(CODE_PREFIX.length));
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    var obj = JSON.parse(new TextDecoder().decode(bytes));
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) throw new Error("shape");
    return obj;
  }

  function mergeProgress(incoming) {
    var added = 0;
    Object.keys(incoming).forEach(function (id) {
      var p = incoming[id];
      if (!p || typeof p !== "object" || typeof p.t !== "number") return;
      var cur = state.progress[id];
      if (!cur || p.t > cur.t) {
        state.progress[id] = {
          a: +p.a || 0, c: +p.c || 0, m: !!p.m, last: p.last === 1 ? 1 : 0, t: p.t
        };
        added += 1;
      }
    });
    saveProgress();
    return added;
  }

  /* ---------------------------------------------------------------- */
  /* Chargement des données                                            */
  /* ---------------------------------------------------------------- */

  function loadScript(src) {
    return new Promise(function (resolve) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = function () { resolve(true); };
      s.onerror = function () { resolve(false); };
      document.body.appendChild(s);
    });
  }

  function validate(raw) {
    var seen = {};
    var ok = [];
    (raw || []).forEach(function (q, i) {
      var why = null;
      if (!q || typeof q !== "object") why = "entrée vide";
      else if (typeof q.id !== "string" || !/^w\d{2}-q\d{2,3}$/.test(q.id)) why = "id absent ou mal formé";
      else if (seen[q.id]) why = "id en double";
      else if (typeof q.question !== "string" || !q.question.trim()) why = "question vide";
      else if (!Array.isArray(q.options) || q.options.length < 2) why = "moins de 2 options";
      else if (!Array.isArray(q.correct) || !q.correct.length) why = "aucune bonne réponse";
      else if (q.correct.some(function (c) { return typeof c !== "number" || c < 0 || c >= q.options.length || c % 1 !== 0; })) why = "indice de bonne réponse hors limites";
      if (why) {
        state.invalid.push({ id: (q && q.id) || "entrée n°" + (i + 1), why: why });
        return;
      }
      seen[q.id] = true;
      ok.push({
        id: q.id,
        week: +q.week || +q.id.slice(1, 3),
        topic: q.topic || "Sans thème",
        source: q.source || "student",
        variantOf: q.variantOf || "",
        question: q.question,
        options: q.options.map(String),
        correct: q.correct.slice().sort(function (a, b) { return a - b; }),
        explanation: q.explanation || "",
        distractors: q.distractors || {},
        ref: q.ref || "",
        status: ["ok", "disputed", "unverified"].indexOf(q.status) >= 0 ? q.status : "ok",
        note: q.note || ""
      });
    });
    return ok;
  }

  function boot() {
    state.progress = readJSON(STORE_KEY, {}) || {};
    var savedPrefs = readJSON(PREF_KEY, null);
    if (savedPrefs && typeof savedPrefs === "object") {
      Object.keys(state.prefs).forEach(function (k) {
        if (savedPrefs[k] !== undefined) state.prefs[k] = savedPrefs[k];
      });
    }
    // Test d'écriture : certains navigateurs bloquent le stockage en file://
    writeJSON("qcm-emoapp-probe", 1);

    var files = window.QCM_MANIFEST;
    if (!Array.isArray(files)) {
      renderFatal("Le fichier data/manifest.js est introuvable ou ne définit pas window.QCM_MANIFEST.");
      return;
    }

    window.QCM_BANK = [];
    files.reduce(function (p, f) {
      return p.then(function () {
        return loadScript("data/" + f).then(function (ok) { if (!ok) state.failedFiles.push(f); });
      });
    }, Promise.resolve()).then(function () {
      state.bank = validate(window.QCM_BANK);
      state.bank.sort(function (a, b) { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0; });
      state.bank.forEach(function (q) { state.byId[q.id] = q; });
      if (state.invalid.length && window.console) console.warn("Questions ignorées :", state.invalid);
      if (!state.bank.length) {
        renderFatal("Aucune question valide n'a été chargée. Vérifiez les fichiers listés dans data/manifest.js.");
        return;
      }
      renderHome();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Sélection des questions                                           */
  /* ---------------------------------------------------------------- */

  function weeks() {
    var w = {};
    state.bank.forEach(function (q) { w[q.week] = true; });
    return Object.keys(w).map(Number).sort(function (a, b) { return a - b; });
  }

  function topics() {
    var t = {};
    state.bank.forEach(function (q) { t[q.topic] = (t[q.topic] || 0) + 1; });
    return Object.keys(t).sort(function (a, b) { return a.localeCompare(b, "fr"); }).map(function (k) { return { name: k, n: t[k] }; });
  }

  function pool(prefs) {
    var p = prefs || state.prefs;
    return state.bank.filter(function (q) {
      switch (p.filter) {
        case "week": return String(q.week) === String(p.week);
        case "topic": return q.topic === p.topic;
        case "missed": return isMissed(q.id);
        case "disputed": return q.status === "disputed";
        case "unverified": return q.status === "unverified";
        default: return true;
      }
    });
  }

  /* Priorité : à revoir, puis jamais vues, puis le reste (ordre aléatoire dans chaque groupe). */
  function pickQuestions(list, count) {
    var shuffled = shuffle(list);
    var rank = function (q) { return isMissed(q.id) ? 0 : !isSeen(q.id) ? 1 : 2; };
    shuffled.sort(function (a, b) { return rank(a) - rank(b); });
    var n = count === "all" ? shuffled.length : Math.min(+count || 20, shuffled.length);
    return shuffle(shuffled.slice(0, n));
  }

  function makeItem(q, again) {
    return { id: q.id, order: shuffle(range(q.options.length)), again: !!again, picked: [], done: false, ok: null };
  }

  /* ---------------------------------------------------------------- */
  /* Rendu : éléments partagés                                         */
  /* ---------------------------------------------------------------- */

  function waveSVG(alignment) {
    var a = Math.max(0, Math.min(1, alignment || 0));
    var phase = (1 - a) * Math.PI;
    var W = 480, H = 64, mid = H / 2, amp = 15, lambda = 80;
    function path(ph) {
      var d = "";
      for (var x = 0; x <= W + lambda; x += 4) {
        var y = mid + amp * Math.sin((2 * Math.PI * x) / lambda + ph);
        d += (x === 0 ? "M" : "L") + x + " " + y.toFixed(2) + " ";
      }
      return d;
    }
    return '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
      '<g class="drift"><path class="wave wave-b" d="' + path(phase) + '"/><path class="wave wave-a" d="' + path(0) + '"/></g></svg>';
  }

  function statusBadge(q) {
    if (q.status === "disputed") return '<span class="badge badge-disputed">Contestée</span>';
    if (q.status === "unverified") return '<span class="badge badge-unverified">Non vérifiée</span>';
    return "";
  }

  function sourceBadge(q) {
    if (q.source === "generated") return '<span class="badge badge-generated">Question ajoutée</span>';
    if (q.source === "variant") return '<span class="badge badge-generated">Variante</span>';
    return "";
  }

  function stopTimer() {
    if (state.timerId) { clearInterval(state.timerId); state.timerId = null; }
  }

  function renderFatal(msg) {
    app.innerHTML = '<div class="wrap"><header class="masthead"><h1>Émotions et apprentissage</h1></header>' +
      '<p class="notice is-error">' + esc(msg) + "</p>" +
      '<footer class="footer"><span>Version ' + VERSION + "</span></footer></div>";
  }

  /* ---------------------------------------------------------------- */
  /* Accueil                                                           */
  /* ---------------------------------------------------------------- */

  function renderHome() {
    stopTimer();
    state.session = null;
    var total = state.bank.length;
    var mastered = state.bank.filter(function (q) { return isMastered(q.id); }).length;
    var missed = state.bank.filter(function (q) { return isMissed(q.id); }).length;
    var disputed = state.bank.filter(function (q) { return q.status === "disputed"; }).length;
    var unverified = state.bank.filter(function (q) { return q.status === "unverified"; }).length;
    var ratio = total ? mastered / total : 0;
    var p = state.prefs;
    var ws = weeks();
    var ts = topics();
    if (!p.week || ws.indexOf(+p.week) < 0) p.week = String(ws[ws.length - 1]);
    if (!p.topic || !ts.some(function (t) { return t.name === p.topic; })) p.topic = ts[0].name;

    var avail = pool().length;
    var n = p.count === "all" ? avail : Math.min(+p.count, avail);

    var notices = "";
    if (!state.storageOk) notices += '<p class="notice">La progression ne peut pas être enregistrée dans ce navigateur. Utilisez la version en ligne (GitHub Pages) ou exportez votre code avant de fermer.</p>';
    if (state.failedFiles.length) notices += '<p class="notice is-error">Fichier(s) introuvable(s) : ' + esc(state.failedFiles.join(", ")) + ". Vérifiez data/manifest.js.</p>";
    if (state.invalid.length) notices += '<p class="notice">' + plural(state.invalid.length, "question ignorée", "questions ignorées") + " (format invalide) : " + esc(state.invalid.map(function (x) { return x.id + " (" + x.why + ")"; }).join(" ; ")) + "</p>";

    function choice(value, label, count, extra) {
      var checked = p.filter === value ? " checked" : "";
      var empty = count === 0 ? " is-empty" : "";
      return '<label class="choice' + empty + '"><input type="radio" name="filter" value="' + value + '"' + checked + ' data-action="filter">' +
        "<span>" + label + "</span>" + (count != null ? '<span class="n">' + count + "</span>" : "<span></span>") + (extra || "") + "</label>";
    }

    var weekSelect = '<select data-action="week" aria-label="Semaine">' + ws.map(function (w) {
      var c = state.bank.filter(function (q) { return q.week === w; }).length;
      return '<option value="' + w + '"' + (String(w) === String(p.week) ? " selected" : "") + ">Semaine " + w + " (" + c + ")</option>";
    }).join("") + "</select>";

    var topicSelect = '<select data-action="topic" aria-label="Thème">' + ts.map(function (t) {
      return '<option value="' + esc(t.name) + '"' + (t.name === p.topic ? " selected" : "") + ">" + esc(t.name) + " (" + t.n + ")</option>";
    }).join("") + "</select>";

    var modeHelp = p.mode === "practice"
      ? "La correction et l'explication s'affichent après chaque réponse. Une question ratée revient plus loin dans la session."
      : "Aucune correction pendant l'épreuve. Score et corrigé détaillé à la fin, comme au QCM.";

    var countBtns = ["10", "20", "30", "all"].map(function (c) {
      return '<button type="button" data-action="count" data-value="' + c + '" aria-pressed="' + (p.count === c) + '">' + (c === "all" ? "Toutes" : c) + "</button>";
    }).join("");

    var timerRow = p.mode === "exam"
      ? '<label class="toggle-row"><input type="checkbox" data-action="timer"' + (p.timer ? " checked" : "") + "><span>Chronomètre : " + fmtTime(n * EXAM_SECONDS_PER_Q) + " pour " + plural(n, "question", "questions") + " (rythme du QCM : 30 questions en 50 min)</span></label>"
      : "";

    app.innerHTML =
      '<div class="wrap">' +
        '<header class="masthead">' +
          "<h1>Émotions et apprentissage</h1>" +
          '<p class="sub">Révision du QCM à partir des questions proposées en cours</p>' +
          '<div class="sync">' + waveSVG(ratio) +
            '<div class="score">' + Math.round(ratio * 100) + "&nbsp;%</div>" +
            '<p class="caption">Questions maîtrisées. Les deux courbes s\'alignent quand la maîtrise progresse.</p>' +
          "</div>" +
        "</header>" +
        '<div class="counts">' +
          "<div><strong>" + total + "</strong><span>questions</span></div>" +
          "<div><strong>" + mastered + "</strong><span>maîtrisées</span></div>" +
          "<div><strong>" + missed + "</strong><span>à revoir</span></div>" +
          "<div><strong>" + (disputed + unverified) + "</strong><span>à vérifier</span></div>" +
        "</div>" +
        notices +
        '<div class="setup">' +
          '<section class="group">' +
            "<h2>Mode</h2>" +
            '<div class="segmented" role="group" aria-label="Mode">' +
              '<button type="button" data-action="mode" data-value="practice" aria-pressed="' + (p.mode === "practice") + '">Entraînement</button>' +
              '<button type="button" data-action="mode" data-value="exam" aria-pressed="' + (p.mode === "exam") + '">Examen</button>' +
            "</div>" +
            '<p class="help">' + modeHelp + "</p>" +
          "</section>" +
          '<section class="group">' +
            "<h2>Nombre de questions</h2>" +
            '<div class="segmented" role="group" aria-label="Nombre de questions">' + countBtns + "</div>" +
            timerRow +
          "</section>" +
          '<section class="group span-2">' +
            "<h2>Questions</h2>" +
            '<div class="choices">' +
              choice("all", "Toutes les questions", total) +
              choice("week", "Par semaine", null, p.filter === "week" ? weekSelect : "") +
              choice("topic", "Par thème", null, p.filter === "topic" ? topicSelect : "") +
              choice("missed", "À revoir (ratées, pas encore réussies)", missed) +
              choice("disputed", "Contestées (clé discutable)", disputed) +
              choice("unverified", "Non vérifiées (hors supports)", unverified) +
            "</div>" +
            '<p class="help">Les questions à revoir et jamais vues passent en premier quand toutes ne sont pas tirées.</p>' +
          "</section>" +
        "</div>" +
        '<div class="start-row">' +
          '<button type="button" class="btn btn-primary" data-action="start"' + (n ? "" : " disabled") + ">" +
            (n ? "Commencer (" + plural(n, "question", "questions") + ")" : "Aucune question dans cette sélection") +
          "</button>" +
        "</div>" +
        '<div class="links-row">' +
          '<button type="button" class="btn btn-quiet" data-action="browse">Parcourir les fiches avec réponses</button>' +
          '<button type="button" class="btn btn-quiet" data-action="sync">Transférer la progression</button>' +
        "</div>" +
        '<footer class="footer"><span>Version ' + VERSION + "</span><span>" +
          plural(ws.length, "semaine chargée", "semaines chargées") + " : " + ws.join(", ") + "</span></footer>" +
      "</div>";
  }

  /* ---------------------------------------------------------------- */
  /* Session : démarrage                                               */
  /* ---------------------------------------------------------------- */

  function startSession(mode, questions) {
    var items = questions.map(function (q) { return makeItem(q, false); });
    state.session = {
      mode: mode,
      items: items,
      idx: 0,
      startedAt: Date.now(),
      deadline: null,
      firstTry: {},      // id -> true/false (premier essai, entraînement)
      requeued: 0
    };
    if (mode === "exam" && state.prefs.timer) {
      state.session.deadline = Date.now() + items.length * EXAM_SECONDS_PER_Q * 1000;
      state.timerId = setInterval(tick, 1000);
    }
    renderQuestion();
    window.scrollTo(0, 0);
  }

  function tick() {
    var s = state.session;
    if (!s || !s.deadline) return;
    var left = (s.deadline - Date.now()) / 1000;
    var el = document.getElementById("timer");
    if (el) {
      el.textContent = fmtTime(left);
      el.classList.toggle("is-low", left <= 120);
    }
    if (left <= 0) finishExam(true);
  }

  /* ---------------------------------------------------------------- */
  /* Session : affichage d'une question                                */
  /* ---------------------------------------------------------------- */

  function renderQuestion() {
    var s = state.session;
    var item = s.items[s.idx];
    var q = state.byId[item.id];
    var multi = q.correct.length > 1;
    var isExam = s.mode === "exam";
    var answered = !isExam && item.done;
    var total = s.items.length;
    var progressPct = isExam
      ? (s.items.filter(function (it) { return it.picked.length; }).length / total) * 100
      : (s.idx / total) * 100;

    var opts = item.order.map(function (orig, pos) {
      var cls = "opt" + (multi ? " is-multi" : "");
      var pressed = item.picked.indexOf(orig) >= 0;
      var tag = "";
      if (answered) {
        var isRight = q.correct.indexOf(orig) >= 0;
        if (isRight && pressed) { cls += " is-correct"; tag = '<span class="tag">Bonne réponse</span>'; }
        else if (isRight) { cls += " is-missed"; tag = '<span class="tag">Bonne réponse non cochée</span>'; }
        else if (pressed) { cls += " is-wrong"; tag = '<span class="tag">Votre choix</span>'; }
      }
      return '<li><button type="button" class="' + cls + '" data-action="pick" data-orig="' + orig + '" aria-pressed="' + pressed + '"' + (answered ? " disabled" : "") + ">" +
        '<span class="letter">' + LETTERS[pos] + "</span><span>" + esc(q.options[orig]) + tag + "</span></button></li>";
    }).join("");

    var timer = isExam && s.deadline ? '<span id="timer" class="timer">' + fmtTime((s.deadline - Date.now()) / 1000) + "</span>" : "<span></span>";

    var palette = "";
    if (isExam) {
      palette = '<nav class="palette" aria-label="Aller à la question">' + s.items.map(function (it, i) {
        return '<button type="button" data-action="goto" data-i="' + i + '" class="' + (it.picked.length ? "is-done" : "") + '"' + (i === s.idx ? ' aria-current="true"' : "") + ">" + (i + 1) + "</button>";
      }).join("") + "</nav>";
    }

    var actions;
    if (isExam) {
      var last = s.idx === total - 1;
      actions = '<button type="button" class="btn" data-action="prev"' + (s.idx === 0 ? " disabled" : "") + ">Précédente</button>" +
        (last
          ? '<button type="button" class="btn btn-primary" data-action="finish">Terminer l\'examen</button>'
          : '<button type="button" class="btn btn-primary" data-action="next">Suivante</button>');
    } else if (answered) {
      actions = '<button type="button" class="btn btn-primary" data-action="next" id="next-btn">' + (s.idx === total - 1 ? "Voir le bilan" : "Question suivante") + "</button>";
    } else if (multi) {
      actions = '<button type="button" class="btn btn-primary" data-action="submit"' + (item.picked.length ? "" : " disabled") + ">Valider</button>";
    } else {
      actions = '<button type="button" class="btn btn-quiet" data-action="skip">Passer</button>';
    }

    app.innerHTML =
      '<div class="topbar"><div class="wrap">' +
        '<button type="button" class="btn btn-quiet" data-action="quit">Quitter</button>' +
        '<div class="where">Question ' + (s.idx + 1) + " sur " + total + "<small>" + (isExam ? "Examen" : "Entraînement") + "</small></div>" +
        timer +
      '</div><div class="bar"><span style="width:' + progressPct.toFixed(1) + '%"></span></div></div>' +
      '<div class="wrap">' +
        '<div class="qmeta"><span>Semaine ' + q.week + "</span><span>" + esc(q.topic) + "</span>" +
          (item.again ? '<span class="again">À revoir</span>' : "") + "</div>" +
        '<p class="qtext">' + esc(q.question) + "</p>" +
        (multi ? '<p class="multi-hint">Plusieurs réponses possibles</p>' : "") +
        '<ul class="options">' + opts + "</ul>" +
        (answered ? feedbackHTML(q, item) : "") +
        palette +
      "</div>" +
      '<div class="actions"><div class="wrap">' + actions + "</div></div>";

    if (answered) {
      var nb = document.getElementById("next-btn");
      if (nb) nb.focus({ preventScroll: true });
    }
  }

  function correctLetters(q, item) {
    return item.order.map(function (orig, pos) { return q.correct.indexOf(orig) >= 0 ? LETTERS[pos] : null; }).filter(Boolean);
  }

  function feedbackHTML(q, item) {
    var ok = item.ok;
    var right = correctLetters(q, item);
    var rightTexts = item.order.filter(function (o) { return q.correct.indexOf(o) >= 0; }).map(function (o) { return q.options[o]; });
    var verdict = ok ? "Bonne réponse" : (item.picked.length ? "Réponse incorrecte" : "Question passée");
    var partial = !ok && q.correct.length > 1 && item.picked.some(function (o) { return q.correct.indexOf(o) >= 0; });
    if (partial) verdict = "Réponse incomplète ou en partie fausse";

    var dist = item.order.map(function (orig, pos) {
      if (q.correct.indexOf(orig) >= 0) return "";
      var why = q.distractors[String(orig)];
      return why ? "<li><b>" + LETTERS[pos] + "</b><span>" + esc(why) + "</span></li>" : "";
    }).join("");

    var status = "";
    if (q.status !== "ok") {
      status = '<div class="status-box">' + statusBadge(q) + esc(q.note) + "</div>";
    } else if (q.note) {
      status = '<div class="status-box">Note : ' + esc(q.note) + "</div>";
    }

    return '<section class="feedback ' + (ok ? "is-ok" : "is-bad") + '" aria-live="polite">' +
      '<p class="verdict">' + verdict + "</p>" +
      "<p><b>" + (right.length > 1 ? "Réponses : " : "Réponse : ") + right.join(", ") + "</b>. " + esc(rightTexts.join(" ; ")) + "</p>" +
      (q.explanation ? "<h3>Explication</h3><p>" + esc(q.explanation) + "</p>" : "") +
      (dist ? "<h3>Pourquoi les autres options sont fausses</h3><ul class=\"dlist\">" + dist + "</ul>" : "") +
      '<p class="ref">Source : ' + (q.ref ? esc(q.ref) : "aucune source dans les supports du cours") + " " + sourceBadge(q) + "</p>" +
      status +
      "</section>";
  }

  /* ---------------------------------------------------------------- */
  /* Session : actions                                                 */
  /* ---------------------------------------------------------------- */

  function pick(orig) {
    var s = state.session;
    var item = s.items[s.idx];
    var q = state.byId[item.id];
    var multi = q.correct.length > 1;
    if (s.mode === "practice" && item.done) return;
    if (multi) {
      var at = item.picked.indexOf(orig);
      if (at >= 0) item.picked.splice(at, 1); else item.picked.push(orig);
      renderQuestion();
    } else {
      item.picked = [orig];
      if (s.mode === "practice") submit();
      else renderQuestion();
    }
  }

  function submit() {
    var s = state.session;
    var item = s.items[s.idx];
    var q = state.byId[item.id];
    item.done = true;
    item.ok = sameSet(item.picked, q.correct);
    if (!(item.id in s.firstTry)) s.firstTry[item.id] = item.ok;
    record(item.id, item.ok);
    saveProgress();
    if (!item.ok) {
      // La question revient plus loin dans la session, avec un nouvel ordre d'options.
      var at = Math.min(s.idx + 1 + REQUEUE_GAP, s.items.length);
      s.items.splice(at, 0, makeItem(q, true));
      s.requeued += 1;
    }
    renderQuestion();
  }

  function next() {
    var s = state.session;
    if (s.mode === "practice") {
      if (s.idx >= s.items.length - 1) { renderPracticeResults(); return; }
    }
    s.idx = Math.min(s.idx + 1, s.items.length - 1);
    renderQuestion();
    window.scrollTo(0, 0);
  }

  function finishExam(timeUp) {
    var s = state.session;
    if (!s || s.mode !== "exam" || s.finished) return;
    if (!timeUp) {
      var blank = s.items.filter(function (it) { return !it.picked.length; }).length;
      if (blank && !window.confirm(plural(blank, "question sans réponse", "questions sans réponse") + ". Terminer quand même ?")) return;
    }
    s.finished = true;
    stopTimer();
    s.endedAt = Date.now();
    s.timeUp = !!timeUp;
    s.items.forEach(function (it) {
      var q = state.byId[it.id];
      it.ok = sameSet(it.picked, q.correct);
      it.done = true;
      record(it.id, it.ok);
    });
    saveProgress();
    renderExamResults(false);
  }

  /* ---------------------------------------------------------------- */
  /* Bilans                                                            */
  /* ---------------------------------------------------------------- */

  function renderPracticeResults() {
    var s = state.session;
    var ids = Object.keys(s.firstTry);
    var first = ids.filter(function (id) { return s.firstTry[id]; }).length;
    var stillMissed = ids.filter(function (id) { return isMissed(id); });
    var ratio = ids.length ? first / ids.length : 0;
    var mins = Math.round((Date.now() - s.startedAt) / 60000);

    var list = ids.filter(function (id) { return !s.firstTry[id]; }).map(function (id) {
      var q = state.byId[id];
      return '<li class="is-bad"><p class="rq">' + esc(q.question) + "</p>" +
        '<p class="ra"><b>Réponse :</b> ' + esc(q.correct.map(function (c) { return q.options[c]; }).join(" ; ")) + "</p>" +
        '<p class="ra" style="color:var(--muted)">' + esc(q.ref || "Aucune source dans les supports") + "</p></li>";
    }).join("");

    s.finished = true;
    app.innerHTML =
      '<div class="wrap">' +
        '<header class="result-head">' +
          "<h1>Bilan de l'entraînement</h1>" +
          '<div class="big">' + first + " <small>/ " + ids.length + "</small></div>" +
          "<p>Réussies du premier coup. " + plural(s.requeued, "question est revenue", "questions sont revenues") + " après une erreur. Durée : environ " + plural(Math.max(1, mins), "minute", "minutes") + ".</p>" +
          '<div class="sync">' + waveSVG(ratio) + '<div class="score">' + Math.round(ratio * 100) + "&nbsp;%</div></div>" +
        "</header>" +
        (list ? "<h2 style=\"font-size:1rem;margin:26px 0 0\">Ratées au premier essai</h2><ul class=\"review\">" + list + "</ul>" : '<p class="empty">Aucune erreur au premier essai.</p>') +
        '<div class="start-row">' +
          (stillMissed.length ? '<button type="button" class="btn btn-primary" data-action="retry" data-ids="' + esc(stillMissed.join(",")) + '">Refaire les ' + plural(stillMissed.length, "question à revoir", "questions à revoir") + "</button>" : "") +
          '<button type="button" class="btn" data-action="home">Retour à l\'accueil</button>' +
        "</div>" +
        '<footer class="footer"><span>Version ' + VERSION + "</span></footer>" +
      "</div>";
    window.scrollTo(0, 0);
  }

  function renderExamResults(onlyErrors) {
    var s = state.session;
    s.onlyErrors = onlyErrors;
    var good = s.items.filter(function (it) { return it.ok; }).length;
    var total = s.items.length;
    var ratio = total ? good / total : 0;
    var used = (s.endedAt - s.startedAt) / 1000;
    var wrongIds = s.items.filter(function (it) { return !it.ok; }).map(function (it) { return it.id; });

    var list = s.items.map(function (it, i) {
      if (onlyErrors && it.ok) return "";
      var q = state.byId[it.id];
      var letters = function (arr) {
        return it.order.map(function (orig, pos) { return arr.indexOf(orig) >= 0 ? LETTERS[pos] + ". " + q.options[orig] : null; }).filter(Boolean);
      };
      var mine = it.picked.length ? letters(it.picked).join(" ; ") : "pas de réponse";
      var dist = it.order.map(function (orig, pos) {
        if (q.correct.indexOf(orig) >= 0) return "";
        var why = q.distractors[String(orig)];
        return why ? "<li><b>" + LETTERS[pos] + "</b><span>" + esc(why) + "</span></li>" : "";
      }).join("");
      return '<li class="' + (it.ok ? "is-ok" : "is-bad") + '">' +
        '<div class="qmeta" style="margin:0 0 6px"><span>Question ' + (i + 1) + "</span><span>" + esc(q.topic) + "</span>" + statusBadge(q) + "</div>" +
        '<p class="rq">' + esc(q.question) + "</p>" +
        '<p class="ra"><b>Votre réponse :</b> ' + esc(mine) + "</p>" +
        (it.ok ? "" : '<p class="ra"><b>Bonne réponse :</b> ' + esc(letters(q.correct).join(" ; ")) + "</p>") +
        "<details><summary>Explication et source</summary>" +
          "<p>" + esc(q.explanation) + "</p>" +
          (dist ? '<ul class="dlist">' + dist + "</ul>" : "") +
          '<p class="ref">Source : ' + (q.ref ? esc(q.ref) : "aucune source dans les supports du cours") + "</p>" +
          (q.note ? '<div class="status-box">' + statusBadge(q) + esc(q.note) + "</div>" : "") +
        "</details></li>";
    }).join("");

    app.innerHTML =
      '<div class="wrap">' +
        '<header class="result-head">' +
          "<h1>Résultat de l'examen</h1>" +
          '<div class="big">' + good + " <small>/ " + total + "</small></div>" +
          "<p>" + (s.timeUp ? "Temps écoulé. " : "") + "Durée : " + fmtTime(used) + ". Une question à réponses multiples compte comme juste seulement si toutes les bonnes options sont cochées, et elles seules.</p>" +
          '<div class="sync">' + waveSVG(ratio) + '<div class="score">' + Math.round(ratio * 100) + "&nbsp;%</div></div>" +
        "</header>" +
        '<div class="segmented" role="group" aria-label="Affichage du corrigé" style="margin-top:22px">' +
          '<button type="button" data-action="exam-all" aria-pressed="' + !onlyErrors + '">Tout le corrigé</button>' +
          '<button type="button" data-action="exam-errors" aria-pressed="' + !!onlyErrors + '">Erreurs seulement (' + wrongIds.length + ")</button>" +
        "</div>" +
        (list ? '<ul class="review">' + list + "</ul>" : '<p class="empty">Aucune erreur.</p>') +
        '<div class="start-row">' +
          (wrongIds.length ? '<button type="button" class="btn btn-primary" data-action="retry" data-ids="' + esc(wrongIds.join(",")) + '">Retravailler les erreurs en entraînement</button>' : "") +
          '<button type="button" class="btn" data-action="home">Retour à l\'accueil</button>' +
        "</div>" +
        '<footer class="footer"><span>Version ' + VERSION + "</span></footer>" +
      "</div>";
    if (!onlyErrors) window.scrollTo(0, 0);
  }

  /* ---------------------------------------------------------------- */
  /* Fiches (questions avec réponses)                                  */
  /* ---------------------------------------------------------------- */

  function renderBrowse(keepFocus) {
    stopTimer();
    var b = state.browse;
    var ws = weeks();
    var ts = topics();
    var needle = b.q.trim().toLowerCase();
    var list = state.bank.filter(function (q) {
      if (b.week && String(q.week) !== b.week) return false;
      if (b.topic && q.topic !== b.topic) return false;
      if (b.status && q.status !== b.status) return false;
      if (needle) {
        var hay = (q.question + " " + q.options.join(" ") + " " + q.explanation + " " + q.topic).toLowerCase();
        if (hay.indexOf(needle) < 0) return false;
      }
      return true;
    });

    var cards = list.map(function (q) {
      var dist = q.options.map(function (o, i) {
        if (q.correct.indexOf(i) >= 0) return "";
        var why = q.distractors[String(i)];
        return why ? "<li><b>" + LETTERS[i] + "</b><span>" + esc(why) + "</span></li>" : "";
      }).join("");
      return '<li class="card">' +
        '<div class="qmeta"><span>' + esc(q.id) + "</span><span>Semaine " + q.week + "</span><span>" + esc(q.topic) + "</span>" + statusBadge(q) + sourceBadge(q) + "</div>" +
        '<p class="qtext">' + esc(q.question) + "</p>" +
        "<ol>" + q.options.map(function (o, i) {
          var ok = q.correct.indexOf(i) >= 0;
          return '<li class="' + (ok ? "is-correct" : "") + '"><b>' + LETTERS[i] + "</b><span>" + esc(o) + (ok ? '<span class="visually-hidden"> (bonne réponse)</span>' : "") + "</span></li>";
        }).join("") + "</ol>" +
        "<details><summary>Explication et source</summary>" +
          "<p>" + esc(q.explanation) + "</p>" +
          (dist ? '<ul class="dlist">' + dist + "</ul>" : "") +
          '<p class="ref">Source : ' + (q.ref ? esc(q.ref) : "aucune source dans les supports du cours") + "</p>" +
          (q.note ? '<div class="status-box">' + statusBadge(q) + esc(q.note) + "</div>" : "") +
        "</details></li>";
    }).join("");

    app.innerHTML =
      '<div class="topbar"><div class="wrap">' +
        '<button type="button" class="btn btn-quiet" data-action="home">Accueil</button>' +
        '<div class="where">Fiches<small>' + plural(list.length, "question", "questions") + "</small></div><span></span>" +
      "</div></div>" +
      '<div class="wrap">' +
        '<div class="filters">' +
          '<input type="search" class="full" data-action="b-q" placeholder="Rechercher un mot (ex. HRV, Scherer, SHER)" value="' + esc(b.q) + '" aria-label="Rechercher">' +
          '<select data-action="b-week" aria-label="Semaine"><option value="">Toutes les semaines</option>' +
            ws.map(function (w) { return '<option value="' + w + '"' + (String(w) === b.week ? " selected" : "") + ">Semaine " + w + "</option>"; }).join("") + "</select>" +
          '<select data-action="b-topic" aria-label="Thème"><option value="">Tous les thèmes</option>' +
            ts.map(function (t) { return '<option value="' + esc(t.name) + '"' + (t.name === b.topic ? " selected" : "") + ">" + esc(t.name) + "</option>"; }).join("") + "</select>" +
          '<select data-action="b-status" aria-label="Statut"><option value="">Tous les statuts</option>' +
            '<option value="ok"' + (b.status === "ok" ? " selected" : "") + ">Vérifiées</option>" +
            '<option value="disputed"' + (b.status === "disputed" ? " selected" : "") + ">Contestées</option>" +
            '<option value="unverified"' + (b.status === "unverified" ? " selected" : "") + ">Non vérifiées</option></select>" +
        "</div>" +
        (cards ? '<ul class="cards">' + cards + "</ul>" : '<p class="empty">Aucune question ne correspond. Modifiez la recherche ou les filtres.</p>') +
        '<footer class="footer"><span>Version ' + VERSION + "</span><span>Les lettres suivent l'ordre du fichier ; en session, l'ordre des options est mélangé.</span></footer>" +
      "</div>";

    if (keepFocus) {
      var input = app.querySelector('[data-action="b-q"]');
      if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
    }
  }

  /* ---------------------------------------------------------------- */
  /* Transfert de progression                                          */
  /* ---------------------------------------------------------------- */

  function openSync() {
    var code = encodeCode(state.progress);
    var n = Object.keys(state.progress).length;
    var wrap = document.createElement("div");
    wrap.className = "overlay";
    wrap.setAttribute("data-overlay", "1");
    wrap.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="sync-title">' +
        '<h2 id="sync-title">Transférer la progression</h2>' +
        "<p>La progression est enregistrée dans ce navigateur seulement. Pour la retrouver sur un autre appareil, copiez le code ici et collez-le là-bas.</p>" +
        "<h3>Exporter (" + plural(n, "question suivie", "questions suivies") + ")</h3>" +
        '<textarea id="export-code" readonly>' + esc(code) + "</textarea>" +
        '<div class="row"><button type="button" class="btn" data-action="copy">Copier le code</button></div>' +
        '<p class="msg" id="copy-msg"></p>' +
        "<h3>Importer</h3>" +
        "<p>Le code est fusionné avec la progression actuelle : pour chaque question, la réponse la plus récente est gardée.</p>" +
        '<textarea id="import-code" placeholder="Collez ici un code qui commence par ' + CODE_PREFIX + '"></textarea>' +
        '<div class="row"><button type="button" class="btn btn-primary" data-action="import">Importer le code</button></div>' +
        '<p class="msg" id="import-msg"></p>' +
        "<h3>Remise à zéro</h3>" +
        "<p>Efface toute la progression enregistrée dans ce navigateur. Exportez d'abord si besoin.</p>" +
        '<div class="row"><button type="button" class="btn" data-action="reset">Effacer la progression</button></div>' +
        '<div class="close-row"><button type="button" class="btn" data-action="close-sync">Fermer</button></div>' +
      "</div>";
    document.body.appendChild(wrap);
    wrap.querySelector('[data-action="copy"]').focus();
  }

  function closeSync(rerender) {
    var o = document.querySelector("[data-overlay]");
    if (o) o.remove();
    if (rerender) renderHome();
  }

  function copyCode() {
    var ta = document.getElementById("export-code");
    var msg = document.getElementById("copy-msg");
    var done = function () { msg.textContent = "Code copié."; msg.className = "msg is-ok"; };
    var fallback = function () {
      ta.focus(); ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      if (ok) done();
      else { msg.textContent = "Copie automatique impossible : le code est sélectionné, copiez-le manuellement."; msg.className = "msg is-bad"; }
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(ta.value).then(done, fallback);
    } else {
      fallback();
    }
  }

  function importCode() {
    var ta = document.getElementById("import-code");
    var msg = document.getElementById("import-msg");
    try {
      var obj = decodeCode(ta.value);
      var n = mergeProgress(obj);
      msg.textContent = "Import réussi : " + plural(n, "question mise à jour", "questions mises à jour") + ".";
      msg.className = "msg is-ok";
      document.getElementById("export-code").value = encodeCode(state.progress);
    } catch (e) {
      msg.textContent = "Code non reconnu. Il doit commencer par " + CODE_PREFIX + " et être copié en entier.";
      msg.className = "msg is-bad";
    }
  }

  /* ---------------------------------------------------------------- */
  /* Événements                                                        */
  /* ---------------------------------------------------------------- */

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]");
    if (!el) {
      if (e.target.hasAttribute && e.target.hasAttribute("data-overlay")) closeSync(true);
      return;
    }
    var a = el.getAttribute("data-action");
    var p = state.prefs;
    switch (a) {
      case "mode":
        p.mode = el.getAttribute("data-value");
        if (p.mode === "exam" && p.count === "20") p.count = "30";
        savePrefs(); renderHome(); break;
      case "count":
        p.count = el.getAttribute("data-value"); savePrefs(); renderHome(); break;
      case "start":
        startSession(p.mode, pickQuestions(pool(), p.count)); break;
      case "pick":
        pick(+el.getAttribute("data-orig")); break;
      case "submit":
        submit(); break;
      case "skip":
        state.session.items[state.session.idx].picked = [];
        submit(); break;
      case "next":
        next(); break;
      case "prev":
        state.session.idx = Math.max(0, state.session.idx - 1); renderQuestion(); window.scrollTo(0, 0); break;
      case "goto":
        state.session.idx = +el.getAttribute("data-i"); renderQuestion(); window.scrollTo(0, 0); break;
      case "finish":
        finishExam(false); break;
      case "quit":
        if (state.session && state.session.mode === "exam" && !state.session.finished) {
          if (!window.confirm("Quitter l'examen ? Les réponses de cette épreuve ne seront pas enregistrées.")) return;
        }
        renderHome(); window.scrollTo(0, 0); break;
      case "home":
        renderHome(); window.scrollTo(0, 0); break;
      case "retry":
        var ids = el.getAttribute("data-ids").split(",");
        startSession("practice", shuffle(ids.map(function (id) { return state.byId[id]; }).filter(Boolean))); break;
      case "exam-all":
        renderExamResults(false); break;
      case "exam-errors":
        renderExamResults(true); break;
      case "browse":
        renderBrowse(false); window.scrollTo(0, 0); break;
      case "sync":
        openSync(); break;
      case "copy":
        copyCode(); break;
      case "import":
        importCode(); break;
      case "reset":
        if (window.confirm("Effacer toute la progression de ce navigateur ?")) {
          state.progress = {}; saveProgress(); closeSync(true);
        }
        break;
      case "close-sync":
        closeSync(true); break;
    }
  });

  document.addEventListener("change", function (e) {
    var el = e.target.closest("[data-action]");
    if (!el) return;
    var a = el.getAttribute("data-action");
    var p = state.prefs;
    if (a === "filter") { p.filter = el.value; savePrefs(); renderHome(); }
    else if (a === "week") { p.week = el.value; savePrefs(); renderHome(); }
    else if (a === "topic") { p.topic = el.value; savePrefs(); renderHome(); }
    else if (a === "timer") { p.timer = el.checked; savePrefs(); }
    else if (a === "b-week") { state.browse.week = el.value; renderBrowse(false); }
    else if (a === "b-topic") { state.browse.topic = el.value; renderBrowse(false); }
    else if (a === "b-status") { state.browse.status = el.value; renderBrowse(false); }
  });

  document.addEventListener("input", function (e) {
    var el = e.target;
    if (el.getAttribute && el.getAttribute("data-action") === "b-q") {
      state.browse.q = el.value;
      renderBrowse(true);
    }
  });

  /* Clavier : A à E ou 1 à 5 pour choisir, Entrée pour valider ou continuer. */
  document.addEventListener("keydown", function (e) {
    if (document.querySelector("[data-overlay]")) {
      if (e.key === "Escape") closeSync(true);
      return;
    }
    var s = state.session;
    if (!s || s.finished) return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var item = s.items[s.idx];
    var q = state.byId[item.id];
    var k = e.key.toLowerCase();
    var pos = -1;
    if (/^[1-9]$/.test(k)) pos = +k - 1;
    else if (k.length === 1 && LETTERS.toLowerCase().indexOf(k) >= 0) pos = LETTERS.toLowerCase().indexOf(k);
    if (pos >= 0 && pos < item.order.length) {
      if (s.mode === "practice" && item.done) return;
      e.preventDefault();
      pick(item.order[pos]);
      return;
    }
    if (e.key === "Enter") {
      if (e.target.closest && e.target.closest("button")) return; // le bouton gère lui-même Entrée
      e.preventDefault();
      if (s.mode === "practice") {
        if (item.done) next();
        else if (q.correct.length > 1 && item.picked.length) submit();
      } else if (s.idx < s.items.length - 1) {
        next();
      }
    } else if (s.mode === "exam" && e.key === "ArrowRight" && s.idx < s.items.length - 1) {
      next();
    } else if (s.mode === "exam" && e.key === "ArrowLeft" && s.idx > 0) {
      s.idx -= 1; renderQuestion();
    }
  });

  boot();
})();
