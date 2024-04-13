import BaseService from "./baseService";
type ApiServiceType={
    method:string,
    url: string,
    data?:object
}

const ApiService = {
    fetchData(param:ApiServiceType) {
        return new Promise((resolve, reject) => {
            BaseService(param)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        })
    }
}

export default ApiService