import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';

const Submission = {
    
    getSubmissionList: (data) => fetch(`${Config.baseUrl}/api/submissions/?${qs.stringify(data)}`, {
        method: 'GET',
    }).then(Config.checkStatus),

    postSubmission: (data) => fetch(`${Config.baseUrl}/api/submissions/`, {
        method: 'POST',
        body: data,
    }).then(Config.checkStatus),

};

export default Submission;
