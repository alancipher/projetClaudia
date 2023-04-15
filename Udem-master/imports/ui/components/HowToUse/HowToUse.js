import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";

// TODO add stepper with screenshots
export default class HowToUse extends Component {
  render() {
    return (
      <div className="HowTo">
        <p className="question">Comment s'inscrire? </p>
        <p className="answer">
        Utilisez votre adresse de courriel de l'université de Montréal (@umontreal.ca) et créez votre propre mot de passe. 
          <br /> <br/>
        
        </p>

        <p className="question">Qu'est-ce que les stations ECOS?  </p>
        <p className="answer">
        Selon le Conseil médical du Canada, la définition des stations ECOS est un type d’examen souvent utilisé dans les sciences de la santé. Il est conçu de manière à évaluer le rendement et les compétences cliniques à l’égard d’une série d’aptitudes. Il s’agit d’une approche pratique et réaliste quant à l’apprentissage et à l’évaluation. 
          <br /> <br/>
          Voici une description selon un point de vue d’un étudiant en médecine. Les ÉCOS sont une série d'entrevues médicales simulées qui se déroulent dans une salle, impliquant un patient acteur et un médecin évaluateur.  Celui-ci évalue la performance de l’étudiant, à l’aide d’une grille standardisée, sur ordinateur, sur laquelle il coche l’atteinte des exigences pour l’anamnèse et de l’examen physique. Le patient acteur octroie également une note de son appréciation clinique de l’étudiant dans son approche. Chaque station a une durée maximale de 8 minutes, exigeant le respect des consignes inscrites sur la porte ou demandées à l’intérieur de la station. La plupart du temps, il est demandé de faire un anamnèse ciblé, un examen physique ciblé et de répondre à des questions à la fin par l’évaluateur. Les simulations peuvent aussi être uniquement une entrevue de 8 minutes s'il n'y a pas d'examen physique requis. Par exemple, les stations de simulation de psychiatrie. Il peut être demandé également une démonstration d’une technique apprise lors des activités de simulation au CAAHC. Par exemple, démontrer une réanimation cardio-respiratoire sur un mannequin, réaliser une ponction artérielle, etc.
        </p>
        <p className="question">Comment améliorer la gestion du temps?</p>
        <p className="answer">
        La gestion du temps représente un défi pour tous. Le temps accordé pour chaque station est suffisant pour accomplir les tâches demandées. La plupart des étudiants réussissent à atteindre la majorité des objectifs demandés dans les limites de temps.
        <br/><br/>
        Rappelez-vous que l’anamnèse et l’examen physique doivent toujours être ciblés et pertinents aux cas cliniques.
        <br/><br/>
        La pratique fréquente des ECOS aide à vous familiariser avec la structure. Posez des questions vous aide à apprendre le questionnaire de façon organisée et à améliorer votre rapidité.
<br/><br/>
Commencez d’abord par une question ouverte puis, au fur et à mesure, dirigez les questions. Ne vous éparpillez pas dans les diagnostics exotiques. Les cas cliniques sont basés sur des pathologies médicales courantes. Prêtez attention aux indices donnés par les patients acteurs. Ils sont d’une précieuse aide. Évitez de déplacer le patient inutilement de la position assise à couchée, à plusieurs reprises, lors de l’examen physique. N’hésitez pas à prendre une pause pour réfléchir quelques instants et vous recadrer à la situation. 

        </p>
        <p className="question">Quelles sont les stratégies d’étude pour les ECOS?</p>
        <p className="answer">
        Les ECOS représentent un examen pour lequel il est difficile d'étudier, car il exige du raisonnement clinique. Toutefois, il est possible d'apprendre la structure de base de l’anamnèse. Ce site web vous permet d'apprendre cette structure pour l'entrevue médicale. 
        <br/><br/>
        Former un groupe d’étude peut être formateur et utile. Le meilleur conseil pour se préparer aux stations ECOS est la pratique afin de se familiariser avec la structure.
        </p>

        <p className="question">Comment utiliser cette application web? </p>
        <p className="answer">
        Nous avons créé des cas cliniques basés sur des stations ECOS. Il est recommandé de ne pas dire les réponses avant de pratiquer avec un ami ou un membre de la famille qui joue le rôle du patient.
        <br/><br/>
        Vous devez sélectionner un cas clinique sur le sujet qui vous intéresse ainsi qu’un niveau de difficulté. Nous vous conseillons de respecter l'ordre et de pratiquer les cas selon l’ordre des blocs que vous avez appris jusqu'à présent.
        <br/><br/>
        Pour commencer, choisissez un cas et lisez la consigne pour l'étudiant qui joue le rôle du médecin puis donnez l'ordinateur ou le téléphone à votre partenaire qui joue le rôle du patient. 
Celui-ci peut réviser les réponses avant de commencer le cas. Pour débuter, il doit peser sur l’icône “play”.

<br/><br/>
Vous le questionnez et celui-ci coche, au fur et à mesure, les questions que vous avez réussies à poser. Lorsque vous cochez l’atteinte d’une question, la réponse apparaît. Utilisez ces réponses pour orienter votre anamnèse ciblé. 
<br/><br/>
Une fois le cas fini, révisez les question que vous avez oubliées afin de réaliser vos améliorations à apporter. Il est tout à fait normal d’oublier certaines parties du questionnaire et ce, peu importe l’avancement de la formation médicale. 
        </p>
      </div>
    );
  }
}

/* <span className="role">
Vous, en tant que médecin, devez:
</span>
<br />
&nbsp;&nbsp;&nbsp;&nbsp;Demander les questions appropriées durant cette consultation
<br />
<span className="role">
Votre partenaire, en tant que patient, doit:
</span>
<br />
&nbsp;&nbsp;&nbsp;&nbsp;Cocher les questions demandées par le médecin et y répondre
selon les réponses affichées */