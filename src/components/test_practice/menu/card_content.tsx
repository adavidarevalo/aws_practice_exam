import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Icon, Image } from 'semantic-ui-react'

export default function CardContent() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/practice-exam/${1}`)
    }

    return (
        <Card>
            <Image src='https://1.bp.blogspot.com/-8EL2uKz9WEw/X7yBJbpRmDI/AAAAAAAAkiw/kNcgkYoi20Q3Zl7CLUXu1E7TzXBqNlC8gCLcBGAsYHQ/w1200-h630-p-k-no-nu/AWS%2BDeveloper%2BAssociate%2BFree%2BCourses.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>Test 1</Card.Header>
                <Card.Description>
                    Desarrollar Asociado
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='star' />
                    1 Favorite
                </a>
                <Button
                    basic
                    color='blue'
                    floated="right"
                    icon
                    labelPosition='right'
                    onClick={handleClick}
                >
                    Comenzar
                    <Icon name='send' />
                </Button>
            </Card.Content>
        </Card>
    )
}
