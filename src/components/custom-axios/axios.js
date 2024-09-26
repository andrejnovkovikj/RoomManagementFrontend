import axios from "axios";

const instance = axios.create({

    baseURL : "https://roommanagement-d503.onrender.com",
    headers : {
        'Access-Control-Allow-Origin' : '*',
    }
})
export default instance;