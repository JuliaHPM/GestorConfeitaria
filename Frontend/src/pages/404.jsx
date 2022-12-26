import Image from "next/future/image"

import img404 from "../img/404Error.svg"
import { Container } from "../styles/pages/404"

export default function Custom404() {
    return (
        <Container >
            <div>
                <h3 className="fontTitle mb-4">Página não encontrada</h3>
                <Image src={img404} alt='error' width={400} />
            </div>
        </Container>
    )
}