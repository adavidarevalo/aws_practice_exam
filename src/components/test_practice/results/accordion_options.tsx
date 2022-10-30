import { Icon, Label } from 'semantic-ui-react'
import ChangeLanguageButton from '../../change_language_button'
import style from './result.module.sass'
import { IProps } from './chart';

export default function AccordionOptions({ answerValidated }: IProps) {
  const { answerCorrect, answerIncorrect, answerOmitted } = answerValidated
  return (
    <div
      className={style.option}
    >
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
