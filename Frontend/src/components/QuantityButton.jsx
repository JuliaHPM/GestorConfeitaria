import { ButtonQuantity, Container, Value } from "../styles/components/QuantityButton"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";

export function QuantityButton({ id, quantidade, handleChange, disabled }) {

    // const [quantidade, setQuantidade] = useState(1);

    return (
        <Container >
            <ButtonQuantity
                type="button"
                onClick={() => { if (quantidade > 1 && !disabled) handleChange(id, quantidade - 1) }}
                disabled={(quantidade > 1 ? false : true)}
            >
                <RemoveIcon sx={{ fontSize: '1rem' }} />
            </ButtonQuantity>
            <Value type='number' min={0} >{quantidade}</Value>
            <ButtonQuantity
                type="button"
                onClick={() => { if (!disabled) handleChange(id, quantidade + 1) }}
            // disabled={disabled}
            >
                <AddIcon sx={{ fontSize: '1rem' }} />
            </ButtonQuantity>
        </Container>
    )
}