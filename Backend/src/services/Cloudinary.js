const cloudinary = require('cloudinary');
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

module.exports = {
    async deleteImage(linkImage) {
        return await cloudinary.v2.uploader.destroy(linkImage.substring(62).slice(0, -4));
    }
}
