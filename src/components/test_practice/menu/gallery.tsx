import React from 'react'
import { Grid } from 'semantic-ui-react'
import CardContent from './card_content'

export default function Gallery() {
    return (
        <Grid columns={3}>
            <Grid.Row>
                <Grid.Column>
                    <CardContent />
                </Grid.Column>
                <Grid.Column>
                    <CardContent />
                </Grid.Column>
                <Grid.Column>
                    <CardContent />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <CardContent />
                </Grid.Column>
                <Grid.Column>
                    <CardContent />
                </Grid.Column>
                <Grid.Column>
                    <CardContent />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
