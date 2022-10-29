export type QuestionsContextState = {
    state: IState,
    setState: React.Dispatch<React.SetStateAction<IState>>,
    examsList: IExam[],
    setExams: React.Dispatch<React.SetStateAction<IExam[]>>
};

import React, { createContext, useState, FC } from "react";
import { IGallery, TFormType } from "../utils/axios";

const contextDefaultValues: QuestionsContextState = {
    state: {
        actualQuestion: 1,
        activeFlags: [],
        answers: [],
        language: "en",
        isFinishExam: false,
        galleryExam: []
    },
    setState: () => { },
    examsList: [],
    setExams: () => { }
};

export type examList = "developer_associate1"

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

// export type TLanguage = "es" | "en"
export type TLanguage = "en"

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

export interface IExam {
    en: {
        options: {
            id: number,
            value: string
        }[]
        question1: string;
        question2?: string;
        question3?: string;
        question4?: string;
        question5?: string;
        question6?: string;
        question7?: string;
        question8?: string;
        question9?: string;
        question10?: string;
        question11?: string;
        question12?: string;
    },
    answers: number[],
    id: string
}


const QuestionProvider = ({ children }: { children: JSX.Element }) => {

    const [state, setState] = useState<IState>({
        actualQuestion: 1,
        activeFlags: [],
        answers: [],
        language: "en",
        isFinishExam: false,
        galleryExam: [],
    })

    const [examsList, setExams] = useState<IExam[]>([])

    return (
        <QuestionContext.Provider
            value={{
                state,
                setState,
                examsList,
                setExams
            }}
        >
            {children}
        </QuestionContext.Provider>
    );
};

export default QuestionProvider;