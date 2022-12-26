// const cloudinary = require('cloudinary');
const { deleteImage } = require('../services/Cloudinary');

// cloudinary.config({
//     cloud_name: 'dd9oavdpw',
//     api_key: '617249872967462',
//     api_secret: '6sFVHFFalLH47W6VCi6VFnMnhKE'
// })

module.exports = {
    async delete(req, res) {
        const { public_id } = req.body;
        // console.log(public_id)

        deleteImage(public_id)
            .then(result => {
                // console.log(result);
                return res.send(result)
            })
            .catch(err => {
                console.log(err)
                return res.send(err)
            });
    },

    // async uploadImage(image) {
    //     await cloudinary.v2.uploader
    //         .upload(image,
    //             {
    //                 folder: "gestorConfeitaria",
    //             })
    //         // .then(result => {
    //         //     return result
    //         // })
    //         // .catch(err => {
    //         //     console.log(err)
    //         //     return res.send(err)
    //         // });
    // }
}