/ eslint-disable consistent-return /

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import uniforms from 'uniforms';

const Cases = new Mongo.Collection('Cases');

Cases.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Cases.deny({
    insert: () => false,
    update: () => true,
    remove: () => true,
});

//Subschemas
SimpleSchema.setDefaultMessages({
    messages: {
        en: {
            required: 'Veuillez completer le champ {{label}}',
        },
    },
});
var importantQuestion2 = new SimpleSchema({
    text: {
        type: String,
        label: 'Description / Symptômes',
        optional: true,
        defaultValue:'N/A'
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
         }
    }


});

var exam = new SimpleSchema({
    text: {
        type:String,
        optional:true,
        defaultValue:'N/A'
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
         }
    }
});
var importantQuestion3 = new SimpleSchema({
    text: {
        type: String,
        label: 'Symptôme',
        optional: true,
        defaultValue:'N/A'
    },
    description: {
        type: String,
        label: 'Description (si présent)',
        optional: true,
        defaultValue:'N/A'
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
         }
    }


});
var importantQuestion = new SimpleSchema({
    text: {
        type: String,
        label: 'Description / symptôme',
        optional: true,
        defaultValue:'N/A'
    },
    important: {
        type: Boolean,
        label: "Question importante",
        optional: true,
        defaultValue: false
    },
    presence: {
        type: Boolean,
        label: "Symptôme Présent",
        optional: true,
        defaultValue: false,
        
    },
    done: {
        type: Boolean,
        label: false,
        optional: true,
        defaultValue: false,
        uniforms: {
            component: () => null // that's ok!
         }
    }

});

var importantQuestion4 = new SimpleSchema({
    name: {
        type: String,
        label: 'Nom du symptôme',
        optional: true,
    },
    text: {
        type: String,
        label: 'Description / symptôme',
        optional: true,
        defaultValue:'N/A'
    },
    important: {
        type: Boolean,
        label: "Question importante",
        optional: true,
        defaultValue: false
    },
    presence: {
        type: Boolean,
        label: "Présent",
        optional: true,
        defaultValue: false,
        
    },
    done: {
        type: Boolean,
        label: false,
        optional: true,
        defaultValue: false,
        uniforms: {
            component: () => null // that's ok!
         }
    }

});

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
    }
});


