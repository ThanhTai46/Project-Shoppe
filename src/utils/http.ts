import axios, { AxiosInstance } from 'axios'

class Http {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: "https://api-ecom.duthanhduoc.com/",
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 10000,
        })
    }
}

const http = new Http().instance

export default http;

