import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';
const Users = {

    getUserMe: (data) => fetch(`${Config.baseUrl}/api/users/me/?${qs.stringify(data)}`).then(Config.checkStatus),

    getUser: (data) => fetch(`${Config.baseUrl}/api/users/${data.id}/?${qs.stringify(data)}`).then(Config.checkStatus),

    postUser: (data) => fetch(`${Config.baseUrl}/api/users/`, {
        method: 'POST',
        body: data,
    }).then(Config.checkStatus),

    deleteUser: (data) => fetch(`${Config.baseUrl}/api/users/${data.get('id')}/`, {
        method: 'DELETE',
        body: data,
    }).then(Config.checkStatus),

    postUserCsv: (data) => fetch(`${Config.baseUrl}/api/users/csv/`, {
        method: 'POST',
        body: data,
    }).then(Config.checkStatus),

    putUser: (data) => fetch(`${Config.baseUrl}/api/users/${data.get('id')}/`, {
        method: 'PUT',
        body: data,
    }).then(Config.checkStatus),

    getUserList: (data) => fetch(`${Config.baseUrl}/api/users/?${qs.stringify(data)}`).then(Config.checkStatus),

    signIn: (data) => fetch(`${Config.baseUrl}/api/users/signin/`, {
        method: 'POST',
        body: data,
    }).then(Config.checkStatus),

};

export default Users; 
