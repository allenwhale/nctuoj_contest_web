import rp from 'request-promise';

const Problem = {
    getProblemList: () => rp({
        url: 'http://140.113.89.233:9000/problems.json?' + (new Date()).toISOString(),
        method: 'get',
        withCredentials: false,
    })
    .then((res) => {
        console.log('util', JSON.parse(res));
        return JSON.parse(res);
    }),

    getProblem: (data) => rp({
        url: `http://140.113.89.233:9000/problem${data.id}.json?` + (new Date()).toISOString(),
        method: 'get',
        withCredentials: false,
    })
    .then((res) => (JSON.parse(res)))
};

export default Problem;
