import axios from "axios";

// axios.defaults.baseURL = 'http://localhost:8000/api/';

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;

        try {

            const response = await axios.post(`${process.env.REACT_APP_DJANGO_URL}/token/refresh/`, {
                refresh: localStorage.getItem('refresh_token')
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }, { withCredentials: true });

            if (response.status === 200) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);

                return axios(error.config);
            }

        } catch (error) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }

    }

    refresh = false;
    return error;

});