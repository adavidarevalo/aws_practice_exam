import { useMemo } from 'react'
import { Button, Card, Icon, Popup, Image } from 'semantic-ui-react'
import { toggleStore } from '../utils/store'

export default function CardTechnology({ technology, getFavorites, favoriteDocs }: any) {
  const { name, image, url, id } = technology

  const type = 'documentation'

  const handleClickStore = () => {
    toggleStore(type, id, 'favoriteDocumentation')
    getFavorites()
  }

  const isFavoriteDoc = useMemo(() => {
    const result = favoriteDocs.find((doc: any) => doc.type === type && doc.id === id)
    return !!result
  }, [favoriteDocs])

  return (
    <Card style={{ marginInline: "10px" }}>
      <Image
        src={`https://digitalcloud.training/wp-content/uploads/2022/${image}`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <a href={`https://digitalcloud.training${url}`} target="_blank">
          <Icon name='paper plane' />
          Visitar
        </a>
        <Popup content='Add to favorite' trigger={
          <Icon
            onClick={handleClickStore}
            color={isFavoriteDoc ? "yellow" : "grey"}
            name='star' />
        } />
      </Card.Content>
    </Card>
  )
}
