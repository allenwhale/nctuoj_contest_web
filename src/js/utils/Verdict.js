import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';

const Verdict = {
    getVerdictList: (data) => fetch(`${Config.baseUrl}/api/verdicts/?${qs.stringify(data)}`).then(Config.checkStatus),
};

export default Verdict;
