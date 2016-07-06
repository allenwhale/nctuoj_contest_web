import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';

const Language = {
    getLanguageList: (data) => fetch(`${Config.baseUrl}/api/languages/?${qs.stringify(data)}`).then(Config.checkStatus),
};

export default Language;
