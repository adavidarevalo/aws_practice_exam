import React, { useContext } from 'react'
import { Button } from 'semantic-ui-react'
import { QuestionContext } from './context/question'

export default function ChangeLanguageButton() {
    const {
        state,
        setState
    } = useContext(QuestionContext)

    const handleChangeLanguage = () => {
        // setState(prevState => ({
        //     ...prevState,
        //     language: prevState.language === 'es' ? 'en' : 'es'
        // }))
    }

    return (
        <Button
            // content={state.language === 'es' ? 'Ingles' : "Español"}
            content={'Ingles'}
            onClick={handleChangeLanguage}
        />
    )
}
