import axios from "axios";

const imageUpload = axios.create({
    baseURL: 'https://api.cloudinary.com/v1_1/dynluxnwa'
})

export default imageUpload