import React from 'react';
import { Link } from 'react-router-dom';

import style from './Card.module.css';

export default function Card({ imgFlag, name, continent, id }) {
	return (
		<div className={style.card}>
			<div>
				<img
					className={style.bandera}
					src={imgFlag}
					alt='Imagen no disponible'
				/>
			</div>
			<h3 className={style.titulo}>{name}</h3>
			<h5 className={style.continente}>{continent}</h5>

			<Link to={`/countries/${id}`}>
				<button className={style.boton}>Ver Más</button>
			</Link>
		</div>
	);
}
