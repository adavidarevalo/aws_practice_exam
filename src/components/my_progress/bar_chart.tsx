import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';
import { getStore } from '../utils/store';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart() {
    const progress = getStore('myProgress')
    const labels: string[] = [];
    const answers: { [key: string]: number[] } = {
        correctAnswer: [],
        incorrectAnswer: [],
        omittedAnswer: [],
    }

    if (!!progress === false) {
        return <h3>There are not data yet.</h3>
    }

    progress.forEach((data: any, index: number) => {
        const { type, set, answerValidated } = data

        const title = _.startCase(`${type.replaceAll("_", " ")} Set ${set} - N ${index}`)
        labels.push(title)
        answers.correctAnswer.push(answerValidated.answerCorrect)
        answers.incorrectAnswer.push(answerValidated.answerIncorrect)
        answers.omittedAnswer.push(answerValidated.answerOmitted)
    });

    const data = {
        labels,
        datasets: [
            {
                label: 'Correct',
                data: answers.correctAnswer,
                backgroundColor: '#65ee65'
            },
            {
                label: 'Incorrect',
                data: answers.incorrectAnswer,
                backgroundColor: '#ff7070',
            },
            {
                label: 'Omitted',
                data: answers.omittedAnswer,
                backgroundColor: '#bababa',
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y
                        }
                        return label;
                    },
                    footerSpacing: 2,
                    footer: (context: any) => {
                        const label = context[0].label.toLowerCase().split(' n ')
                        const data = progress[label[1]]
                        return "Date: " + new Date(data.date).toLocaleDateString("en-US")
                    },
                    afterFooter: (context: any) => {
                        const label = context[0].label.toLowerCase().split(' n ')
                        const data = progress[label[1]]
                        return data.passExam ? "Passed" : "Reprobate"
                    }
                }
            },
            title: {
                display: true,
                text: 'My Progress',
                size: 20
            },
        },
    };


    return (
        <div
            style={{
                height: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div
                style={{
                    width: "80%"
                }}
            >
                <Bar
                    options={options}
                    data={data}
                />
            </div>
        </div>
    );
}

export default BarChart
