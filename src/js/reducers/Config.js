const Config = {
    mapArrayToObject: (array, indexName="id") => {
        var res = {};
        array.map((x) => {
            res[x[indexName]] = x;
        });
        return res;
    },
};

export default Config;
