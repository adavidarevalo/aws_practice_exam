import { useContext, useEffect, useState } from 'react'
import CardContent from './card_content'
import { QuestionContext } from '../../context/question'
import Loading from '../../loading'
import MainApi from "./../../utils/axios"
import { gerStore } from '../../utils/store'
import exams from './../../../assets/exams/index.json'
import { Accordion, Icon } from 'semantic-ui-react'
import _ from 'lodash'

export default function Gallery() {
    const {
        state,
        setState
    } = useContext(QuestionContext)

    const [activeIndex, setActiveIndex] = useState(NaN)

    const [favoritesExams, setFavoritesExams] = useState<{
        id: string,
        type: string
    }[]>([])

    useEffect(() => {
        getFavorites()
    }, [])

    const getFavorites = (): void => {
        const getFavorites = gerStore('favoritesExams')
        setFavoritesExams(getFavorites || [])
    }

    return (
        <>
            <Accordion fluid styled>
                {exams.map(exam => {
                    let counterExams = 0;
                    exam.exams.forEach(({ examsCount }) => {
                        counterExams += examsCount
                    })
                    return (
                        <>
                            <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={(_, { index }) => setActiveIndex(Number(index === activeIndex ? NaN : 0))}
                            >
                                <Icon name='dropdown' />
                                {`${_.startCase(exam.type.replaceAll("_", " "))} (${counterExams} exams)`}
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: "baseline",
                                    flexWrap: "wrap",
                                    justifyContent: "space-between"
                                }}>
                                    {exam.exams.map(examContainer => (
                                        <CardContent
                                            exam={{
                                                type: exam.type,
                                                image: exam.image,
                                                id: examContainer._id,
                                            }}
                                            favoritesExams={favoritesExams}
                                            getFavorites={getFavorites}
                                        />
                                    ))}
                                </div>
                            </Accordion.Content>
                        </>
                    )
                })}
            </Accordion>
            {/* )} */}
        </>
    )
}
