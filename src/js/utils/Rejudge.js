import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';

const Rejudge = {
    RejudgeProblem: (data) => fetch(`${Config.baseUrl}/api/problems/${data.get('id')}/rejudge/`, {
        method: 'POST',
        body: data,
    }).then(Config.checkStatus),

    RejudgeSubmission: (data) => fetch(`${Config.baseUrl}/api/submissions/${data.get('id')}/rejudge/`, {
        method: 'POST',
        body: data,
    }).then(Config.checkStatus),

};

export default Rejudge;

