import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import uniforms from 'uniforms';

// question type 
var question1 = new SimpleSchema({
    text: {
        type: String,
        label: 'Texte',
        optional: true,
        defaultValue: 'N/A',
        optional: true
    },
    important: {
        type: Boolean,
        label: "Question importante",
        optional: true,
        defaultValue: false
    },
    done: {
        type: Boolean,
        label: false,
        optional: true,
        defaultValue: false,
        uniforms: {
            component: () => null // that's ok!
        },
    },
    value: {
        type: Number,
        label: 'Pondération',
        min: 0,
        max: 10,
        defaultValue: 1,

    },
});

// question type 
var question2 = new SimpleSchema({
    text: {
        type: String,
        label: 'Texte',
        optional: true,
        defaultValue: 'N/A',
      
    },
    important: {
        type: Boolean,
        label: "Question importante",
        optional: true,
        defaultValue: false
    },
    present: {
        type: Boolean,
        label: "Symptôme présent",
        optional: true,
        defaultValue: false
    },
    done: {
        type: Boolean,
        label: false,
        optional: true,
        defaultValue: false,
        uniforms: {
            component: () => null // that's ok!
        },
    },
    value: {
        type: Number,
        label: 'Pondération',
        min: 0,
        max: 10,
        defaultValue: 0,

    },
});

//additional questions 
var question = new SimpleSchema({
    question: {
        type: String,
        label: 'Question',
        optional: true,
    },
    reponse: {
        type: String,
        label: 'Réponse',
        optional: true,
    },
    value: {
        type: Number,
        label: 'Pondération',
        min: 0,
        max: 10,
        defaultValue: 0,

    },
});

// gabarit 
var gabarit = new SimpleSchema({
    nom: {
        type: String,
        label: 'Nom du patient',
        optional: true,
        defaultValue: 'N/A',
        optional: true

    },
    age: {
        type: Number,
        label: 'Âge',
        min: 0,
        max: 99,
        defaultValue: 23,
    },
    niveau: {
        type: String,
        label: 'Niveau',
        defaultValue: 'Facile',
        allowedValues: ['Facile', 'Moyen', 'Difficile']
    },
   
    sexe: {
        type: String,
        label: 'Sexe',
        uniforms: {
            placeholder: 'Sexe du patient',
        },
        defaultValue: 'Masculin',
        allowedValues: ['Masculin', 'Féminin'],
    },
   
    stationTime: {
        type: String,
        label: 'Durée de la station',
        defaultValue: '10 minutes',
        allowedValues: ['6 minutes', '8 minutes', '10 minutes', '12 minutes', '14 minutes']
    },
    contenu: {
        type: String,
        label: 'Contenu de la station',
        defaultValue: 'anamnèse',
        allowedValues: ['anamnèse', 'examen physique ', 'anamnèse et examen physique', ' anamnèse et questions']
    },
});

// introduction
var introduction = new SimpleSchema({
    q1: {
        type: question1,
        label: 'Raison de consultation primaire (en quelques mots)',

    },
    q2: {
        type: question1,
        label: 'Raison de consultation secondaire (si applicable)',

    },
    q3: {
        type: String,
        label: 'Contexte pour l’étudiant',
        defaultValue: 'N/A',
        optional: true
    },
    q4: {
        type: String,
        label: 'Contexte pour le patient',
        defaultValue: 'N/A',
        optional: true
    }

});

// antecedents
var ante = new SimpleSchema({
    q1: {
        type: question1,
        label: 'Personnels médicaux',

    },
    q2: {
        type: question1,
        label: 'Ophtalmologique',

    },
    q3: {
        type: question1,
        label: 'Chirurgicaux',

    },
    q4: {
        type: question1,
        label: 'Psychiatriques/psychologiques',

    },
    q5: {
        type: question1,
        label: 'Gynécologiques/obstétriques ',

    },
    q6: {
        type: question1,
        label: 'Vaccins',

    },
    q7: {
        type: question1,
        label: 'Antécédents familiaux',

    },
    q8: {
        type: question1,
        label: 'Allergies (présence, réaction)',

    },

});


