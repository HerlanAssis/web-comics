
import axios from 'axios';
import { URLS } from '../constants';

const ComicsServer = axios.create({
    baseURL: URLS.BASE_URL,
    headers: {
        "content-type": "application/json",
    }
});


export default ComicsServer;