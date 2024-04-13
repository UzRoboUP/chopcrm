import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_URL;

const BaseService  =axios.create({
    timeout:5000 ,
    baseURL: apiUrl
})

BaseService.interceptors.request.use(
    (config) => {
        const tokin = "";
        if (tokin !== "") {
            config.headers.Authorization = `Bearer ` + tokin;
        }

        return config;
    },
    (error) => Promise.reject(error)
)

BaseService.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
)

export default BaseService;