//gabarit
var gabarit = new SimpleSchema({
    nom: {
        type: String,
        label: 'Nom',
        uniforms: {
            placeholder: 'Nom du patient',
        },
        defaultValue:'Sans nom'
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
    age: {
        type: Number,
        label: 'Âge',
        min: 0,
        max: 99,
        defaultValue: 35,

    },
    niveau: {
        type: String,
        label: 'Niveau',
        defaultValue: 'Facile',
        allowedValues: ['Facile', 'Moyen', 'Difficile']
    },
    reason: {
        type: String,
        label: 'Raison de la consultation',
        defaultValue:'N/A'
    },
    studentContext: {
        type: String,
        label: 'Contexte pour le medecin',
        defaultValue:'N/A'
    },
    patientContext: {
        type: String,
        label: 'Contexte pour le patient',
        defaultValue:'N/A'
    },
    stationTime: {
        type: String,
        label: 'Durée de la station',
        defaultValue: '10 minutes',
        allowedValues: ['6 minutes', '8 minutes', '10 minutes', '12 minutes', '14 minutes']
    },
    systeme: {
        type: String,
        label: 'Système du cas clinique',
        defaultValue: 'Général',
        allowedValues: ['Général', 'Microbiologie', 'Neurologie', 'Psychiatrie', 'Urinaire', 'Hématologie', 'Locomoteur', 'Cardiologie', 'Pneumologie', 'Néphrologie', 'Gastro-entérologie', 'Endocrinologie', 'Gynécologie', 'Multisystème (Rhumatologie, Maladie systémiques)', 'Pédiatrie', 'Gériatrie', 'ORL']
    },

});

//introduction
var introduction = new SimpleSchema({
    salutation: {
        type: Boolean,
        label: 'Salutation et presentation',
        defaultValue: false,

    },
    comfort: {
        type: Boolean,
        label: 'S\'assurer du confort',
        defaultValue: false,


    },

    consultationReason2: {
        type: String,
        label: 'Raison de consultation secondaire',
        optional: true,
        defaultValue:'N/A'
    },
    ageAndOcc: {
        type: String,
        label: 'Occupation',
        defaultValue:'N/A'
    },
    plan: {
        type: Boolean,
        label: 'Etablir le plan de l\'entrevue',
        defaultValue: false,

    },
});

//antecedants
var ante = new SimpleSchema({

    personal: {
        type: importantQuestion2,
        label: 'Personnels',
    },
    surgeries: {
        type: importantQuestion2,
        label: 'Chirurgicaux',

    },
    psy: {
        type: importantQuestion2,
        label: 'Psychiatriques, psychologiques',
    },
    gyn: {
        type: importantQuestion2,
        label: 'Gynécologiques et obstétricaux',
        optional: true,
    },
    famHist: {
        type: importantQuestion2,
        label: 'Familiaux',
        optional: true,
    },
    trans: {
        type: importantQuestion2,
        label: 'Transfusions',
        optional: true,
    },
    allergies: {
        type: importantQuestion2,
        label: 'Allergies',
        optional: true,
    },
});

//medication
var meds = new SimpleSchema({
    listOfMeds: {
        type: importantQuestion2,
        label: 'Listes de medicaments',
        optional: true,
    },
    recentChanges: {
        type: importantQuestion2,
        label: 'Changements récents',
        optional: true,
    },
  
    emptyStomach: {
        type: importantQuestion2,
        label: 'Vente libre',
        optional: true,
    },
  
});

//life context
var context = new SimpleSchema({

    job: {
        type: importantQuestion2,
        label: 'Emploi',
        optional: true,
    },
    partner: {
        type: importantQuestion2,
        label: 'Partenaire',
        optional: true,
    },
    environment: {
        type: importantQuestion2,
        label: 'Milieux de vie',
        optional: true,
    },
    stressLevel: {
        type: importantQuestion2,
        label: 'Niveau de stress',
        optional: true,
    },
    activities: {
        type: importantQuestion2,
        label: 'Activités et loisirs',
        optional: true,
    },
    travels: {
        type: importantQuestion2,
        label: 'Voyages récents',
        optional: true,
    },

});

//life habits
var habits = new SimpleSchema({
    tabacco: {
        type: importantQuestion2,
        label: 'Tabac',
    },
    alcohol: {
        type: importantQuestion2,
        label: 'Alcool',
    },
    drugs: {
        type: importantQuestion2,
        label: 'Drogues',
    },
    coffee: {
        type: importantQuestion2,
        label: 'Caféines/stimulants',
    },
    physAct: {
        type: importantQuestion2,
        label: 'Activité physique',
    },
    foodHabits: {
        type: importantQuestion2,
        label: 'Alimentation',
    },
    sexuality: {
        type: importantQuestion2,
        label: 'Sexualité',
    },
    sleep: {
        type: importantQuestion2,
        label: 'Sommeil',
    },
});

var p = new SimpleSchema({
    one: {
        type: importantQuestion2,
        label: 'provoqué',
        optional: true
    },
    two: {
        type: importantQuestion2,
        label: 'pallié',
        optional: true
    },
});

var q = new SimpleSchema({
    one: {
        type: importantQuestion2,
        label: 'qualité',
        optional: true
    },
    two: {
        type: importantQuestion2,
        label: 'quantité',
        optional: true
    },
});

var r = new SimpleSchema({
    one: {
        type: importantQuestion2,
        label: 'région',
        optional: true
    },
    two: {
        type: importantQuestion2,
        label: 'irradiation',
        optional: true
    },
});

var s = new SimpleSchema({
    one: {
        type: importantQuestion2,
        label: 'sévérité',
        optional: true
    },

});


var t = new SimpleSchema({
    one: {
        type: importantQuestion2,
        label: 'Depuis combien de temps?',
        optional: true
    },
    two: {
        type: importantQuestion2,
        label: 'Constant/intermittent',
        optional: true
    },
    three: {
        type: importantQuestion2,
        label: 'Croissant/stable',
        optional: true
    },
    four: {
        type: importantQuestion2,
        label: 'fin',
        optional: true
    },

});


//history
var history = new SimpleSchema({
    historic: {
        type: importantQuestion2,
        label: 'Question ouverte',
    },
    p: {
        type: p,
        label: 'P',
        optional: true,
    },
    q: {
        type: q,
        label: 'Q ',
        optional: true,
    },
    r: {
        type: r,
        label: 'R',
        optional: true,
    },
    s: {
        type: s,
        label: 'S',
        optional: true,
    },
    t: {
        type: t,
        label: 'T',
        optional: true,
    },
});

//introduction
var general = new SimpleSchema({

    one: {
        type: importantQuestion,
        label: 'Fièvre',
    },
    two: {
        type: importantQuestion,
        label: 'Perte d\'appétit',
    },
    three: {
        type: importantQuestion,
        label: 'Diaphorèse nocturne',
    },
    four: {
        type: importantQuestion,
        label: 'Fatigue',
    },
    revue: {
        type: importantQuestion,
        label: 'Revue',
    },
});


//pica
var pica = new SimpleSchema({

    one: {
        type: importantQuestion2,
        label: 'Perception',
    },

    two: {
        type: importantQuestion2,
        label: 'Impacts',
    },

    three: {
        type: importantQuestion2,
        label: 'Craintes',
    },

    four: {
        type: importantQuestion2,
        label: 'Attentes',
    },
});
//Question additionelle
var add = new SimpleSchema({

    one: {
        type: String,
        label: 'Diagnostic principal',
        defaultValue:'N/A'

    },

    two: {
        type: String,
        label: 'Diagnostic différentiel',
        defaultValue:'N/A'


    },

    three: {
        type: question,
        label: 'Question pertinentes qui pourraient se retrouver dans un cas d’ÉCOS',
        optional: true,
        

    },

    four: {
        type: question,
        label: 'Autre questions pertinentes qui pourraient se retrouver dans un cas d’ÉCOS',
        optional: true,

    },
});

 Cases.schema = new SimpleSchema({
    owner: {
        type: String,
        label: 'Auteur(e) du cas clinique',
        optional: true,


    },
    createdAt: {
        type: String,
        optional: true,
        label: 'Date de création',
        defaultValue:  (new Date()).toISOString(),
       

    },
    updatedAt: {
        type: String,
        optional: true,
        label: 'Plus recente modification',
        autoValue() {
            if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
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


    //life context (All of this section is optional)
    lifeContext: {
        type: context,
        label: '',
        optional: true,
    },
    //life habits
    lifeHabits: {
        type: habits,
        label: '',
        optional: true,
    },

    //histoire de la maladie actuelle
    currentHist: {
        type: history,
        label: '',
        optional: true,
    },

    //general symptoms
    generalSymp: {
        type: general,
        optional: true,
        label: '',
    },
    otherSystems: {
        type: Array,
        label: false,
        optional: true,
        // minCount:1,
        // min:1

    },
    "otherSystems.$": {
        type: Object,
        optional: true,
        // minCount:1,
        // min:1
    },
    "otherSystems.$.name": {
        type: String,
        label: "Nom du système",
        optional: true,
        defaultValue:'N/A'
    },
    "otherSystems.$.system": {
        type: Array,
        label: false,
        optional: true,
    },
    "otherSystems.$.system.$": {
        type: Object,
        optional: true,
    },
    "otherSystems.$.system.$.symptom": {
        type: importantQuestion4,
        optional: true,
        label: false
    },

    pica: {
        type: pica,
        optional: true,
        label: '',
    },

    physicalExam: {
        type : Array,
        label: '',
        optional: true,
        minCount:1,
        min:1,
    },
    'physicalExam.$': {
        type: Object,
        optional: true,
        
    },
    'physicalExam.$.text': {
        type: String,
        label:"Paragraphe",
        optional: true,
        defaultValue:"N/A",
    },
    additional: {
        type: add,
        label: '',
        optional: true,

    },
    references: {
        type: Array,
        optional: true,
        label: false
    },
    'references.$': {
        type: Object,
        optional: true
    },
    'references.$.text': {
        type: String,
        optional: true
    }


});




Cases.attachSchema(Cases.schema);

export default Cases;
