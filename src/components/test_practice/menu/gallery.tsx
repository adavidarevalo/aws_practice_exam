import { useContext, useEffect, useState } from 'react'
import CardContent from './card_content'
import { QuestionContext } from '../../context/question'
import Loading from '../../loading'
import MainApi from "./../../utils/axios"
import { gerStore } from '../../utils/store'

export default function Gallery() {
    const {
        state,
        setState
    } = useContext(QuestionContext)

    const [favoritesExams, setFavoritesExams] = useState<{
        id: string,
        type: string
    }[]>([])

    useEffect(() => {
        getGalleryData()
    }, [])

    const getGalleryData = async () => {
        try {
            const result = await MainApi.getGallery()
            setState(prevState => ({
                ...prevState,
                galleryExam: result
            })),
                getFavorites()
        } catch ({ message }) {
            //TODO: Add modal fot the error
        }
    }

    const getFavorites = (): void => {
        const getFavorites = gerStore('favoritesExams')
        setFavoritesExams(getFavorites || [])
    }

    return (
        <>
            {state.galleryExam.length === 0 && <Loading />}
            {state.galleryExam.length > 0 && (
                <div style={{
                    display: 'flex',
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    justifyContent: "space-between"
                }}>
                    {state.galleryExam.map(exam => (
                        <CardContent
                            exam={exam}
                            favoritesExams={favoritesExams}
                            getFavorites={getFavorites}
                        />
                    ))}
                </div>
            )}
        </>
    )
}
