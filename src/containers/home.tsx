import React from 'react'
import { Image } from 'semantic-ui-react'
import awsLogo from './../assets/aws_logo.png'
import { Helmet } from "react-helmet";
import HelmetMetaData from '../components/helmet_meta_data';

export default function Home() {

    return (
        <div style={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"

        }}>
            <HelmetMetaData title="AWS Certification" />
            <Image src={awsLogo} size='big' />
            <h1
                style={{ marginTop: "50px" }}
            >Exam Practice 🚀</h1>
        </div>
    )
}
