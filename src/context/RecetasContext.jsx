import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const RecetasContext = createContext()

export const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([])
    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    })
    const [ consultar, guardarConsultar ] = useState(false)

    const { nombre, categoria } = busqueda

    useEffect(()=>{
        if(!consultar) return 

        const obtenerRecetas = async () =>{
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}}&c=${categoria}`

            const resultado = await axios.get(url)
            guardarRecetas(resultado.data.drinks)
            guardarConsultar(false)
        }
        obtenerRecetas()
    },[busqueda])

    return(
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider