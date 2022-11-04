import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'
import { RootObject } from './gallery'
import style from './show_records.module.scss'

export default function ShowRecords({ record }: { record: RootObject[] }) {
    return (
        <Popup
            content={
                <div>
                    {record.map(r => (
                        <div className={style.show_records_container}>
                            <h4>Date: <span>{new Date(r.date).toLocaleDateString("en-US")}</span></h4>
                            {r.passExam
                                ? <p style={{ color: "green", textAlign: "center" }}>Passed</p>
                                : <p style={{ color: "red", textAlign: "center" }}>Reprobate</p>
                            }
                            <h5>Answers:</h5>
                            <p>Correct: <span>{r.answerValidated.answerCorrect}</span></p>
                            <p>Incorrect: <span>{r.answerValidated.answerIncorrect}</span></p>
                            <p>Omitted: <span>{r.answerValidated.answerOmitted}</span></p>
                            <hr />
                        </div>
                    ))}
                </div>
            }
            trigger={<Icon inverted color='grey' name='info circle' />}
        />
    )
}
