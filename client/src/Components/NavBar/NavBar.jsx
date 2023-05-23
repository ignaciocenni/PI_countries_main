import { React } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCountries, getCountriesByName } from '../../Redux/actions/actions';

import style from './NavBar.module.css';

import logo from '../../assets/img/logo.png';

export default function NavBar({ setCurrentPage }) {
	const dispatch = useDispatch();
	const [name, setName] = useState('');

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	function handleClick(e) {
		e.preventDefault();
		dispatch(getCountries());
	}

	function handleInputChange(e) {
		dispatch(getCountriesByName(e));
		setCurrentPage(1);
	}

	return (
		<div className={style.navbar}>
			<div className={style.contLogo}>
				<Link to='/home'>
					<img
						className={style.image}
						onClick={(e) => handleClick(e)}
						src={logo}
						alt='logo'
					></img>
				</Link>
			</div>
			<div className={style.contSearch}>
				<div className={style.search}>
					<div className={style.searchtitle}>
						Encuentra Tu Próximo Destino
					</div>
					<input
						className={style.searchinp}
						value={name}
						type='text'
						placeholder='Qué país deseas visitar...'
						onChange={(e) => {
							setName(e.target.value);
							handleInputChange(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className={style.contAct}>
				<Link to='/activities'>
					<button className={style.botact}>Crear Actividad</button>
				</Link>
			</div>
		</div>
	);
}
