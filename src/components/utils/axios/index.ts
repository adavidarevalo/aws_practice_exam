import { IQuestionsLists } from '../../context/question';
import { HttpClient } from './http_client';

export type TFormType = "developer_associate"

export interface IAnswer {
    isCorrectAnswer: boolean;
    questionId: string;
    solutionId: string[];
}

export interface IResultValidateExam {
    answerCorrect: number;
    answerIncorrect: number;
    answerOmitted: number;
    answerValidated: IAnswer[];
    passExam: boolean;
    score: number;
}

export interface IGallery {
    id: string;
    type: string;
    image: string
}

interface IValidatePayload {
    formId: string;
    type: TFormType;
    answers: {
        questionId: string;
        solutionId: string[];
    }[]
}

class MainApi extends HttpClient {
    public constructor() {
        super('http://localhost:4000/api');
    }

    public getForm = (fromType: TFormType, formId: string) => this.instance.get<IQuestionsLists>(`/form/${fromType}/${formId}`);

    public validateExam = (value: IValidatePayload) => this.instance.post<IResultValidateExam>(`/form/validate`, value);
    public getGallery = () => this.instance.get<IGallery[]>(`/gallery`);
}

export default new MainApi()