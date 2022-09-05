import { useEffect, useState } from 'react'
import CardTechnology from '../components/documentation/card_technology'
import HelmetMetaData from '../components/helmet_meta_data'
import technologies from '../components/utils/documentation'
import { gerStore } from '../components/utils/store'
import style from './services_documentation.module.sass'

export default function ServicesDocumentation() {
    const [favoriteDocs, setFavoriteDocs] = useState([])

    const getFavorites = (): void => {
        const getFavorites = gerStore('favoritesExams')
        setFavoriteDocs(getFavorites || [])
    }

    useEffect(() => {
        getFavorites()
    }, [])

    return (
        <div
            className={style.servicePage}
        >
            <HelmetMetaData title="AWS Documentation" />
            <h1>Partes importantes para el Examen de AWS 🤓</h1>
            <div
                className={style.serviceGallery}
            >
                {technologies.map(technology => <CardTechnology
                    key={technology.name}
                    technology={technology}
                    favoriteDocs={favoriteDocs}
                    getFavorites={getFavorites}
                />)}
            </div>

        </div>
    )
}
