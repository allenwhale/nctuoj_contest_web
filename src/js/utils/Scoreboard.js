import fetch from 'isomorphic-fetch';
import qs from 'qs';
import Config from './Config';

const Scoreboard = {
    getScoreboard: (data) => fetch(`${Config.baseUrl}/api/scoreboard/?${qs.stringify(data)}`).then(Config.checkStatus),
};

export default Scoreboard;