// medicaments
var meds = new SimpleSchema({
    q1: {
        type: question1,
        label: 'Liste de médicaments',

    },
    q2: {
        type: question1,
        label: 'Gouttes ophtalmiques',

    },
    q3: {
        type: question1,
        label: 'Observance et/ou changements récents',

    },
    q4: {
        type: question1,
        label: 'Produits de santé naturels',

    }

});

// Habitudes de vie
var habits = new SimpleSchema({
    q1: {
        type: question1,
        label: 'Tabac',

    },
    q2: {
        type: question1,
        label: 'Alcool',

    },
    q3: {
        type: question1,
        label: 'Drogues',

    },
    q4: {
        type: question1,
        label: 'Caféines/stimulants',

    },
    q5: {
        type: question1,
        label: 'Activité physique',

    },
    q6: {
        type: question1,
        label: 'Alimentation',

    },
    q7: {
        type: question1,
        label: 'Sexualité',

    },
    q8: {
        type: question1,
        label: 'Sommeil',

    }

});


// Contexte de vie:
var lifeContext = new SimpleSchema({
    q1: {
        type: question1,
        label: 'Occupation',
      
        optional: true
    },
    q2: {
        type: question1,
        label: 'Partenaire/famille',
      
        optional: true
    },
    q3: {
        type: question1,
        label: 'Milieu de vie',
 
        optional: true
    },
    q4: {
        type: question1,
        label: 'Niveau de stress',
     
        optional: true
    },
    q5: {
        type: question1,
        label: 'Activités/loisirs',
   
        optional: true
    },
    q6: {
        type: question1,
        label: 'Voyages récents',
   
        optional: true
    }

});

var _p = new SimpleSchema({
    one: {
        type: question2,
        label: 'provoqué',
        optional: true
    },
    two: {
        type: question2,
        label: 'pallié',
        optional: true
    },
});

var _q = new SimpleSchema({
    one: {
        type: question1,
        label: 'qualité',
        optional: true
    },
    two: {
        type: question1,
        label: 'quantité',
        optional: true
    },
});



var _s = new SimpleSchema({
    one: {
        type: question1,
        label: 'sévérité',
        optional: true
    },

});

var _r = new SimpleSchema({
    one: {
        type: question2,
        label: 'région',
        optional: true
    },
    two: {
        type: question2,
        label: 'irradiation',
        optional: true
    },
});

var _t = new SimpleSchema({
    one: {
        type: question1,
        label: 'Depuis combien de temps?',
        optional: true
    },
   

});

// Histoire de la maladie actuelle et attributs de la douleur ou des symptomes 
var history = new SimpleSchema({
    open: {
        type: question2,
        label: 'Réponse à la question ouverte (moins de 5 phrases)',

    },
    p: {
        type: _p,
        label: 'P (provoqué, pallié)',
        
        optional: true
        
    },
    q: {
        type: _q,
        label: 'Q (qualité, quantité)',
     
        optional: true
    },
    r: {
        type: _r,
        label: 'R (région, irradiation)',
       
        optional: true
    },
    s: {
        type: _s,
        label: 'S (sévérité)',
       
        optional: true
    },
    t: {
        type: _t,
        label: 'T (temporalité)',
     
        optional: true
    }

});


// À demander en tout temps:
var alwaysAsk = new SimpleSchema({
    q1: {
        type: question1,
        label: 'Changement de l’acuité visuelle',

        optional: true
    },
    q2: {
        type: question1,
        label: 'Douleur oculaire',

        optional: true
    },
    q3: {
        type: question1,
        label: 'Rougeur oculaire',

        optional: true
    },
    q4: {
        type: question1,
        label: 'Photophobie',

        optional: true
    },
    q5: {
        type: question1,
        label: 'Écoulement oculaire',

        optional: true
    },
    q6: {
        type: question1,
        label: 'Prurit oculaire',

        optional: true
    },
    q7: {
        type: question1,
        label: 'Trauma oculaire',

        optional: true
    },
 
});


