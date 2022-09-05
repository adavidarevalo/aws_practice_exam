import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { IProps } from './accordion_options';
import style from './result.module.sass'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({ answerValidated }: IProps) {
    const { answerCorrect, answerIncorrect, answerOmitted } = answerValidated

    const data = {
        labels: [
            `${answerCorrect} Correct`,
            `${answerIncorrect} Incorrect`,
            `${answerOmitted} Omitted`,
        ],
        datasets: [
            {
                label: '# of Votes',
                data: [answerCorrect, answerIncorrect, answerOmitted],
                backgroundColor: [
                    '#ACD2CC',
                    '#E25E3F',
                    '#D1D7DC'
                ],
                borderColor: [
                    '#AFC6C3',
                    '#C7563C',
                    '#B7BBBF'
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <div
            className={style.chart}
        >
            <Pie data={data} width={50} height={50} />
        </div>
    )
}
