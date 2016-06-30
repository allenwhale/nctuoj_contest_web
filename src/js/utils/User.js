import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';
const Users = {

    getUserList: (data) => fetch(`${Config.baseUrl}/api/users/?${qs.stringify(data)}`, {
        method: 'GET',
    }).then(Config.checkStatus),

    signIn: (data) => fetch(`${Config.baseUrl}/api/users/signin/`, {
        method: 'POST',
        body: data,
    }).then(Config.checkStatus),

};

export default Users; 
