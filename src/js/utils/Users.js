import fetch from 'isomorphic-fetch';
import Config from './Config';
const Users = {

    signIn: (data) => fetch(`${Config.baseUrl}/api/users/signin/`, {
        method: 'POST',
        body: data,
    }).then(Config.checkStatus),

};

export default Users; 
