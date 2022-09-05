import HelmetMetaData from '../../helmet_meta_data'
import Gallery from './gallery'

export default function TestPracticeMenu() {
    return (
        <div style={{ width: "80%", margin: "40px auto" }}>
            <HelmetMetaData title="AWS Gallery Exam" />
            <h1 style={{ textAlign: "center", marginBottom: "50px" }}>Pruebas de Practicas</h1>
            <Gallery />
        </div>
    )
}
