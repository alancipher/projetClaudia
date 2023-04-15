/* eslint-disable consistent-return */

import Cases from '../Cases/Cases';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Documents = new Mongo.Collection('Documents');


Documents.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Documents.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

var grade = new SimpleSchema({
    grade: {
        type: Number,
        label: 'Grade in %',
    },
    time: {
        type: String,
        label: 'Time it took to do it',

    }
});

var importantQuestion2 = new SimpleSchema({
    text: {
        type: String,
        label: 'Description / Symptômes',
        optional: true,
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
        defaultValue: false
    }


});

var importantQuestion3 = new SimpleSchema({
    text: {
        type: String,
        label: 'Symptôme',
        optional: true,
    },
    description: {
        type: String,
        label: 'Description (si présent)',
        optional: true,
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
            omit: true
          },
    }


});
var importantQuestion = new SimpleSchema({
    text: {
        type: String,
        label: 'Description / symptôme',
        optional: true,
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
        defaultValue: false
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
        defaultValue: false
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
        }
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
        label: 'Age',
        min: 0,
        max: 99,

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
    },
    studentContext: {
        type: String,
        label: 'Contexte pour le medecin',
    },
    patientContext: {
        type: String,
        label: 'Contexte pour le patient',
    },
    stationTime: {
        type: String,
        label: 'Durée de la station',
        defaultValue: '10',
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
    },
    ageAndOcc: {
        type: String,
        label: 'Âge et occupation',
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
        label: 'Psychiatriques, psychologique',
    },
    gyn: {
        type: importantQuestion2,
        label: 'Gynécologiques/obstétriques',
        optional: true,
    },
    famHist: {
        type: importantQuestion2,
        label: 'Antécédents familiaux',
        optional: true,
    },
    trans: {
        type: importantQuestion2,
        label: 'Transusion',
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
        label: 'Activités/loisirs',
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

    },

    two: {
        type: String,
        label: 'Diagnostic différentiel',


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

 const theCaseSchema = new SimpleSchema({
    owner: {
        type: String,
        label: 'Auteur(e) du cas clinique',
        optional: true,

    },
    createdAt: {
        type: String,
        optional: true,
        label: 'Date de création',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
        },

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
        type: String,
        label: '',
        optional: true,
    },
    timeItTook: {
        type: Number,
        label: '',
        optional: true,
    },
    score: {
        type: Number,
        label: '',
        optional: true,
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



Documents.schema = new SimpleSchema({
    owner: {
        type: String,
        label: 'Id of the person who executed the case',
    },
    createdAt: {
        type: String,
        label: 'The date this document was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
        },
    },
    updatedAt: {
        type: String,
        label: 'The date this document was last updated.',
        autoValue() {
            if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
        },
    },
    caseId: {
        type: String,
        optional:true,
        label: 'Id of the case that was completed',
    },
    caseDoc: {
       
        type: theCaseSchema ,
        optional:true,
        label: 'Answers the student entered in the most recent submit',
    },
    bestScore: {
        optional:true,
        type: grade,
        label: 'Best score',
    },
    firstScore: {
        type: grade,
        optional:true,
        label: 'First score',
    },
    lastScore: {
        optional:true,
        type: grade,
        label: 'Last grade',
    },
    scores: {
        type: Array,
        optional: true,
        label: 'all the scores the student has had',
    },
    'scores.$': {
        type: Object,
        optional: true,
    },
    'scores.$.grade': {
        type: grade,
        optional: true,
    },


});

// Documents.attachSchema(Documents.schema);

export default Documents;
 