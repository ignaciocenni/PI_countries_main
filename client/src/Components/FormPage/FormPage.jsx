import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, postActivity } from '../../Redux/actions/actions';
import validate from './validate';

import style from './FormPage.module.css';
import logo from '../../assets/img/logo.png';

export default function FormPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const countries = useSelector((state) => state.countries);
	const [errors, setErrors] = useState({});

	const [input, setInput] = useState({
		name: '',
		difficulty: '',
		duration: '',
		season: '',
		countries: [],
	});

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	function handleChange(event) {
		setInput({
			...input,
			[event.target.name]: event.target.value,
		});
		setErrors(
			validate({
				...input,
				[event.target.name]: event.target.value,
			})
		);
		console.log(input);
	}

	const handleSelect = (event) => {
		setInput((estado) => {
			if (event.target.name === 'countries') {
				if (estado.countries.includes(event.target.value)) {
					return estado;
				}
				return {
					...estado,
					countries: [...estado.countries, event.target.value],
				};
			} else {
				return {
					...estado,
					[event.target.name]: event.target.value,
				};
			}
		});
	};

	function handleSubmit(event) {
		event.preventDefault();
		console.log(input);
		if (
			!input.name ||
			!input.difficulty ||
			!input.duration ||
			!input.season ||
			!input.countries
		) {
			return alert(
				'Complete correctamente el formulario antes de enviarlo'
			);
		}
		try {
			dispatch(postActivity(input));
			alert('Actividad Creada Exitosamente');
		} catch (error) {
			console.log(error);
			alert('La actividad ya existe.');
		}
		setInput({
			name: '',
			difficulty: '',
			duration: '',
			season: '',
			countries: [],
		});
		navigate('/home');
	}

	function handleDelete(event) {
		setInput({
			...input,
			countries: input.countries.filter((con) => con !== event),
		});
	}

	function handleClick(event) {
		event.preventDefault();
		navigate('/home');
	}

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	return (
		<div className={style.prindiv}>
			<div className={style.bar}>
				<Link to='/home'>
					<img
						className={style.bothome}
						onClick={(event) => handleClick(event)}
						src={logo}
						alt='logo'
					></img>
				</Link>
			</div>
			<div className={style.contenedorform}>
				<h2 className={style.titulof}>Crea tu Actividad Turística</h2>
				<form onSubmit={(event) => handleSubmit(event)}>
					<div>
						<label className={style.campos}>Nombre: </label>
						<input
							className={style.inputs}
							type='text'
							value={input.name}
							name='name'
							onChange={(e) => handleChange(e)}
						/>
						{errors.name && (
							<p className={style.errors}>{errors.name}</p>
						)}
					</div>
					<div>
						<label className={style.campos}>
							Escoja el país para su actividad:{' '}
						</label>
						<select
							className={style.inputs}
							name='countries'
							id='countries'
							onChange={(e) => handleSelect(e)}
						>
							<option value='vacio'> </option>
							{countries
								.sort((a, b) => a.name.localeCompare(b.name))
								.map((con) => (
									<option key={con.id} value={con.id}>
										{con.name}
									</option>
								))}
						</select>
						{errors.countries && (
							<p className={style.errors}>{errors.countries}</p>
						)}
					</div>
					<div>
						<label className={style.campos}>Temporada: </label>
						<select
							className={style.inputs}
							name='season'
							id='season'
							onChange={(e) => handleSelect(e)}
						>
							<option value='vacio'> </option>
							<option value={'Summer'}>Verano </option>
							<option value={'Winter'}>Invierno </option>
							<option value={'Spring'}>Primavera </option>
							<option value={'Autumn'}>Otoño </option>
						</select>
						{errors.season && (
							<p className={style.errors}>{errors.season}</p>
						)}
					</div>
					<div>
						<label className={style.campos}>Dificultad: </label>
						<input
							className={style.inputs}
							type='number'
							min='1'
							max='5'
							value={input.difficulty}
							name='difficulty'
							onChange={(e) => handleChange(e)}
						/>
						{errors.difficulty && (
							<p className={style.errors}>{errors.difficulty}</p>
						)}
					</div>
					<div>
						<label className={style.campos}>Duración: </label>
						<input
							className={style.inputs}
							type='number'
							min='1'
							max='24'
							value={input.duration}
							name='duration'
							onChange={(e) => handleChange(e)}
						/>
						<label className={style.campos}> horas</label>
						{errors.duration && (
							<p className={style.errors}>{errors.duration}</p>
						)}
					</div>
					<div>
						<button
							className={style.botsub}
							type='submit'
							disabled={
								Object.keys(errors).length === 0 ? false : true
							}
						>
							Añadir Actividad
						</button>
					</div>
				</form>

				{input.countries.map((e) => (
					<div key={e.id} className={style.conpais}>
						<p className={style.mpais}> {e} </p>
						<button
							className={style.botelim}
							onClick={() => handleDelete(e)}
						>
							X{' '}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
