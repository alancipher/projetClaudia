import "./Index.scss";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
import React from "react";
import ReactPlayer from "react-player";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = {
	card: {
		padding: 10,
	},
	media: {
		//   height: 400,
		//   width: 800,
		padding: 20,
	},
};
// FIXME page d'acceuil

const Index = (props) => {
	const { classes } = props;
	return (
		<div className='Index'>
			<Card className={classes.card}>
				<div className='player-wrapper' align='center'>
					<ReactPlayer
						className='react-player'
						style={styles.media}
						url='https://www.youtube.com/watch?v=j0frSvu2Y1Y&feature=youtu.be'
						width='100%'
						height='100%'
						controls
					/>
				</div>
				<CardContent>
					<div className='HowTo'>
						<p className='answer'>
							Bienvenue sur la plateforme web du{" "}
							<strong>
								Comité de perfectionnement clinique de l’Université de Montréal
							</strong>
							. Cette application est créée, pour les étudiants de médecine de
							l’UdeM, par des étudiants de l’UdeM.
						</p>
						<p className='answer'>
							Ce projet n’aurait pas pu exister sans le soutien financier et
							l’aide apportée par l’Association des Étudiantes et Étudiants en
							Médecine de l’Université de Montréal. Nous vous remercions.
						</p>
						<p>
							<strong>Qui sommes-nous?</strong>
						</p>
						<p className='answer'>
							Actuellement, en 2018, notre équipe est composée d’étudiants en
							médecine à l’UdeM à leur deuxième année de l’externat ainsi que
							deux programmeuses dévouées.{" "}
						</p>
						<p className='answer'>
							Ce site Web peut aussi être aussi utilisé sur le cellulaire pour
							que vous puissiez pratiquer des cas cliniques en vue des ECOS.
							Nous vous invitons à jeter un coup d’œil à la{" "}
							<Link to='/faq'>foire aux questions</Link> afin de savoir comment
							débuter.
						</p>
						<p className='answer'>
							Pour l’instant, nous avons des cas cliniques pour les étudiants en
							première année et en deuxième année du pré-clinique, mais nous
							travaillons pour préparer des cas pour les étudiants à l’externat.
						</p>
						<br />
						<br />
						<br />
						<p>
							<strong>Notre équipe</strong>
						</p>
						<p>Président : Andrei Bursuc</p>
						<p>Programmeuses :</p>
						<p> Mugisha Joyce-Christiane Kakou</p>
						<p> Christina Thao Nguyen </p>
						<br />
						<p>
							<strong>Membres de l’équipe fondatrice: </strong>
						</p>
						<p>Rossi Zhao</p>
						<p>Émilie Thivierge</p>
						<p>Jacob Gervais</p>
						<p>Charlotte Gallienne</p>
						<p>Karma Abukasm</p>
						<p>Simon Pradella</p>
						<p>Maggie Wei</p>
						<p>Antoine Robert</p>
						<p>Laurence Poirier Blanchette</p>
						<p>Eric Mereniuk</p>
						<p>Alexandra Gravel</p>
						<p>Ariane Turenne</p>
						<p>Carl-Elie Majdalani</p>
						<br />
						<p>
							<strong>
								Nous aimerions aussi ajouter une mention de remerciement pour
								l’équipe 2020-2021:{" "}
							</strong>
						</p>
						<p>Brenda Deschesnes, promotion 2023</p>
						<p>Katerina Sanchez Schicharew, promotion 2021</p>
						<p>Laura Catherine Proulx, promotion 2023</p>
						<p>Massine Fellouah, promotion 2023</p>
						<p>Marie Vincent-Tremblay, promotion 2022</p>
						<p>Philippe Ouellet, promotion 2023</p>
						<p>Patricia Myszak, promotion 2023</p>
						<p>Karine Therrien, promotion 2023</p>
						<p>Chrystelle El-Khoury, promotion 2021</p>
						<p>OumKaltoum Jarati, promotion 2021</p>
						<p>Stefan Bursuc, promotion 2023</p>
						<p>Alexandre Ponomarev, promotion 2022</p>
						<p>Anne-Sophie Gervais</p>
						<p>Christelle R.Khoury, promotion 2021</p>
						<p>Jimmy Li, promotion 2021</p>
						<p>Qi Li, promotion 2021</p>
						<p>Lawrence Ledoux-Hutchinson, promotion 2021</p>
						<p>Gwenaëlle Plonquet-Thibeault, promotion 2021</p>
						<p>Merieme Habti, promotion 2021</p>
						<p>Kim Anh La, promotion 2022</p>
						<p>Mélanie Francoeur, promotion 2023</p>
						<br />
						<br />
						<p>
							<strong>
								Un remerciement spécial aux résidents qui ont révisé les
								vignettes 2020-2021:{" "}
							</strong>
						</p>
						<p>Dr Maher Al Khaldi</p>
						<p>Dr Francis Godin </p>
						<p>Dre Sarah-Jeanne Séguin</p>
					</div>
				</CardContent>

				<CardActions>
					<Link to='/signup'>
						<Button size='small' color='primary'>
							Inscription
						</Button>
					</Link>
					<Link to='/faq'>
						<Button size='small' color='primary'>
							Foire aux questions
						</Button>
					</Link>
				</CardActions>
			</Card>
			<br /> <br /> <br />
			<br /> <br /> <br />
			<br /> <br /> <br />
			<br /> <br /> <br />
			<br /> <br /> <br />
			<p>
				<small>
					{" "}
					Nous remercions le Groupe de Perfectionnement des Habiletés Cliniques
					(GPHC) de l’Université Laval pour leur idée de conception d’un site de
					pratique d’ÉCOS adapté aux besoins de nos étudiants.
				</small>
			</p>
		</div>
	);
};

export default withStyles(styles)(Index);

// FIXME plz help
{
	/* <div className='row banner index-banner'>
          
          <h1 className='responsive-headline'>
              <img
                  src="https://res.cloudinary.com/joyce-ava-services/image/upload/v1528916687/UDEM/aeemum.png"
                  alt="AEEMUM"
              />
          </h1>

          <br />
          <br />

     
  </div> */
}