// symptome generaux
var general = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Fièvre',
      
        optional: true
    },
    q2: {
        type: question2,
        label: 'Perte d’appétit',
      
        optional: true
    },
    q3: {
        type: question2,
        label: 'Perte de poids',
 
        optional: true
    },
    q4: {
        type: question2,
        label: 'Diaphorèse nocturne',
     
        optional: true
    },
    q5: {
        type: question2,
        label: 'Fatigue',
   
        optional: true
    }

});

//systeme ohptalmologique 
var ophtalmo = new SimpleSchema({
  
    q1: {
        type: question2,
        label: 'Diplopie',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Réduction de l’acuité visuelle',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Sécrétions',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Sécheresse des paupières',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Larmoiement excessif',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Scotomes – phosphènes (flashs)',
        
        optional: true
    },

});

// oto-rhino-laryngologique
var oto = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Otalgie',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Hypoacousie',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Tinnitus (acouphènes)',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Dysphonie – Aphonie',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Saignement gingival',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Rhinorrhée',
        
        optional: true
    },
    q7: {
        type: question2,
        label: 'Otorrhée',
        
        optional: true
    },
    q8: {
        type: question2,
        label: 'Éternuement',
        
        optional: true
    },
    q9: {
        type: question2,
        label: 'Épistaxis',
        
        optional: true
    },
    q10: {
        type: question2,
        label: 'Prurit nasal',
        
        optional: true
    },
    q11: {
        type: question2,
        label: 'Écoulement nasal postérieur',
        
        optional: true
    },
    q12: {
        type: question2,
        label: 'Ulcération buccale',
        
        optional: true
    },
});

// neuro
var neuro = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Dominance manuelle (D ou G, même si ce n’est pas un symptôme, c’est utile à savoir)',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Céphalée',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Perte de conscience',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Syncope',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Convulsions',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Amaurose fugace',
        
        optional: true
    },
    q7: {
        type: question2,
        label: 'Paresthésies',
        
        optional: true
    },
    q8: {
        type: question2,
        label: 'Vertiges – Étourdissements',
        
        optional: true
    },
    q9: {
        type: question2,
        label: 'Dysphasie – Aphasie',
        
        optional: true
    },
    q10: {
        type: question2,
        label: 'Troubles sensoriels',
        
        optional: true
    },
    q11: {
        type: question2,
        label: 'Tremblements',
        
        optional: true
    },
    q12: {
        type: question2,
        label: 'Ataxie',
        
        optional: true
    },
    q13: {
        type: question2,
        label: 'Perte de mémoire',
        
        optional: true
    },

});


// psych 
var psych = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Anxiété',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Tristesse',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Colère',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Culpabilité',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Euphorie',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Idéation suicidaire',
        
        optional: true
    },
    q7: {
        type: question2,
        label: 'Hallucinations visuelles',
        
        optional: true
    },
    q8: {
        type: question2,
        label: 'Hallucinations auditives',
        
        optional: true
    },
    q9: {
        type: question2,
        label: 'Troubles de comportement',
        
        optional: true
    },

});


// respiratoire
var respi = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Consommation de tabac (nombre de paquets/année)',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Toux',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Expectorations',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Hémoptysies',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Dyspnée (grade I à V)',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Douleur thoracique',
        
        optional: true
    },
    q7: {
        type: question2,
        label: 'Exposition industrielle ou autre (amiantose, silicose)',
        
        optional: true
    },
    q8: {
        type: question2,
        label: 'Dernière RX pulmonaire',
        
        optional: true
    },

});


// cardio
var cardio = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Douleur rétrosternale',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Palpitations',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Perte de conscience/syncope',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Dyspnée (grade I à IV)',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Dyspnée paroxystique nocturne',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Orthopnée',
        
        optional: true
    },
    q7: {
        type: question2,
        label: 'Claudication intermittente',
        
        optional: true
    },
    q8: {
        type: question2,
        label: 'Œdème des membres inférieurs',
        
        optional: true
    },

});


