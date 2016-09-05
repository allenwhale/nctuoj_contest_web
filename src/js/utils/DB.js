import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';

const DB = {
    deleteTable: (data) => fetch(`${Config.baseUrl}/api/db/${data.name}/?${qs.stringify(data)}`, {
        method: 'delete',
        body: data,
    }).then(Config.checkStatus),
};

export default DB;
