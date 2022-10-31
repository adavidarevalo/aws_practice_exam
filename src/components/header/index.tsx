import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, DropdownProps, Icon, Label, Menu, MenuItemProps } from 'semantic-ui-react'
import { QuestionContext } from '../context/question'
import style from './header.module.scss'
import { Legend } from 'chart.js';

type nav = "Home" | "Exam"

export default function Header() {
    const [navSelected, setNavSelected] = useState<nav>("Home")
    const menuItems: nav[] = ["Home", "Exam"]

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
        examsList,
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
            {(examsList.length > 0) && (
                <Menu.Item position='right'
                    className={style.dropdown_container}
                >
                    <Dropdown
                        button
                        floating
                        disabled={state.isFinishExam}
                        onChange={handleChangeQuestion}
                        options={examsList.map((question) => {
                            const isResolved = state.answers.find(({ questionId }) => questionId === question.id.toString())
                            return ({
                                text: <p>Pregunta {question.id} {
                                    state.activeFlags.includes(Number(question.id))
                                        ? <Icon name='flag' color="yellow" />
                                        : !!isResolved === false && <Label>Omitido</Label>
                                }
                                </p>,
                                value: question.id,
                                key: question.id
                            })
                        })}
                        direction="left"
                        text={`Preguntas (${examsList.length})`}
                    // style={{
                    //     maxHeight: "80vh",
                    //     overflowX: "auto"
                    // }}
                    />
                </Menu.Item>
            )}
        </Menu>
    )
}
