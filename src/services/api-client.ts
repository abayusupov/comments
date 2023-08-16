import axios from "axios";

export const getKey = () => {
    const key = window.localStorage.getItem('kalit');
    if (key!==null) {
        return 'JWT ' + JSON.parse(key);
    }
    else {
        return '';
    }
}

export default axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Authorization: (getKey())
    }
})