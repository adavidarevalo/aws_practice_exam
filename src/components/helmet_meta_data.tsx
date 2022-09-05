import { Helmet } from "react-helmet";

interface IProps {
    title: string
}

export default function HelmetMetaData({ title }: IProps) {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}
