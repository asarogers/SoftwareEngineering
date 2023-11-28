import axios from "axios";


export default axios.create({
    //baseURL: process.env.REACT_APP_LOCAL //"build": "env-cmd -f .env.staging react-scripts build",
    baseURL: process.env.REACT_APP_PRODUCTION //"build": "react-scripts build",
})