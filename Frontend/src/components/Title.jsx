import { Container, TitleFont } from "../styles/components/Title";

export function Title({ title }) {
    return (
        <Container>
            <TitleFont>
                {title}
            </TitleFont>
        </Container>
    )
}