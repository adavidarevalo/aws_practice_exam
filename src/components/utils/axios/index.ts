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


class MainApi extends HttpClient {
    public constructor() {
        super('http://localhost:4000/api');
    }

    public getForm = (fromType: TFormType, formId: string) => this.instance.get<IQuestionsLists>(`/form/${fromType}/${formId}`);

    public validateExam = (value: any) => this.instance.post<IResultValidateExam>(`/form/validate`, value);
}

export default new MainApi()