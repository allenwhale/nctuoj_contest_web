import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';

const Testdata = {

    getTestdataList: (data) => fetch(`${Config.baseUrl}/api/problems/${data.problem_id}/testdata/?${qs.stringify(data)}`, {
        method: 'GET',
    }).then(Config.checkStatus),

    postTestdata: (data) => fetch(`${Config.baseUrl}/api/problems/${data.get('problem_id')}/testdata/`, {
        method: 'POST',
        body: data,
    }).then(Config.checkStatus),

    putTestdata: (data) => fetch(`${Config.baseUrl}/api/problems/${data.get('problem_id')}/testdata/${data.get('id')}/`, {
        method: 'PUT',
        body: data,
    }).then(Config.checkStatus),

    deleteTestdata: (data) => fetch(`${Config.baseUrl}/api/problems/${data.get('problem_id')}/testdata/${data.get('id')}/`, {
        method: 'DELETE',
        body: data,
    }).then(Config.checkStatus),
};

export default Testdata;
