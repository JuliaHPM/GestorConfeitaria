import Image from 'next/image';
import { ImageContainer } from '../styles/components/ImageTable';
import noImage from '../img/noImage.png'
import Avatar from '@mui/material/Avatar';
import { pink } from '@mui/material/colors';

export function ImageTable({ src, alt }) {
    return (
        <ImageContainer>
            {/* <Image
                // width={45}
                // height={70}
                src={src ? src : noImage}
                alt={alt} 
                fill
                style={{ objectFit: 'contain' }}/> */}
            {src ?
                <Avatar alt={alt} src={src} />
                :
                <Avatar {...stringAvatar(alt)} />
            }
        </ImageContainer>

    )
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: pink[200],
        },
        children: `${name.split(' ')[0][0]}`,//${name.split(' ')[1][0]}
    };
}