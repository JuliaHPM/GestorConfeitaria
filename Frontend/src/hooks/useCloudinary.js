import axios from "axios";
import sha256 from 'crypto-js/sha256';

export function useCloudinary() {
    return async function uploadImage(imagem) {
        const formData = new FormData();
        formData.append('file', imagem);
        formData.append('upload_preset', 'gestorConfeitaria');

        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }

        const data = axios.post('https://api.cloudinary.com/v1_1/dd9oavdpw/image/upload', formData, config)

        return data;
    }

}

// export async function deleteImage(imagemId) {
//     // const apiSecret = '6sFVHFFalLH47W6VCi6VFnMnhKE';
//     // const dataAtual = new Date();
//     // const signature = sha256(`public_id=${imagemId}&timestamp=${Math.floor(dataAtual.getTime() / 1000)}`);
//     // public_id=w1jwazrcajefisprwhmh&timestamp=1667945470882'

//     // const signature = ;

//     const formData = new FormData();
//     formData.append('public_id', imagemId);
//     formData.append('api_key', '617249872967462');
//     formData.append('upload_preset', 'gestorConfeitaria');
//     formData.append('signature', signature);
//     formData.append('timestamp', Date.now());

//     const config = {
//         headers:{
//             'Content-Type': 'multipart/form-data'
//         }
//     }

//     // invalidate=true&public_id=sample_image&timestamp=$TIME&signature=$SIGNATURE&api_key=$CLD_API_KEY

//     // POST https://api.cloudinary.com/v1_1/$CLD_NAME/image/destroy --data "invalidate=true&public_id=sample_image&timestamp=$TIME&signature=$SIGNATURE&api_key=$CLD_API_KEY"

//     const data = axios.post('https://api.cloudinary.com/v1_1/dd9oavdpw/image/destroy', formData, config)

//     return data;
// }




        // const data = await fetch('https://api.cloudinary.com/v1_1/dd9oavdpw/image/upload', {
        //     method: 'POST',
        //     body: formData
        // } ) //dd9oavdpw= cloud name

        // console.log(data)