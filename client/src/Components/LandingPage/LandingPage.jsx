import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

export default function LandingPage() {
	return (
		<div className={style.container}>
			<div className={style.welcome}>
				<h1 className={style.title}>Proyecto Individual 'Countries'</h1>
				<h2 className={style.subtitle}>Creado por Ignacio Cenni</h2>
				<Link to='/home'>
					<button className={style.boton}>Ingresar</button>
				</Link>
			</div>
		</div>
	);
}
