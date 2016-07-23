
const Config = {
    baseUrl: 'http://127.0.0.1:3019',
    checkStatus: (res) => {
        if (res.status >= 200 && res.status < 300) {
            return res.json();
        } else {
            return Promise.reject(res.json());
        }
    },
}

export default Config;
