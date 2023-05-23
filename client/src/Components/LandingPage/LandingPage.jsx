import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

export default function LandingPage() {
	return (
		<div className={style.container}>
			<div className={style.welcome}>
				<h1 className={style.title}>Individual Project Countries</h1>
				<h2 className={style.subtitle}>Created by Ignacio Cenni</h2>
				<Link to='/home'>
					<button className={style.boton}>Ingresar</button>
				</Link>
			</div>
		</div>
	);
}
