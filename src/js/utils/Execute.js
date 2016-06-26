import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';

const Execute = {

    getExecuteList: (data) => fetch(`${Config.baseUrl}/api/executes/?${qs.stringify(data)}`, {
        method: 'GET',
    }).then(Config.checkStatus),

    deleteExecute: (data) => fetch(`${Config.baseUrl}/api/executes/${data.get('id')}/`, {
        method: 'DELETE',
        body: data,
    }).then(Config.checkStatus),

};

export default Execute;
