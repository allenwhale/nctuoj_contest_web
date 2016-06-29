import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';

const Testdata = {

    postTestdata: (data) => fetch(`${Config.baseUrl}/api/problems/${data.get('problem_id')}/testdata/`, {
        method: 'POST',
        body: data,
    }).then(Config.checkStatus),
};

export default Testdata;
