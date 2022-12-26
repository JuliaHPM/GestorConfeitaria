import { Avatar } from "@mui/material"
import { ImageContainer } from "../styles/components/ItensPedido";

export function ItensPedido({ itens }) {
    let left = 0;
    if (itens.length > 3) {
        left = itens.length - 3;
    }

    return (
        <>
            {itens.map((item, index) => {
                if (index < 3) {
                    return (
                        <ImageContainer key={item.id}>
                            <Avatar
                                sx={{
                                    width: 48,
                                    height: 48,
                                    //boxShadow: '-6px 0px 11px rgba(17, 17, 17, 0.7)'
                                }}
                                src={item.doce.imagemDoce}
                            />
                        </ImageContainer>
                    )
                }

            })}
            {
                left > 0 &&
                <ImageContainer>
                    <Avatar sx={{
                        width: 48,
                        height: 48,
                    }}>
                        +{left}
                    </Avatar>
                </ImageContainer>
            }

        </>
    )
}