import rp from 'request-promise';

const Submission = {

    getSubmissions: () => rp({
        url: 'http://140.113.89.233:9000/submissions.json?' + (new Date()).toString(),
        method: 'get',
        withCredentials: false
    })
    .then((res) => (JSON.parse(res))),

};

export default Submission;
