const Config = {
    mapArrayToObject: (array, indexName) => {
        var res = {};
        array.map((x) => {
            res[x[indexName]] = x;
        });
        return res;
    },
};

export default Config;
