import axiosRetry from 'axios-retry';
import axios from 'axios';

let a = axios.create({
    timeout: 1000 * 15,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
});
axiosRetry(a, {
    retries: 2,
    retryCondition: (error) => {
        return (error.config.method === 'get' || error.config.method === 'post')
    }
}) 
let Fetch = a;

export default Fetch;