// gastro
var gastro = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Odynophagie',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Dysphagie',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Dyspepsie – Brûlure épigastrique',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Régurgitation/reflux',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Ictère',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Hématémèse',
        
        optional: true
    },
    q7: {
        type: question2,
        label: 'Rectorragie',
        
        optional: true
    },
    q8: {
        type: question2,
        label: 'Méléna',
        
        optional: true
    },
    q9: {
        type: question2,
        label: 'Nausée',
        
        optional: true
    },
    q10: {
        type: question2,
        label: 'Vomissements',
        
        optional: true
    },
    q11: {
        type: question2,
        label: 'Douleur abdominale',
        
        optional: true
    },
    q12: {
        type: question2,
        label: 'Transit intestinal',
        
        optional: true
    },
    q13: {
        type: question2,
        label: 'Stéatorrhée',
        
        optional: true
    },
    q14: {
        type: question2,
        label: 'Douleur ano-rectale',
        
        optional: true
    },
});


// urinaire
var pipi = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Brûlure mictionnelle',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Dysurie (difficulté à uriner)',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Hématurie',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Nycturie',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Goutte-à-goutte',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Force du jet',
        
        optional: true
    },
    q7: {
        type: question2,
        label: 'Douleur loge rénale',
        
        optional: true
    },
    q8: {
        type: question2,
        label: 'Pollakiurie',
        
        optional: true
    },
    q9: {
        type: question2,
        label: 'Polyurie',
        
        optional: true
    },
    q10: {
        type: question2,
        label: 'Ténesme vésical',
        
        optional: true
    },
    q11: {
        type: question2,
        label: 'Miction impérieuse',
        
        optional: true
    },
    q12: {
        type: question2,
        label: 'Incontinence urinaire',
        
        optional: true
    },

});


// genital masculin
var genitalM = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Douleur périnéale',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Douleur scrotale',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Masse scrotale',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Dysfonction érectile',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Hémospermie',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Douleur à l’éjaculation',
        
        optional: true
    },
    q7: {
        type: question2,
        label: 'Écoulement urétral',
        
        optional: true
    },

});


// genital feminin
var genitalF = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Ménarche',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Histoire menstruelle (cycle menstruel)',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Date des dernières menstruations',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Ménorragie',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Métrorragie',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Leucorrhée',
        
        optional: true
    },
    q7: {
        type: question2,
        label: 'Ménopause et malaises associés',
        
        optional: true
    },
    q8: {
        type: question2,
        label: 'Dysménorrhée',
        
        optional: true
    },
    q9: {
        type: question2,
        label: 'Dyspareunie',
        
        optional: true
    },

});


// endo
var endo = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Polydipsie',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Polyurie',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Polyphagie',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Frilosité',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Intolérance à la chaleur',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Raucité de la voix',
        
        optional: true
    },
    q7: {
        type: question2,
        label: 'Gain ou perte de poids',
        
        optional: true
    },
    q8: {
        type: question2,
        label: 'Aménorrhée – Galactorrhée',
        
        optional: true
    },
    q9: {
        type: question2,
        label: 'Tremblements',
        
        optional: true
    },
    q10: {
        type: question2,
        label: 'Pilosité excessive ou insuffisante',
        
        optional: true
    },
    q11: {
        type: question2,
        label: 'Palpitations',
        
        optional: true
    },
    q12: {
        type: question2,
        label: 'Constipation ou diarrhée',
        
        optional: true
    },
    q13: {
        type: question2,
        label: 'Sudation',
        
        optional: true
    },
    q14: {
        type: question2,
        label: 'Gynécomastie',
        
        optional: true
    },

});


// hema
var hema = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Perte de poids',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Sudation nocturne',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Masse cervicale ou inguinale',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Fatigabilité',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Susceptibilité aux infections',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Diathèse hémorragique',
        
        optional: true
    },

});


