import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';

const System = {
    getTime: (data) => fetch(`${Config.baseUrl}/api/system/time/?${qs.stringify(data)}`).then(Config.checkStatus),
};

export default System;
