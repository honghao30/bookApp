import axios from 'axios'

const createInstance = (url: string, apiKey: string | null) => {
    return axios.create({
        baseURL: url,
        params: {
            api_key: apiKey,
            language: "ko-KR"
        },
    });
}

export default createInstance
