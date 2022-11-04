import React, { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownProps } from 'semantic-ui-react';
import { QuestionContext, TLanguage } from '../../context/question';

interface IProps {
    accepted: () => void;
}

const languageOptions = [
    { key: 'Ingles', text: 'Ingles', value: 'en' },
    // { key: 'Spanish', text: 'Español', value: 'es' }
]
export default function StartExam({ accepted }: IProps) {
    const navigate = useNavigate()

    const {
        setState
    } = useContext(QuestionContext)

    const getTest = useMemo(() => {
        const queryString = window.location;
        const url = queryString.pathname.split('/')

        if (!!url[url.length - 1] === false) {
            navigate(`/practice-exam`)
            return
        }

        return url[url.length - 1]
    }, [])

    const handleChangeLanguage = (
        _: React.SyntheticEvent<HTMLElement, Event>,
        { value }: DropdownProps
    ) => {
        setState(prevState => ({
            ...prevState,
            language: value as TLanguage
        }))
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh"
        }}>
            <h1>Comenzar Examen</h1>
            <h2>Pueba {getTest}</h2>
            <Button.Group>
                <Button
                    onClick={() => {
                        navigate(`/practice-exam`)
                    }}
                >Cancel</Button>
                <Button.Or />
                <Button
                    positive
                    onClick={accepted}
                >Comenzar</Button>
            </Button.Group>
            <div style={{
                position: "absolute",
                bottom: "0px",
                right: "0px"
            }}>
                <Dropdown
                    button
                    className='icon'
                    floating
                    labeled
                    icon='world'
                    onChange={handleChangeLanguage}
                    options={languageOptions}
                    text='Selecione el Idioma'
                />
            </div>
        </div>
    )
}
