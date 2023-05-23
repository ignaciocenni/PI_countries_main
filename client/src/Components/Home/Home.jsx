import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getCountries, filterByContinents, orderByName, orderByPop, filterByAct, getActivities } from "../../Redux/actions/actions"; 
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";

import s from "./Home.module.css"


export default function Home (){

    const dispatch = useDispatch()
    const allCountries = useSelector ((state) => state.countries)
    const activities = useSelector ((state) => state.allActivities)

    // eslint-disable-next-line no-unused-vars
    const [orden, setOrden]= useState("")

    const [currentPage, setCurrentPage] = useState(1)
    // eslint-disable-next-line no-unused-vars
    let [countriesPerPage, setCountriesPerPage] = useState(10)
    
    
            

    const indexOfLastCountrie = currentPage * countriesPerPage
    const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountrie,indexOfLastCountrie)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        dispatch(getCountries());
        dispatch(getActivities());
    },[dispatch])

    function handleFilteredCountrie(event){
        dispatch(filterByContinents(event.target.value))
    };

    function handleSort(event){
        event.preventDefault()
        dispatch(orderByName(event.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${event.target.value}`)
    };

    function handleSortPop(event){
        event.preventDefault()
        dispatch(orderByPop(event.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${event.target.value}`)
    };

    function handleFilterByAct(event){
        event.preventDefault()
        event.target.value === "none" ? dispatch(getCountries()):
        dispatch(filterByAct(event.target.value))
        setCurrentPage(1)
    }

    

    return (
        <div className={s.prindiv}>
            
            <div><NavBar
            setCurrentPage={setCurrentPage}
            /></div>
            
            <div className={s.filtros}>
            <div>
                Orden Alfabético    
            <select className={s.select} onChange={e => handleSort(e)}>
                <option></option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            </div>
            <div>
                Número de Habitantes
            <select className={s.select} onChange={e => handleSortPop(e)}>
                <option></option>
                <option value="mayp">Menor a Mayor</option>
                <option value="menp">Mayor a Menor</option>
            </select>
            </div>
            <div>
                Busca por Continentes
            <select className={s.select} onChange={e => handleFilteredCountrie(e)}>
                <option value={"All"}> </option>
                <option value={"Americas"}>Americas</option>
                <option value={"Africa"}>África</option>
                <option value={"Asia"}>Asia</option>
                <option value={"Europe"}>Europa</option>
                <option value={"Oceania"}>Oceanía</option>
                <option value={"Antarctica"}>Antárctica</option>
            </select>
            </div>
            <div>
                Busca por Actividad
                {(activities.length === 0)? <p>No se han creado actividades</p> :
                <select className={s.select} onChange={e => handleFilterByAct(e)}>
                <option value="none"></option>
                {activities.map(e => (
                <option value={e.name} key={e.id}>{e.name}</option>
                ))}
                </select>
                }
            </div>
            </div>

            <div className={s.contenedorCards}>    
           {currentCountries.length?currentCountries.map( ({name, index, imgFlag, id, continent}) => {
               return (
                <div key={id} className={s.Card}>
                <Card imgFlag={imgFlag} name={name} continent={continent} key={index} id={id} />
                </div>
                )
                }):<h1>No hay paises</h1>}
            </div>


            <div className={s.paginado}>
            <Paginado
            countriesPerPage = {countriesPerPage}
            allCountries = {allCountries.length}
            paginado = {paginado}
            /> 
            </div>
        
        </div>
    )
}