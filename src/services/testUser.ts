import ApiService from "./apiService";

export const getUserApi = async (url:string) => {
    return await ApiService.fetchData({
        method: "get",
        url: url
    })
}

export const postUserApi = async (url:string, data:object) => {
    return await ApiService.fetchData({
        method: "post",
        url,
        data
    })
}


export const putUserApi = async (url:string, data:object) => {
    return await ApiService.fetchData({
        method: "post",
        url,
        data
    })
}