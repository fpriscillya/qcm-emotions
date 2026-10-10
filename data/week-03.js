window.QCM_BANK = (window.QCM_BANK || []).concat([
  {
    id: "w03-q01",
    week: 3,
    topic: "Mesurer la synchronie",
    source: "student",
    question: "Quelles sont les 4 limites aux méthodes non computationnelles pour étudier la synchronie des comportements ?",
    options: [
      "Prise de temps, précision limitée, dépendance aux compétences des observateurs, difficulté de mise en œuvre dans des contextes plus naturels",
      "Précision limitée, prise de temps énorme, observateurs aux capacités différentes, laboratoire nécessaire (moyens coûteux)",
      "Résolution temporelle faible, sensibilité aux mouvements, coût du matériel, besoin d'un laboratoire",
      "Impossibilité de choisir les comportements observés, absence de vidéo, coût des capteurs, nécessité d'un EEG"
    ],
    correct: [0],
    explanation: "Les méthodes non computationnelles reposent sur un observateur formé qui analyse des vidéos (micro-comportements ou jugement global de l'interaction). La diapo 16 (Delaherche et al., 2012) liste quatre inconvénients : prise de temps, précision limitée, dépendance aux compétences des observateurs, difficulté de mise en œuvre dans des contextes plus naturels.",
    distractors: {
      "1": "Réponse proposée par l'étudiant·e. Les trois premières limites sont justes, mais la 4e de la diapo est la difficulté à appliquer ces méthodes en contexte naturel, pas le besoin d'un laboratoire coûteux.",
      "2": "Propriétés d'appareils de mesure (résolution temporelle, sensibilité aux mouvements), qui ne concernent pas l'observation par un observateur formé.",
      "3": "L'observateur choisit au contraire les micro-comportements à analyser, et la méthode repose sur des vidéos. Ni capteurs ni EEG n'interviennent."
    },
    ref: "L28, diapos 15-16",
    status: "disputed",
    note: "Réponse proposée par l'étudiant·e : 4e limite « laboratoire nécessaire (moyens coûteux) ». La diapo 16 indique « difficiles à mettre en œuvre dans des contextes plus naturels » : clé alignée sur la diapo. Contenu du cours de semaine 2 (L28). Question ouverte à l'origine : options rédigées pour le format QCM."
  },
  {
    id: "w03-q02",
    week: 3,
    topic: "Mesurer la synchronie",
    source: "student",
    question: "Lequel de ces désagréments n'est pas lié aux capteurs de synchronie comportementale ?",
    options: [
      "Prise de temps",
      "Précision limitée",
      "Dépendent des compétences des observateurs",
      "Pas de flexibilité dans ce qu'on choisit d'observer"
    ],
    correct: [3],
    explanation: "La diapo 16 liste les inconvénients des méthodes non computationnelles : prise de temps, précision limitée, dépendance aux compétences des observateurs, difficulté en contexte naturel. Le manque de flexibilité n'en fait pas partie : l'observateur peut au contraire choisir des micro-comportements précis ou juger l'interaction dans son ensemble (diapo 15).",
    distractors: {
      "0": "Inconvénient listé sur la diapo 16.",
      "1": "Inconvénient listé sur la diapo 16.",
      "2": "Inconvénient listé sur la diapo 16."
    },
    ref: "L28, diapos 15-16",
    status: "disputed",
    note: "Clé proposée par l'étudiant·e : B (précision limitée). Mais sa justification (« on peut vraiment choisir ce qu'on souhaite observer ») décrit l'option D, et la précision limitée figure bien parmi les inconvénients (diapo 16). Clé remplacée par D. Le libellé dit « capteurs » : la diapo concerne les méthodes non computationnelles, classées sous « capteurs de synchronisation comportementale ». Contenu du cours de semaine 2 (L28)."
  },
  {
    id: "w03-q03",
    week: 3,
    topic: "Paradigmes et méthodes de calcul",
    source: "student",
    question: "Pourquoi utilise-t-on des données substitutives (surrogate data analysis) dans une étude sur la synchronie entre une mère et son bébé ?",
    options: [
      "Pour vérifier que la synchronie observée est bien liée à leur interaction et pas seulement due au hasard.",
      "Pour mesurer plus facilement le rythme cardiaque de la mère.",
      "Pour comparer le niveau d'attention des bébés.",
      "Pour augmenter le nombre de participants dans l'étude."
    ],
    correct: [0],
    explanation: "Diapo 50 : « Mais s'agit-il vraiment de synchronie ? ». L'analyse de données de substitution crée des paires de signaux où la synchronie ne peut être que fortuite (par exemple en mélangeant des segments du signal). On compare la synchronie réelle de la dyade à cette référence pour montrer qu'elle vient de l'interaction.",
    distractors: {
      "1": "Le rythme cardiaque se mesure avec des capteurs (ECG, photopléthysmographie), pas avec une méthode de calcul.",
      "2": "L'attention n'est pas la variable visée : la méthode contrôle le rôle du hasard.",
      "3": "La méthode ne recrute pas de participants : elle sert de référence de comparaison à partir des signaux enregistrés."
    },
    ref: "L28, diapo 50",
    status: "ok",
    note: "Même contenu que w02-q26, autre formulation. Contenu du cours de semaine 2 (L28). Le détail du mécanisme vient de la figure de la diapo."
  },
  {
    id: "w03-q04",
    week: 3,
    topic: "Synchronie physiologique et SNA",
    source: "student",
    question: "Le système nerveux autonome :",
    options: [
      "augmente la variabilité de fréquence cardiaque lorsqu'activé.",
      "permet de mesurer arousal et valence physiologiques et émotionnels.",
      "diminue la fréquence cardiaque, le rythme respiratoire et la sudation lorsqu'activé.",
      "est lié à l'état d'activation de rest-and-digest.",
      "est lié aux paramètres physiologiques cardiovasculaire, respiratoire ainsi que de conductance cutanée."
    ],
    correct: [4],
    explanation: "La synchronie autonome se mesure par trois paramètres physiologiques du SNA : cardiovasculaires, respiratoires et conductance cutanée (Palumbo et al., 2017). On mesure ainsi l'arousal physiologique, qui résulte de l'équilibre entre influences sympathique et parasympathique (homéostasie, allostasie).",
    distractors: {
      "0": "Dépend de la branche : l'activation sympathique (stress) diminue la variabilité, seule l'activation parasympathique (relaxation) l'augmente.",
      "1": "La diapo dit « nous mesurons l'arousal physiologique ». Le cours ne dit pas que le SNA mesure la valence.",
      "2": "Faux pour l'activation sympathique, qui accélère le cœur. Seule la branche parasympathique ralentit le rythme cardiaque ; la question ne précise pas la branche.",
      "3": "Le « rest-and-digest » ne correspond qu'à la branche parasympathique ; le SNA comprend aussi la branche sympathique (stress). L'expression n'est pas utilisée dans le cours."
    },
    ref: "L28, diapos 26-27 et 33",
    status: "disputed",
    note: "Pas de clé proposée. E est la seule affirmation exacte sans réserve. D est défendable si l'auteur·e pensait à la branche parasympathique (relaxation, diapo 33), mais « rest-and-digest » n'apparaît pas dans le cours. A et C sont ambiguës car le SNA a deux branches aux effets opposés. Contenu du cours de semaine 2 (L28). Orthographe corrigée (« paramètre » au pluriel)."
  },
  {
    id: "w03-q05",
    week: 3,
    topic: "Paradigmes et méthodes de calcul",
    source: "student",
    question: "De quoi a-t-on besoin pour étudier la synchronie ?",
    options: [
      "Participants, méthodes de calcul, capteurs, paradigme expérimental",
      "Participants, EEG, questionnaires, groupe contrôle",
      "Capteurs, observateurs formés, vidéos, analyse de données de substitution",
      "Dyades mère-enfant, hyperscanning, still-face, corégulation"
    ],
    correct: [0],
    explanation: "Les quatre ingrédients de la diapo 7 : participants (dyades parent-nourrisson, mais aussi thérapeute-client, couples, coéquipiers), capteurs (comportementaux, physiologiques, neuronaux), méthodes de calcul et paradigme expérimental.",
    distractors: {
      "1": "L'EEG n'est qu'un type de capteur ; questionnaires et groupe contrôle ne font pas partie des quatre ingrédients.",
      "2": "Éléments de certains capteurs et méthodes de calcul, sans participants ni paradigme expérimental.",
      "3": "Exemples particuliers (un type de participants, une technique, un paradigme, un mécanisme), pas les quatre catégories."
    },
    ref: "L28, diapos 7-8",
    status: "ok",
    note: "Même contenu que w02-q14. Contenu du cours de semaine 2 (L28). Réponse proposée confirmée. Question ouverte à l'origine : options rédigées pour le format QCM."
  },
  {
    id: "w03-q06",
    week: 3,
    topic: "Émotions épistémiques",
    source: "student",
    question: "Quelles sont les émotions épistémiques ?",
    options: [
      "Des émotions qui ont pour objet la connaissance et sous-tendent la motivation à explorer et à apprendre : intérêt / curiosité, surprise, émerveillement, admiration, confusion, frustration",
      "Les émotions de base reconnues par une expression faciale universelle : joie, colère, peur, tristesse, dégoût, surprise",
      "Uniquement les émotions positives liées à l'apprentissage : plaisir, joie, fierté",
      "Des états affectifs diffus, de fond, sans objet précis"
    ],
    correct: [0],
    explanation: "Les émotions épistémiques ont pour objet la connaissance. Elles sous-tendent le niveau de motivation à explorer et à apprendre. Exemples du cours : intérêt / curiosité, surprise, émerveillement, admiration, confusion, frustration. Elles peuvent donc être positives ou négatives.",
    distractors: {
      "1": "Le critère des émotions de base (expression faciale universelle) ne définit pas les émotions épistémiques ; seule la surprise figure dans les deux listes.",
      "2": "Trop restrictif : confusion et frustration sont aussi des émotions épistémiques.",
      "3": "C'est la définition de l'humeur (Cours 1a, diapo 11). Les émotions épistémiques ont un objet : la connaissance."
    },
    ref: "Émotions épistémiques (Filippa), p. 3 ; Cours 1a, diapo 11",
    status: "ok",
    note: "Question ouverte à l'origine : options rédigées pour le format QCM."
  },
  {
    id: "w03-q07",
    week: 3,
    topic: "Développement de l'intérêt (Hidi & Renninger)",
    source: "student",
    question: "Quelles sont les phases du modèle en 4 phases du développement de l'intérêt chez les élèves ?",
    options: [
      "Déclenchement de l'intérêt situationnel, maintien de l'intérêt situationnel, émergence de l'intérêt individuel, stabilisation de l'intérêt individuel",
      "Déclenchement de l'intérêt individuel, maintien de l'intérêt individuel, émergence de l'intérêt situationnel, stabilisation de l'intérêt situationnel",
      "Nouveauté, complexité, compréhensibilité, approche",
      "Anticipation de la récompense (wanting), consommation (liking), satiété (learning), oubli"
    ],
    correct: [0],
    explanation: "Modèle de Hidi & Renninger. Phases 1 et 2 : intérêt situationnel, déclenché par un matériel ou un enseignant enthousiasmant qui attire l'attention, puis maintenu par le plaisir ressenti ou la pertinence personnelle de l'activité. Phases 3 et 4 : intérêt individuel, d'abord émergent (disposition à s'engager volontairement et avec plaisir), puis stabilisé pour un domaine (maths, musique, conjugaison, biologie, foot…).",
    distractors: {
      "1": "Ordre inversé : l'intérêt situationnel précède l'intérêt individuel.",
      "2": "Ce sont les évaluations qui déclenchent l'intérêt (Silvia) et une tendance à l'action, pas des phases de développement.",
      "3": "Phases de la curiosité dans le modèle d'Erdemli et al. (2025), qui ne comporte pas de phase « oubli »."
    },
    ref: "Émotions épistémiques (Filippa), p. 27",
    status: "ok",
    note: "Réponse proposée confirmée. Options rédigées pour le format QCM."
  },
  {
    id: "w03-q08",
    week: 3,
    topic: "L'intérêt, émotion de base",
    source: "student",
    question: "Pourquoi l'intérêt a été retiré des émotions de base ?",
    options: [
      "Car il n'existe pas d'expression faciale prototypique pour l'intérêt, contrairement aux autres émotions de base",
      "Car l'intérêt n'est pas une émotion mais un trait de personnalité",
      "Car l'intérêt n'est déclenché que par des stimuli agréables",
      "Car l'intérêt n'a aucune fonction adaptative"
    ],
    correct: [0],
    explanation: "Pour Tomkins, Izard et Ekman, l'intérêt est une émotion basique (p. 4), et le schéma d'Ekman (1972) l'inclut dans le programme d'affect facial (p. 5). Les émotions de base se définissent par une expression faciale universelle. Or l'intérêt est mal reconnu sur un visage statique (29 % de reconnaissance chez Dukes et al., 2017) et bien mieux sur le corps en mouvement (75 %) : il n'a pas d'expression faciale prototypique.",
    distractors: {
      "1": "Le cours le traite comme une émotion. Silvia (2005) montre même que les appraisals prédisent l'intérêt au-delà des traits (curiosité, ouverture).",
      "2": "Faux : l'intérêt est une émotion positive, mais il n'est pas spécifique aux stimuli agréables (intérêts morbides).",
      "3": "Faux : sa fonction est de motiver l'exploration de la nouveauté et l'apprentissage (fonction opposée à celle de l'anxiété)."
    },
    ref: "Émotions épistémiques (Filippa), p. 4-6",
    status: "ok",
    note: "Fusionne deux questions de la liste : « Pourquoi l'intérêt a été retiré des émotions de base ? » et « Pourquoi l'intérêt n'était pas compté comme une émotion de base ». La raison du retrait n'est pas écrite sur les diapos : elle se déduit du schéma d'Ekman (1972) et du tableau de Dukes et al. (2017). Attention : la p. 4 dit que pour Tomkins, Izard et Ekman l'intérêt EST une émotion basique. Réponse proposée confirmée. Options rédigées pour le format QCM."
  },
  {
    id: "w03-q09",
    week: 3,
    topic: "Interventions scolaires",
    source: "student",
    question: "Quelles sont les trois types d'interventions scolaires qui permettent d'augmenter l'intérêt ?",
    options: [
      "Personnalisation du contexte, choix d'apprentissage (autonomie), pertinence personnelle (valeur d'utilité)",
      "Contagion émotionnelle, structure d'appraisal, développement en 4 phases",
      "Récompenses extrinsèques, notes, compétition entre élèves",
      "Simplification des contenus, répétition, évaluations fréquentes"
    ],
    correct: [0],
    explanation: "Reber et al. (2018) : personnalisation du contexte (inclure le nom de l'élève, sa date de naissance, ses préférences du moment), choix d'apprentissage (renforce le sentiment d'autonomie et de contrôle, et l'intérêt), pertinence personnelle (augmenter la valeur d'utilité, par exemple en faisant rédiger un texte sur l'utilité de la matière pour sa vie ou sa carrière ; Hulleman & Harackiewicz, 2009).",
    distractors: {
      "1": "Ce sont d'autres leviers présentés dans « Comment susciter l'intérêt ? », pas les trois types d'interventions scolaires de Reber et al. (2018).",
      "2": "Absents du cours.",
      "3": "Absents du cours. Une tâche simple et répétitive n'est ni nouvelle ni complexe, donc peu propice à l'intérêt (Silvia)."
    },
    ref: "Émotions épistémiques (Filippa), p. 29-30",
    status: "ok",
    note: "Question ouverte à l'origine : options rédigées pour le format QCM. Même contenu que w03-q18."
  },
  {
    id: "w03-q10",
    week: 3,
    topic: "Curiosité et mémoire",
    source: "student",
    question: "Quel est l'effet de l'intérêt sur la mémoire ?",
    options: [
      "L'intérêt / la curiosité améliore la mémorisation : plus la curiosité pour une réponse est élevée, plus on a de chances de s'en souvenir",
      "L'intérêt nuit à la mémoire car il détourne l'attention",
      "L'intérêt n'améliore la mémoire que pour les informations positives",
      "L'intérêt n'a pas d'effet mesurable sur la mémoire"
    ],
    correct: [0],
    explanation: "Kang et al. (2009) : le taux de rappel augmente avec le niveau de curiosité (environ 38 % en curiosité faible, 52 % moyenne, 66 % élevée). La curiosité active le circuit de la récompense (noyau caudé) et le gyrus frontal inférieur. Marvin & Shohamy (2016) retrouvent l'effet en contexte positif, négatif et neutre. Conclusion du cours : l'intérêt et la curiosité favorisent l'exploration, l'attention, la mémoire et l'apprentissage.",
    distractors: {
      "1": "Le cours dit l'inverse : l'intérêt favorise l'attention et la mémoire.",
      "2": "Marvin & Shohamy (2016) : l'effet existe aussi en contexte négatif et neutre.",
      "3": "Contredit par Kang et al. (2009) et Marvin & Shohamy (2016)."
    },
    ref: "Émotions épistémiques (Filippa), p. 12-13 et 34",
    status: "ok",
    note: "Le cours traite ensemble intérêt et curiosité (« intérêt / curiosité », p. 3) ; les études présentées mesurent la curiosité. Pourcentages lus sur le graphique (approximatifs). Question ouverte à l'origine : options rédigées pour le format QCM."
  },
  {
    id: "w03-q11",
    week: 3,
    topic: "Appraisal de l'intérêt (Silvia)",
    source: "student",
    question: "Selon le modèle de Silvia, dans quelles conditions l'intérêt est-il particulièrement susceptible d'apparaître ?",
    options: [
      "Quand un événement est évalué comme nouveau et complexe, mais compréhensible",
      "Quand un événement est familier et simple",
      "Quand un événement est nouveau, complexe et incompréhensible",
      "Quand un événement est agréable, quelle que soit sa nouveauté"
    ],
    correct: [0],
    explanation: "Silvia (2005) : l'intérêt résulte d'appraisals de nouveauté (non-familiarité et complexité) et de potentiel de maîtrise (capacité à comprendre la chose nouvelle et complexe). Formulation du cours : nouveau ET complexe MAIS compréhensible.",
    distractors: {
      "1": "Sans nouveauté ni complexité, pas d'intérêt : dans l'espace de Muis et al. (2018), cela correspond à la zone neutre.",
      "2": "Sans compréhensibilité (faible capacité), on obtient plutôt de la confusion (Muis et al., 2018).",
      "3": "L'intérêt n'est pas spécifique aux stimuli agréables (intérêts morbides), et Silvia montre que cette structure d'appraisal est propre à l'intérêt, pas au plaisir (enjoyment)."
    },
    ref: "Émotions épistémiques (Filippa), p. 22-25",
    status: "ok",
    note: "Question ouverte à l'origine : options rédigées pour le format QCM."
  },
  {
    id: "w03-q12",
    week: 3,
    topic: "Appraisal de l'intérêt (Silvia)",
    source: "student",
    question: "Quelles sont les trois évaluations (appraisals) qui déclenchent l'intérêt ?",
    options: [
      "Nouveauté, complexité, compréhensibilité",
      "Pertinence, implication, potentiel de maîtrise",
      "Nouveauté, agrément intrinsèque, pertinence aux buts",
      "Familiarité, simplicité, utilité"
    ],
    correct: [0],
    explanation: "L'intérêt est typiquement déclenché par un événement évalué comme nouveau ET complexe MAIS compréhensible (Silvia, 2005, 2008).",
    distractors: {
      "1": "Ce sont des étapes de l'évaluation cognitive du modèle multicomponentiel (Cours 1a, diapo 9). Nuance : le « potentiel de maîtrise » correspond à la compréhensibilité chez Silvia (appraisals of coping potential), mais pertinence et implication ne font pas partie de la structure de l'intérêt.",
      "2": "Agrément et pertinence aux buts ne font pas partie de la structure d'appraisal de l'intérêt.",
      "3": "C'est l'inverse de la nouveauté et de la complexité."
    },
    ref: "Émotions épistémiques (Filippa), p. 22-23",
    status: "ok",
    note: "Fusionne deux questions de la liste : « Quelles sont les trois évaluations (appraisals) qui déclenchent l'intérêt ? » et « Quels sont les 3 critères d'appraisal ? ». Réponse proposée confirmée. Options rédigées pour le format QCM."
  },
  {
    id: "w03-q13",
    week: 3,
    topic: "Appraisal de l'intérêt (Silvia)",
    source: "student",
    question: "L'intérêt est une émotion qui est typiquement déclenchée par un événement évalué comme étant...",
    options: [
      "Nouveau ET complexe MAIS compréhensible",
      "Familier ET simple",
      "Nouveau ET complexe ET incompréhensible",
      "Agréable ET pertinent pour les buts"
    ],
    correct: [0],
    explanation: "Formulation exacte de la diapo : nouveau ET complexe MAIS compréhensible (Silvia, 2005, 2008). Le « mais » souligne que la complexité doit rester maîtrisable.",
    distractors: {
      "1": "L'inverse de la nouveauté et de la complexité.",
      "2": "Sans compréhensibilité, l'événement produit plutôt de la confusion (Muis et al., 2018).",
      "3": "Ces critères ne font pas partie de la structure d'appraisal de l'intérêt ; l'intérêt n'est pas spécifique aux stimuli agréables."
    },
    ref: "Émotions épistémiques (Filippa), p. 23",
    status: "ok",
    note: "Question à compléter à l'origine : options rédigées pour le format QCM."
  },
  {
    id: "w03-q14",
    week: 3,
    topic: "Développement de l'intérêt (Hidi & Renninger)",
    source: "student",
    question: "Comment l'intérêt se développe-t-il chez les élèves ?",
    options: [
      "D'abord par un intérêt situationnel, déclenché puis maintenu par l'environnement (matériel, enseignant, plaisir, pertinence), qui peut devenir un intérêt individuel, d'abord émergent puis stable",
      "D'abord par un intérêt individuel stable, qui produit ensuite des intérêts situationnels",
      "Uniquement par des prédispositions innées : l'environnement scolaire n'a pas d'influence",
      "Par la répétition de tâches simples qui donnent un sentiment de compétence"
    ],
    correct: [0],
    explanation: "Modèle en 4 phases de Hidi & Renninger : déclenchement puis maintien de l'intérêt situationnel, puis émergence et stabilisation de l'intérêt individuel. La conclusion du cours cite parmi les déclencheurs possibles un intérêt situationnel maintenu.",
    distractors: {
      "1": "Ordre inversé : l'intérêt individuel vient après l'intérêt situationnel.",
      "2": "Contredit par le modèle : le matériel et l'enseignant déclenchent l'intérêt (phase 1), et les interventions scolaires l'augmentent.",
      "3": "Absent du cours ; des tâches simples ne sont ni nouvelles ni complexes (Silvia)."
    },
    ref: "Émotions épistémiques (Filippa), p. 27 et 34",
    status: "ok",
    note: "Proche de w03-q07. Question ouverte à l'origine : options rédigées pour le format QCM."
  },
  {
    id: "w03-q15",
    week: 3,
    topic: "Curiosité et mémoire",
    source: "student",
    question: "Est-ce que l'effet de la curiosité sur la mémorisation est plus marqué dans un contexte positif que dans un contexte négatif ?",
    options: [
      "Non : la curiosité améliore la mémorisation de façon semblable en contexte positif et négatif ; c'est en contexte neutre que l'effet de la curiosité est le plus fort",
      "Oui : la curiosité n'améliore la mémorisation qu'en contexte positif",
      "Non : la valence du contexte n'a aucun impact sur la mémorisation",
      "Oui : en contexte négatif, la curiosité diminue la mémorisation"
    ],
    correct: [0],
    explanation: "Marvin & Shohamy (2016) : la probabilité de rappel augmente avec la curiosité dans les trois contextes. Les courbes positive et négative sont presque parallèles (environ 0,69 à 0,86 et 0,68 à 0,82). La courbe neutre part plus bas (environ 0,54) et monte le plus (environ 0,80). La valence aide donc la mémoire surtout quand la curiosité est faible.",
    distractors: {
      "1": "Faux : la courbe monte dans les trois contextes.",
      "2": "Réponse proposée par l'étudiant·e. Le « non » est juste, mais pas la justification : la valence a un effet, surtout à faible curiosité (contextes positif et négatif mieux retenus que le neutre).",
      "3": "Faux : en contexte négatif aussi, le rappel augmente avec la curiosité."
    },
    ref: "Émotions épistémiques (Filippa), p. 13",
    status: "disputed",
    note: "Réponse proposée : « Non, la valence du contexte n'a pas d'impact ». Le « non » est cohérent avec le graphique, pas la justification : la valence améliore le rappel (positif et négatif > neutre) et cet avantage diminue quand la curiosité augmente. Valeurs lues sur le graphique (approximatives). Question ouverte à l'origine : options rédigées pour le format QCM."
  },
  {
    id: "w03-q16",
    week: 3,
    topic: "Curiosité et mémoire",
    source: "student",
    question: "Concernant l'effet de la curiosité sur la mémoire, dans quelle circonstance Kang et al. ont constaté que la taille de pupille était la plus grande ?",
    options: [
      "Pour la No Curiosity",
      "Pour la Low Curiosity",
      "Pour la Middle Curiosity",
      "Pour la High Curiosity"
    ],
    correct: [3],
    explanation: "Sur le graphique de Kang et al. (2009), la dilatation pupillaire (PDR) est la plus forte pour les questions à curiosité élevée (High Curiosity). Elle augmente avant l'affichage de la réponse et culmine juste après, au-dessus des courbes Middle et Low.",
    distractors: {
      "0": "Il n'y a pas de condition « No Curiosity » : le graphique ne montre que Low, Middle et High.",
      "1": "C'est la courbe la plus basse.",
      "2": "Courbe intermédiaire, en dessous de High Curiosity."
    },
    ref: "Émotions épistémiques (Filippa), p. 10-12",
    status: "ok",
    note: "Mention « (Vrai) » retirée de l'option D : c'était la clé indiquée par l'étudiant·e. L'option A ne correspond à aucune condition de l'étude."
  },
  {
    id: "w03-q17",
    week: 3,
    topic: "Appraisal de l'intérêt (Silvia)",
    source: "student",
    question: "Quelle est la combinaison correcte pour déclencher de l'intérêt ?",
    options: [
      "Familiarité, simplicité, complexité",
      "Nouveauté, incompréhensible, répétitif",
      "Nouveauté, complexité, compréhensible",
      "Complexité, familiarité, nouveauté"
    ],
    correct: [2],
    explanation: "Silvia (2005) : nouveau ET complexe MAIS compréhensible.",
    distractors: {
      "0": "Familiarité et simplicité sont l'inverse de la nouveauté et de la complexité (et simplicité contredit complexité).",
      "1": "Incompréhensible et répétitif s'opposent à la compréhensibilité et à la nouveauté.",
      "3": "Familiarité contredit nouveauté, et la compréhensibilité manque."
    },
    ref: "Émotions épistémiques (Filippa), p. 23",
    status: "ok",
    note: ""
  },
  {
    id: "w03-q18",
    week: 3,
    topic: "Interventions scolaires",
    source: "student",
    question: "Nommez trois types d'intervention en contexte scolaire qui peuvent susciter l'intérêt chez les élèves :",
    options: [
      "personnaliser le contexte ; donner des choix d'exercices ; encourager le travail d'équipe",
      "laisser l'élève faire ses choix d'exercices ; s'assurer de l'utilité de la matière pour l'élève ; personnaliser le contexte en tenant compte des spécificités des élèves",
      "s'assurer que la matière est pertinente pour les élèves ; personnaliser le contexte par les caractéristiques des élèves ; offrir aux élèves des choix spécifiques pour leurs exercices",
      "contextualiser en fonction d'un programme spécifique ; laisser l'élève faire ses choix de travaux à la maison ; valider la pertinence de la formation auprès des chercheurs"
    ],
    correct: [1, 2],
    explanation: "Les trois types d'interventions de Reber et al. (2018) : personnalisation du contexte, choix d'apprentissage (autonomie), pertinence personnelle (valeur d'utilité). B et C contiennent les trois, dans un ordre et un vocabulaire différents.",
    distractors: {
      "0": "Le travail d'équipe ne fait pas partie des trois types d'interventions.",
      "3": "Aucun élément ne correspond. La pertinence doit être personnelle, établie par l'élève (texte sur l'utilité pour sa vie ou sa carrière), pas validée par des chercheurs."
    },
    ref: "Émotions épistémiques (Filippa), p. 30",
    status: "disputed",
    note: "Pas de clé proposée. B et C décrivent toutes deux les trois interventions du cours : deux options défendables. Si une seule réponse est attendue, la question est mal construite. Libellé corrigé : « qui peuvent qui peuvent » et « des choisir spécifiques » (pour « des choix spécifiques »)."
  },
  {
    id: "w03-q19",
    week: 3,
    topic: "Interventions scolaires",
    source: "student",
    question: "Dans une étude d'Iyengar et Lepper (1999), des enfants anglo-américains et des enfants américains d'origine asiatique doivent résoudre des anagrammes. Le thème des anagrammes est choisi par l'enfant lui-même, par le chercheur ou par la mère de l'enfant. Quelle conclusion peut-on tirer de cette étude ?",
    options: [
      "Pour tous les enfants, quelle que soit leur culture, choisir soi-même est le meilleur moyen d'être intéressé et de réussir.",
      "L'effet du choix dépend de la culture. Pour certains enfants, un choix fait par un proche motive autant ou plus qu'un choix personnel.",
      "Ce qui compte, c'est que le choix soit fait par un adulte, n'importe lequel, et non par l'enfant.",
      "Les enfants américains d'origine asiatique sont en général moins motivés que les enfants anglo-américains."
    ],
    correct: [1],
    explanation: "Enfants anglo-américains : meilleures performances et motivation intrinsèque la plus forte (temps passé sur les anagrammes en jeu libre) quand ils choisissent eux-mêmes ; scores bas quand le chercheur ou la mère choisit. Enfants américains d'origine asiatique : meilleurs résultats quand la mère choisit (environ 8,8 anagrammes réussies, environ 340 s en jeu libre), puis choix personnel, puis chercheur. Même idée que Li et al. (2021) : le lien entre passion et réussite dépend du niveau d'individualisme de la culture.",
    distractors: {
      "0": "Vrai seulement pour les enfants anglo-américains.",
      "2": "Le choix du chercheur (un adulte) donne les scores les plus bas dans les deux groupes : c'est la proximité de la personne qui compte.",
      "3": "Faux : ce sont les plus motivés de tous quand la mère choisit. La motivation dépend de qui choisit, pas d'un niveau général."
    },
    ref: "Émotions épistémiques (Filippa), p. 31 ; p. 8",
    status: "ok",
    note: "Valeurs lues sur les graphiques (approximatives)."
  },
  {
    id: "w03-q20",
    week: 3,
    topic: "Interventions scolaires",
    source: "student",
    question: "Quelle proposition est la plus à même d'encourager le développement de l'intérêt chez les élèves ?",
    options: [
      "Veiller à ce que les modalités d'enseignement et le contenu des cours puissent être captivants (tant pour l'élève que pour l'enseignant·e). Proposer des tâches exigeantes mais expliquées clairement ; adapter les contenus au profil des élèves.",
      "Proposer un contenu de cours le plus simplifié possible, incluant des tâches simples et répétitives afin que les élèves aient un sentiment de compétence et s'engagent dans leur apprentissage.",
      "Expliquer très en détail les raisons pour lesquelles il est indispensable d'apprendre la matière en question et expliquer que les modalités d'évaluation sont très difficiles et le taux d'échec important dans cette matière, afin d'encourager au travail."
    ],
    correct: [0],
    explanation: "A combine plusieurs leviers du cours : contagion de l'intérêt (un enseignant ou un matériel enthousiasmant, phase 1 du modèle de Hidi & Renninger), structure d'appraisal (tâches nouvelles et complexes mais compréhensibles) et personnalisation du contexte (Reber et al., 2018).",
    distractors: {
      "1": "Des tâches simples et répétitives ne sont ni nouvelles ni complexes : dans l'espace de Muis et al. (2018), cela mène au neutre ou à l'ennui, pas à la curiosité.",
      "2": "Insister sur la difficulté et l'échec ne fait partie d'aucune intervention du cours. La pertinence personnelle fonctionne quand l'élève rédige lui-même un texte sur l'utilité de la matière ; elle aide surtout les élèves qui ont de faibles attentes de réussite (Hulleman & Harackiewicz, 2009)."
    },
    ref: "Émotions épistémiques (Filippa), p. 17-18, 23-25, 27, 30 et 33",
    status: "ok",
    note: "A ne reprend pas un énoncé précis du cours, mais c'est la seule option compatible avec lui."
  },
  {
    id: "w03-q21",
    week: 3,
    topic: "Curiosité et mémoire",
    source: "student",
    question: "Laquelle de ces affirmations est FAUSSE :",
    options: [
      "À faible curiosité, les informations à valence positive et négative sont mieux retenues que les informations neutres.",
      "À faible curiosité, les informations positives et négatives sont retenues presque autant l'une que l'autre.",
      "À haute curiosité, l'écart de rappel entre les informations neutres et les informations positives/négatives est plus faible qu'à faible curiosité.",
      "À haute curiosité, les informations neutres sont mieux retenues que les informations positives et négatives."
    ],
    correct: [3],
    explanation: "Marvin & Shohamy (2016) : la courbe neutre reste en dessous des courbes positive et négative à tous les niveaux de curiosité, même au niveau 7 (environ 0,80 contre 0,82 et 0,86).",
    distractors: {
      "0": "Vrai : au niveau 1, environ 0,69 (positif) et 0,68 (négatif) contre 0,54 (neutre).",
      "1": "Vrai : au niveau 1, les courbes positive et négative sont presque confondues.",
      "2": "Vrai : l'écart passe d'environ 0,15 au niveau 1 à environ 0,06 au niveau 7."
    },
    ref: "Émotions épistémiques (Filippa), p. 13",
    status: "ok",
    note: "Mention « (faux) » retirée de l'option D : c'était la clé indiquée par l'étudiant·e. Valeurs lues sur le graphique (approximatives)."
  },
  {
    id: "w03-q22",
    week: 3,
    topic: "Appraisal de l'intérêt (Silvia)",
    source: "student",
    question: "Selon la structure d'appraisal de l'intérêt présentée dans le cours, dans quelle situation l'intérêt est-il le plus susceptible d'être déclenché ?",
    options: [
      "Une situation familière, simple et compréhensible",
      "Une situation nouvelle, complexe et peu compréhensible",
      "Une situation nouvelle, complexe mais suffisamment compréhensible",
      "Une situation familière, complexe et menaçante"
    ],
    correct: [2],
    explanation: "Silvia (2005) : nouveau ET complexe MAIS compréhensible. La complexité doit rester maîtrisable (appraisal du potentiel de maîtrise).",
    distractors: {
      "0": "Ni nouvelle ni complexe : zone neutre dans l'espace de Muis et al. (2018).",
      "1": "Faible compréhensibilité : on obtient plutôt de la confusion (Muis et al., 2018).",
      "3": "Familiarité contredit nouveauté ; la menace renvoie plutôt à l'anxiété, dont la fonction est opposée à celle de l'intérêt."
    },
    ref: "Émotions épistémiques (Filippa), p. 4, 23 et 25",
    status: "ok",
    note: "Réponse proposée (C) confirmée."
  },
  {
    id: "w03-q23",
    week: 3,
    topic: "L'intérêt, émotion de base",
    source: "student",
    question: "Pourquoi Paul Ekman a-t-il initialement retiré l'intérêt de son modèle des émotions de base ?",
    options: [
      "Parce que l'intérêt ne provoque aucune modification physiologique mesurable chez l'être humain.",
      "Parce que l'intérêt était considéré comme un processus purement cognitif sans aucune composante affective.",
      "Parce qu'Ekman cherchait des émotions associées à des expressions faciales universelles, et que l'intérêt ne produit pas une expression faciale unique et partagée par tous.",
      "Parce que la grande majorité des sujets de ses recherches ne ressentaient jamais d'intérêt."
    ],
    correct: [2],
    explanation: "Le modèle d'Ekman repose sur un programme d'affect facial panculturel (p. 5). L'intérêt est mal reconnu sur un visage statique (29 %) et mieux reconnu avec le corps et le mouvement (jusqu'à 75 %) : il n'a pas d'expression faciale unique (Dukes et al., 2017).",
    distractors: {
      "0": "Faux : Silvia (2008) décrit une réponse psychophysiologique pour l'intérêt (activation du système nerveux sympathique).",
      "1": "Faux : le cours traite l'intérêt comme une émotion, avec sentiment subjectif, expression motrice et tendance à l'approche.",
      "3": "Aucune donnée de ce type dans le cours ; l'intérêt est présenté comme une émotion fondamentale."
    },
    ref: "Émotions épistémiques (Filippa), p. 4-6 et 24",
    status: "ok",
    note: "« Initialement » : dans le schéma d'Ekman (1972), l'intérêt figure parmi les émotions du programme d'affect facial ; le retrait est postérieur. La raison n'est pas écrite sur les diapos (voir w03-q08)."
  },
  {
    id: "w03-q24",
    week: 3,
    topic: "Curiosité et mémoire",
    source: "student",
    question: "Selon le modèle d'Erdemli et al. (2025), quel élément parmi les quatre suivants ne fait PAS partie du schéma ?",
    options: [
      "Wanting",
      "Liking",
      "Hoping",
      "Learning"
    ],
    correct: [2],
    explanation: "Le schéma d'Erdemli, Audrin & Sander (2025) suit la curiosité et le plaisir dans le temps, en trois phases : anticipation de la récompense (wanting), de l'indice (question ou manque d'information) jusqu'à la récompense (la connaissance) ; consommation de la récompense (liking) ; satiété (learning). La curiosité culmine juste avant la réponse, le plaisir juste après. « Hoping » n'y figure pas.",
    distractors: {
      "0": "Phase d'anticipation de la récompense : la curiosité monte après l'indice.",
      "1": "Phase de consommation de la récompense : le plaisir culmine quand la connaissance arrive.",
      "3": "Phase de satiété de la récompense."
    },
    ref: "Émotions épistémiques (Filippa), p. 14",
    status: "ok",
    note: ""
  },
  {
    id: "w03-q25",
    week: 3,
    topic: "Curiosité et mémoire",
    source: "student",
    question: "Comment réagit la pupille lorsqu'une personne est curieuse ?",
    options: [
      "Elle se dilate davantage, surtout autour du moment où la réponse est affichée",
      "Elle se contracte",
      "Elle ne change pas : la curiosité n'a pas de signature physiologique",
      "Elle se dilate surtout quand la curiosité est faible"
    ],
    correct: [0],
    explanation: "Kang et al. (2009) : la dilatation pupillaire est plus forte pour les questions à curiosité élevée. Elle commence à monter avant l'affichage de la réponse et culmine juste après.",
    distractors: {
      "1": "Le graphique montre une dilatation (PDR au-dessus de la ligne de base), pas une contraction.",
      "2": "Faux : la dilatation pupillaire varie selon le niveau de curiosité.",
      "3": "C'est l'inverse : la courbe Low Curiosity est la plus basse."
    },
    ref: "Émotions épistémiques (Filippa), p. 10-12",
    status: "ok",
    note: "Question ouverte à l'origine : options rédigées pour le format QCM."
  },
  {
    id: "w03-q26",
    week: 3,
    topic: "Curiosité et mémoire",
    source: "student",
    question: "Que montrent les travaux de Kang et al. sur curiosité et mémoire ?",
    options: [
      "Plus une personne est curieuse de connaître une réponse, moins elle s'en souvient ensuite.",
      "La curiosité active des régions liées à la récompense et est associée à un meilleur rappel des réponses.",
      "La curiosité améliore uniquement la mémoire d'informations déjà connues.",
      "La curiosité agit sur la mémoire sans aucune modification physiologique."
    ],
    correct: [1],
    explanation: "Titre de l'article : la curiosité épistémique active le circuit de la récompense et améliore la mémoire. En IRMf, les questions à forte curiosité activent davantage le noyau caudé et le gyrus frontal inférieur. Le rappel augmente avec la curiosité (environ 38 %, 52 %, 66 %). Conclusion du cours : l'information intéressante est conceptualisée comme une récompense.",
    distractors: {
      "0": "C'est l'inverse.",
      "2": "Le cours ne dit rien de tel : on mesure le rappel des réponses que les participants ne connaissaient pas.",
      "3": "Faux : la pupille se dilate davantage et le circuit de la récompense s'active."
    },
    ref: "Émotions épistémiques (Filippa), p. 10-12 et 34",
    status: "ok",
    note: "Pourcentages lus sur le graphique (approximatifs). Distracteur C : l'idée que les réponses n'étaient pas connues vient de la logique de l'étude (questions de culture générale, p. 9), elle n'est pas écrite sur les diapos."
  },
  {
    id: "w03-q27",
    week: 3,
    topic: "Développement de l'intérêt (Hidi & Renninger)",
    source: "student",
    question: "Quelle étape du modèle de développement de l'intérêt chez les élèves est à rapprocher d'un début de motivation intrinsèque pour l'activité en question ?",
    options: [
      "Le déclenchement de l'intérêt situationnel",
      "Le maintien de l'intérêt situationnel",
      "L'émergence de l'intérêt personnel",
      "La stabilisation de l'intérêt individuel"
    ],
    correct: [2],
    explanation: "Phase 3 : émergence de l'intérêt individuel, définie comme la disposition à s'engager volontairement et avec plaisir dans l'activité d'apprentissage. L'engagement vient alors de l'élève, et plus seulement de l'environnement, d'où le rapprochement avec un début de motivation intrinsèque.",
    distractors: {
      "0": "Phase 1 : l'intérêt est déclenché par l'environnement (matériel ou enseignant enthousiasmant).",
      "1": "Phase 2 : encore situationnel, soutenu par le plaisir ressenti ou la pertinence personnelle de l'activité.",
      "3": "Phase 4 : l'intérêt individuel est déjà installé ; ce n'est plus un « début »."
    },
    ref: "Émotions épistémiques (Filippa), p. 27",
    status: "ok",
    note: "Le cours dit « intérêt individuel » ; « personnel » conservé tel quel. La motivation intrinsèque n'apparaît pas sur la diapo : le lien passe par la définition de la phase 3. Mention « VRAI » retirée de l'option C."
  },
  {
    id: "w03-q28",
    week: 3,
    topic: "Curiosité et mémoire",
    source: "student",
    question: "Quelle(s) affirmation(s) est/sont VRAIE(S) concernant l'effet de la curiosité sur la mémoire ?",
    options: [
      "Seule une curiosité élevée améliore la mémorisation. Une curiosité modérée n'a pas d'effet.",
      "La curiosité améliore la mémorisation pour tous les types de contextes (positif, neutre, négatif).",
      "Sans curiosité, on voit un effet de la valence sur la mémorisation. Les contextes positifs et négatifs sont mieux rappelés que les neutres.",
      "Le niveau de curiosité pour la réponse va prédire la probabilité de se souvenir de la réponse."
    ],
    correct: [1, 2, 3],
    explanation: "B : chez Marvin & Shohamy (2016), le rappel augmente avec la curiosité dans les trois contextes. C : au niveau de curiosité le plus bas, positif et négatif (environ 0,69 et 0,68) dépassent le neutre (environ 0,54). D : chez Kang et al. (2009) comme chez Marvin & Shohamy, la probabilité de rappel augmente avec le niveau de curiosité.",
    distractors: {
      "0": "Faux : la curiosité moyenne améliore déjà le rappel (environ 52 % contre 38 % en curiosité faible chez Kang et al.), et l'effet est progressif chez Marvin & Shohamy."
    },
    ref: "Émotions épistémiques (Filippa), p. 12-13",
    status: "ok",
    note: "Réponse proposée (B, C, D) confirmée. Pour C, « sans curiosité » correspond au niveau le plus bas de l'échelle (1 sur 7) : l'étude n'a pas de condition sans curiosité. Valeurs lues sur les graphiques (approximatives)."
  },
  {
    id: "w03-q29",
    week: 3,
    topic: "Appraisal de l'intérêt (Silvia)",
    source: "student",
    question: "Quelle est la situation la plus favorable pour induire un niveau de curiosité élevé :",
    options: [
      "low capacity, high novelty and complexity",
      "high capacity, low novelty and complexity",
      "high capacity, high novelty and complexity"
    ],
    correct: [2],
    explanation: "Espace d'appraisal des émotions épistémiques (Muis et al., 2018) : la curiosité se situe là où nouveauté et complexité sont élevées ET la capacité est élevée. C'est l'équivalent de « nouveau et complexe MAIS compréhensible » chez Silvia.",
    distractors: {
      "0": "Zone de la confusion : elle mène à la joie si elle se résout, à l'anxiété ou la frustration sinon, à l'ennui si elle persiste.",
      "1": "Zone neutre : capacité élevée mais pas de nouveauté ni de complexité."
    },
    ref: "Émotions épistémiques (Filippa), p. 25 ; p. 23",
    status: "ok",
    note: "Les options 1 et 4 de la liste étaient identiques (« low capacity, high novelty and complexity ») : doublon supprimé."
  }
]);