// locomoteur
var loco = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Arthralgie centrale ou périphérique',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Gonflement articulaire',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Rougeur articulaire',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Raideur matinale',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Phénomène de Raynaud',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Myalgies',
        
        optional: true
    },

});


// trophique
var trophique = new SimpleSchema({
    q1: {
        type: question2,
        label: 'Érythème',
        
        optional: true
    },
    q2: {
        type: question2,
        label: 'Prurit – Éruption',
        
        optional: true
    },
    q3: {
        type: question2,
        label: 'Hippocratisme digital',
        
        optional: true
    },
    q4: {
        type: question2,
        label: 'Pitting unguéal',
        
        optional: true
    },
    q5: {
        type: question2,
        label: 'Raynaud',
        
        optional: true
    },
    q6: {
        type: question2,
        label: 'Alopécie',
        
        optional: true
    },
    q7: {
        type: question2,
        label: 'Photosensibilité',
        
        optional: true
    },

});


// lab
var lab = new SimpleSchema({
    q1: {
        type: question1,
        label: 'Du jour même',
        
        optional: true
    },
    q2: {
        type: question1,
        label: 'Normale du patient',
        
        optional: true
    },


});


// pica
var pica = new SimpleSchema({
    q1: {
        type: question1,
        label: 'Perception',
        
        optional: true
    },
    q2: {
        type: question1,
        label: 'Impacts',
        
        optional: true
    },
    q3: {
        type: question1,
        label: 'Craintes',
        
        optional: true
    },
    q4: {
        type: question1,
        label: 'Attentes',
        
        optional: true
    }

});


// signe vitaux
var vitals = new SimpleSchema({
    q1: {
        type: question1,
        label: 'Température',
        
        optional: true
    },
    q2: {
        type: question1,
        label: 'Fréq. cardiaque',
        
        optional: true
    },
    q3: {
        type: question1,
        label: 'Fréq. respiratoire',
        
        optional: true
    },
    q4: {
        type: question1,
        label: 'Tension artérielle',
        
        optional: true
    },
    q5: {
        type: question1,
        label: 'Saturation',
        
        optional: true
    },
   

});

// examen physique 
var physical = new SimpleSchema({
    
    q1: {
        type: question1,
        label: 'Acuité visuelle',
        
        optional: true
    },
    q2: {
        type: question1,
        label: 'Champs visuels',
        
        optional: true
    },
    
    q3: {
        type: question1,
        label: 'Pupilles',
        
        optional: true
    },
    // Langage
    q4: {
        type: question1,
        label: 'Mouvements extra-oculaire',
        
        optional: true
    },
    q5: {
        type: question1,
        label: 'Pression oculaire',
        
        optional: true
    },
    q6: {
        type: question1,
        label: 'Paupières',
        
        optional: true
    },
    q7: {
        type: question1,
        label: 'Cornée',
        
        optional: true
    },
    q8: {
        type: question1,
        label: 'Conjonctive',
        
        optional: true
    },
    // Pensée
    q9: {
        type: question1,
        label: 'Chambre antérieure',
        
        optional: true
    },
 
    q10: {
        type: question1,
        label: 'Iris',
        
        optional: true
    },
    q11: {
        type: question1,
        label: 'Fundus',
        
        optional: true
    },
    q12: {
        type: question1,
        label: 'Macula',
        
        optional: true
    },
 
    q13: {
        type: question1,
        label: 'Humeur vitrée',
        
        optional: true
    },
    q14: {
        type: question1,
        label: 'Nerf optique',
        
        optional: true
    },
   
});

