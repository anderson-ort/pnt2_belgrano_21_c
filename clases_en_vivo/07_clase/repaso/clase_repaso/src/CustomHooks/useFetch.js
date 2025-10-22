import React, { useEffect, useState } from 'react'

const useFetch = (url, nombrekey) => {

    const [datos, setDatos] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(url)
                const data = await response.json()

                const result = await data[nombrekey]
                setDatos(result)
                setError(null)

            } catch (error) {
                console.error('Error al consumir el endpoint', error);
                setError(error)
            } finally {
                setLoading(false)
            }


        }

        fetchData()
    }
        , []
    )

    return { datos, error, loading }




}

export default useFetch