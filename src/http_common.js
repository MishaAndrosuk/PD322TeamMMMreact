import axios from "axios";
import { APP_ENV } from "./env";

const http = axios.create({    
    baseURL: APP_ENV.REMOTE_API_HOST_NAME,
    headers: {
        "Content-Type": "application/json"
    }
});

export default http;