//Question additionelle
var add = new SimpleSchema({

    q1: {
        type: question1,
        label: 'Diagnostic principal',
        

    },

    q2: {
        type: question1,
        label: 'Diagnostic différentiel',
     


    },

    q3: {
        type: question,
        label: 'Question pertinentes qui pourraient se retrouver dans un cas d’ÉCOS',
        optional: true,
        

    },

    q4: {
        type: question,
        label: 'Autre questions pertinentes qui pourraient se retrouver dans un cas d’ÉCOS',
        optional: true,

    },
});
// surgery schema 
var Ophtalmos = new SimpleSchema({
    owner: {
        type: String,
        label: 'Auteur(e) du cas clinique',
        optional: true,


    },
    createdAt: {
        type: String,
        optional: true,
        label: 'Date de création',
        defaultValue: (new Date()).toISOString(),


    },
    updatedAt: {
        type: String,
        optional: true,
        label: 'Plus récente modification',
        autoValue() {
            if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
        },

    },
    type: {
        type: String,
        optional: true,
        label: 'Système concerné',
        defaultValue:  "Ophtalmologie",
        uniforms: {
            component: () => null // that's ok!
        },
    },

    revised: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    posted: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    prof: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    gabarit: {
        type: gabarit,
        optional: true,
        label: '',
    },

    //introduction
    intro: {
        type: introduction,
        label: '',
        optional: true,
    },
  
    //Antécédents
    antecedents: {
        type: ante,
        label: '',
        optional: true,

    },

    //medication
    medication: {
        type: meds,
        label: '',
        optional: true,
    },


    //habitudes de vie 
    lifeHabits: {
        type: habits,
        label: '',
        optional: true,
    },
 //contexte de vie
 lifeContext: {
    type: lifeContext,
    label: '',
    optional: true,
},

    //histoire de la maladie actuelle
    currentHist: {
        type: history,
        label: '',
        optional: true,
    },
//À demander en tout temps:
alwaysAsk: {
    type: alwaysAsk,
    label: '',
    optional: true
},
    //general symptoms
    generalSymp: {
        type: general,
        optional: true,
        label: '',
    },
    //systeme ophtalmologique
    sysOphtalmo: {
        type: ophtalmo,
        optional: true,
        label: '',
    },

    //systeme oto-rhino-laryngologique
    sysOto: {
        type: oto,
        optional: true,
        label: '',
    },
    //systeme neurologique
    sysNeuro: {
        type: neuro,
        optional: true,
        label: '',
    },
    //systeme psychiatrique
    sysPsych: {
        type: psych,
        optional: true,
        label: '',
    },
    //systeme respiratoire
    sysRespi: {
        type: respi,
        optional: true,
        label: '',
    },
    //systeme cardiovasculaire
    sysCardio: {
        type: cardio,
        optional: true,
        label: '',
    },
    //systeme gastro-intestinale
    sysGastro: {
        type: gastro,
        optional: true,
        label: '',
    },
    //systeme urinaire
    sysPipi: {
        type: pipi,
        optional: true,
        label: '',
    },
    //systeme genital 
    sysGenitalF: {
        type: genitalF,
        optional: true,
        label: '',
    },
     //systeme genital 
     sysGenitalM: {
        type:  genitalM,
        optional: true,
        label: '',
    },
    //systeme endocrinien
    sysEndo: {
        type: endo,
        optional: true,
        label: '',
    },
    //systeme hematologique
    sysHema: {
        type: hema,
        optional: true,
        label: '',
    },
    //systeme locomoteur
    sysLoco: {
        type: loco,
        optional: true,
        label: '',
    },
    //systeme trophique
    sysTrophique: {
        type: trophique,
        optional: true,
        label: '',
    },
  
    //imagerie
    imagerie: {
        type: String,
        optional: true,
        label: 'Pertinente à la raison de consultation',
        defaultValue:"N/A"
    },
    pica: {
        type: pica,
        optional: true,
        label: '',
    },
  //signe vitaux
  vitalsExam: {
    type: vitals,
    label: '',
    optional: true,
   
},
    // examen physique
    physicalExam: {
        type: physical,
        label: '',
        optional: true,
       
    },
 

    // plan

    plan: {
        type: String,
        label: 'Quel est votre plan?',
        optional: true,
        defaultValue:"N/A"

    },
    //questions suplementaires
    additional: {
        type: add,
        label: '',
        optional: true,

    },


});


export default Ophtalmos;