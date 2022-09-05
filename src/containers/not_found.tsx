import HelmetMetaData from '../components/helmet_meta_data'
import style from './not_found.module.sass'

export default function NotFound() {
    return (
        <div
            className={style.not_found_container}
        >
            <HelmetMetaData title="AWS Not Found" />
            <h1>Page Not Found</h1>
            <h3>404</h3>
        </div>
    )
}
