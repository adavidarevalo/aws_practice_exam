import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

export default function Loading() {
    return (
        <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
        </Dimmer>
    )
}