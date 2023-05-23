import { React, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesDetail } from '../../Redux/actions/actions';

import style from './DetailPage.module.css';
import logo from '../../assets/img/logo.png';

export default function DetailPage() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const country = useSelector((state) => state.detail);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getCountriesDetail(id));
	}, [dispatch, id]);

	function handleClick() {
		navigate('/home');
	}

	return (
		<div className={style.prindiv}>
			<div className={style.bar}>
				<Link to='/home'>
					<img
						className={style.bothome}
						onClick={(e) => handleClick(e)}
						src={logo}
						alt='logo'
					></img>
				</Link>
			</div>

			<div className={style.cardd}>
				<div className={style.conpais}>
					<h2 className={style.titulod}>Detalles del País</h2>
					{country ? (
						<div>
							<img
								className={style.banderad}
								src={country.imgFlag}
								alt='Imagen no disponible'
							/>
							<h2 className={style.nombred}>{country.name}</h2>
							<h4 className={style.continented}>
								{country.continent}
							</h4>
							<h4 className={style.codigo}>{country.id}</h4>
							<h4 className={style.detalle}>
								Capital: {country.capital}
							</h4>
							<h4 className={style.detalle}>
								Región: {country.subregion}
							</h4>
							<h4 className={style.detalle}>
								Área: {country.area} km²
							</h4>
							<h4 className={style.detalle}>
								Población: {country.population} Hab.
							</h4>
						</div>
					) : (
						<p>Loading ...</p>
					)}
				</div>

				<div className={style.conact}>
					<h3 className={style.titulod}>Actividades del País</h3>
					{country.Activities && country.Activities.length ? (
						country.Activities?.map((e) => {
							return (
								<div key={e.id}>
									<h4 className={style.nombreact}>
										{e.name}
									</h4>
									<p className={style.detalle}>
										Dificultad: {e.difficulty}
									</p>
									<p className={style.detalle}>
										Duración: {e.duration} horas
									</p>
									<p className={style.detalle}>
										Temporada: {e.season}
									</p>
								</div>
							);
						})
					) : (
						<p>No existen actividades en este país</p>
					)}
					<Link to='/activities'>
						<button className={style.botactd}>
							Crear Actividad
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
