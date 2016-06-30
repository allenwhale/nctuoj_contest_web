import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';

const Clarification = {
    getClarificationList: (data) => fetch(`${Config.baseUrl}/api/clarifications/?${qs.stringify(data)}`, {
        method: 'GET',
    }).then(Config.checkStatus),

    getClarification: (data) => fetch(`${Config.baseUrl}/api/clarifications/${data.id}/?${qs.stringify(data)}`, {
        method: 'GET',
    }).then(Config.checkStatus),

    postClarification: (data) => fetch(`${Config.baseUrl}/api/clarifications/`, {
        method: 'POST',
        body: data,
    }).then(Config.checkStatus),

    putClarification: (data) => fetch(`${Config.baseUrl}/api/clarifications/${data.get('id')}/`, {
        method: 'PUT',
        body: data,
    }).then(Config.checkStatus),
};

export default Clarification;
