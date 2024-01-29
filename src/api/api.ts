import axios from 'axios'

const fetchData = async (endpoint: string | number) => {
    const url = process.env.REACT_APP_API_URL! + endpoint;
    const response = await axios.get(url);
    return response.data;
};

export default fetchData;