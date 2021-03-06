import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';

const Problem = {

    getProblemList: (data) => fetch(`${Config.baseUrl}/api/problems/?${qs.stringify(data)}`).then(Config.checkStatus),

    getProblem: (data) => fetch(`${Config.baseUrl}/api/problems/${data.id}/?${qs.stringify(data)}`).then(Config.checkStatus),

    putProblem: (data) => fetch(`${Config.baseUrl}/api/problems/${data.get('id')}/`, {
        method: 'PUT',
        body: data,
    }).then(Config.checkStatus),

    putProblemMeta: (data) => fetch(`${Config.baseUrl}/api/problems/${data.get('id')}/meta/`, {
        method: 'PUT',
        body: data,
    }).then(Config.checkStatus),

    postProblem: (data) => fetch(`${Config.baseUrl}/api/problems/`, {
        method: 'POST',
        body: data,
    }).then(Config.checkStatus),

    postProblemMeta: (data) => fetch(`${Config.baseUrl}/api/problems/meta/`, {
        method: 'POST',
        body: data,
    }).then(Config.checkStatus),

    putProblemExecute: (data) => fetch(`${Config.baseUrl}/api/problems/${data.get('id')}/executes/`,{
        method: 'PUT',
        body: data,
    }).then(Config.checkStatus),

    putProblemVerdict: (data) => fetch(`${Config.baseUrl}/api/problems/${data.get('id')}/verdict/`, {
        method: 'PUT',
        body: data,
    }).then(Config.checkStatus),

};

export default Problem;
