import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';

const Contest = {
    getContest: (data) => fetch(`${Config.baseUrl}/api/contest/?${qs.stringify(data)}`).then(Config.checkStatus),

    putContest: (data) => fetch(`${Config.baseUrl}/api/contest/`, {
        method: 'PUT',
        body: data,
    }).then(Config.checkStatus),
};

export default Contest;
