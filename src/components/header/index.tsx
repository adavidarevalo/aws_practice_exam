import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, DropdownProps, Icon, Label, Menu, MenuItemProps } from 'semantic-ui-react'
import { QuestionContext } from '../context/question'

type nav = "Home" | "Documentation" | "Exam"

export default function Header() {
    const [navSelected, setNavSelected] = useState<nav>("Home")
    const menuItems: nav[] = ["Home", "Documentation", "Exam"]

    useEffect(() => {
        const queryString = window.location.pathname;
        menuItems.forEach(item => {
            if (queryString.includes(routerNav[item])) {
                setNavSelected(item)
            }
        })
    }, [])

    const navigate = useNavigate()

    const handleChange = (_: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { name }: MenuItemProps) => {
        setNavSelected(name as nav)
        navigate(`/${routerNav[name as nav]}`)
    }

    const routerNav = {
        Home: "",
        Documentation: "documentation",
        Exam: "practice-exam"
    }

    const {
        questionLists,
        state,
        setState
    } = useContext(QuestionContext)

    const handleChangeQuestion = (
        _: React.SyntheticEvent<HTMLElement, Event>,
        { value }: DropdownProps) => {
        setState(prevState => ({
            ...prevState,
            actualQuestion: Number(value)
        }))

    }

    return (
        <Menu compact style={{ width: "100vw" }}>
            {menuItems.map(item => (
                <Menu.Item
                    name={item}
                    active={navSelected === item}
                    onClick={handleChange}
                    key={item}
                >
                    {item}
                </Menu.Item>
            ))}
            {(questionLists !== null) && (
                <Menu.Item position='right'>
                    <Dropdown
                        button
                        floating
                        disabled={state.isFinishExam}
                        onChange={handleChangeQuestion}
                        options={questionLists.questions.map(option => {
                            return ({
                                text: <p>Pregunta {option.id} {state.activeFlags.includes(Number(option.id)) ? <Icon name='flag' color="yellow" /> : <Label>Omitido</Label>}</p>,
                                value: option.id,
                                key: option.id
                            })
                        })}
                        direction="left"
                        text={`Preguntas (${questionLists.questions.length})`}
                    />
                </Menu.Item>
            )}
        </Menu>
    )
}
