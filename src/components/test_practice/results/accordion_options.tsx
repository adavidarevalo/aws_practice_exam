import React from 'react'
import { Icon, Label } from 'semantic-ui-react'
import ChangeLanguageButton from '../../change_language_button'
import { IResultValidateExam } from '../../utils/axios'

export interface IProps {
  answerValidated: IResultValidateExam
}

export default function AccordionOptions({ answerValidated }: IProps) {
  const { answerCorrect, answerIncorrect, answerOmitted } = answerValidated
  return (
    <div>
      <ChangeLanguageButton />
      <div>
        <Label>
          <Icon name='check circle' color='green' /> ({answerCorrect}) Correct
        </Label>
        <Label>
          <Icon name='circle' color='red' /> ({answerIncorrect}) Incorrect
        </Label>
        <Label>
          <Icon name='minus circle' color='grey' /> ({answerOmitted}) Omitted
        </Label>
      </div>
    </div>
  )
}
