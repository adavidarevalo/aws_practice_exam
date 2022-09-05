export type QuestionsContextState = {
    state: IState,
    setState: React.Dispatch<React.SetStateAction<IState>>,
    questionLists: IQuestionsLists | null,
    setQuestionLists: React.Dispatch<React.SetStateAction<IQuestionsLists | null>>
};
import React, { createContext, useState, FC } from "react";
import { IGallery, TFormType } from "../utils/axios";

const contextDefaultValues: QuestionsContextState = {
    state: {
        actualQuestion: 1,
        activeFlags: [],
        answers: [],
        language: "es",
        isFinishExam: false,
        galleryExam: []
    },
    setState: () => { },
    questionLists: null,
    setQuestionLists: () => { }
};

export const QuestionContext = createContext<QuestionsContextState>(contextDefaultValues);

export interface IQuestion {
    question: String,
    question_2?: String,
    url?: string;
    options: {
        value: string;
        id: String
    }[],
    id: string
}

export interface IQuestionsLists {
    formId: string;
    formType: TFormType;
    questions: {
        id: string;
        en: IQuestion;
        es: IQuestion
    }[]
}

export type TLanguage = "es" | "en"

export interface IState {
    actualQuestion: number;
    activeFlags: number[]
    answers: {
        questionId: string,
        solutionId: string[]
    }[],
    language: TLanguage;
    isFinishExam: boolean
    galleryExam: IGallery[]
}


const QuestionProvider = ({ children }: { children: JSX.Element }) => {

    const [state, setState] = useState<IState>({
        actualQuestion: 1,
        activeFlags: [],
        answers: [],
        language: "es",
        isFinishExam: false,
        galleryExam: [],
    })

    const [questionLists, setQuestionLists] = useState<IQuestionsLists | null>(null)

    return (
        <QuestionContext.Provider
            value={{
                state,
                setState,
                questionLists,
                setQuestionLists
            }}
        >
            {children}
        </QuestionContext.Provider>
    );
};

export default QuestionProvider;