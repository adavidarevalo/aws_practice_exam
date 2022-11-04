import _ from 'lodash'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { IGallery } from '../../utils/axios'
import { toggleStore } from '../../utils/store'
import { RootObject } from './gallery'
import ShowRecords from './show_records'

export interface IProps {
    exam: IGallery,
    favoritesExams: {
        id: string,
        type: string
    }[],
    getFavorites: () => void
    record: RootObject[]
}

export default function CardContent({ exam, favoritesExams, record, getFavorites }: IProps) {
    const { type, id, image } = exam

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/practice-exam/${type}/${id}`)
    }

    const handleStoreClick = () => {
        toggleStore(type, id, 'favoritesExams')
        getFavorites()
    }

    const isFavoriteExam = useMemo(() => {
        const result = favoritesExams.find(exam => exam.type === type && exam.id === id)
        return !!result
    }, [favoritesExams])

    return (
        <Card>
            <Image src={image} wrapped ui={false} />
            <Card.Content>
                <Card.Header>Test {id}</Card.Header>
                <Card.Description
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    {_.startCase(type.replace('_', ' '))}
                    {record.length > 0 && <ShowRecords record={record} />}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a
                    style={{ color: isFavoriteExam ? "#0041ab" : "grey" }}
                    onClick={handleStoreClick}>
                    <Icon name='star' color={isFavoriteExam ? "yellow" : "grey"} />
                    Favorite
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
