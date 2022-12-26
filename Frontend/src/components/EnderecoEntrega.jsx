import { Typography } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { PinkLink } from "../styles/components/EnderecoEntrega";

export function EnderecoEntrega({ rua, bairro, numero, cidade, retirada = false, complemento }) {
    return (
        <div>
            <div style={{ padding: '12px 20px', backgroundColor: '#ffebf8', borderRadius: 5, border: '2px solid', borderColor: '#FFF', }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <PlaceIcon sx={{ color: '#FF6AB9', marginRight: 1 }} />
                        <Typography>{rua} n° {numero}
                            {complemento && `, ${complemento}`}
                            {` - ${bairro}`}</Typography>
                    </div>
                    {retirada ?
                        <div>
                            <PinkLink href="https://goo.gl/maps/9nYnFzTwRBouHnDq6" target="_blank" rel="noopener noreferrer">
                                <Typography variant="subtitle2">
                                    Ver no mapa <ArrowOutwardIcon fontSize="small" />
                                </Typography>
                            </PinkLink>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}