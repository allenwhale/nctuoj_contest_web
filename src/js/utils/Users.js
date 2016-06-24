import rp from 'request-promise';
const usersBaseUrl = 'http://140.113.89.233:3019/api/users';
const Users = {
    signIn: (data) => rp({
        url: `${usersBaseUrl}/signin/`,
        method: 'POST',
        form: data,
        withCredentials: false,
    })
    .then((res) => {
        return JSON.parse(res);
    })
};

export default Users; 
