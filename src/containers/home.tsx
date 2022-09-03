import React from 'react'
import { Image } from 'semantic-ui-react'
import awsLogo from './../assets/aws_logo.png'

export default function Home() {
    return (
        <div style={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"

        }}>
            <Image src={awsLogo} size='big' />
            <h1
                style={{ marginTop: "20px" }}
            >Exam Practice 🚀</h1>
        </div>
    )
}
