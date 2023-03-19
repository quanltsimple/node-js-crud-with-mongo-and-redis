const Connector = require('./redisConnector');

const redis = {
    _client: Connector.Redis(),

    _key_generator: function (data) {
        const keys = Object.keys(data);
        return keys[0] + ':' + data[keys[0]];
    },

    add_set: function (dset, callback) {
        const key = this._key_generator(dset.key);
        this._client.hmset(key, dset.data, function (err, data) {
            if (err) return callback(err);
            else {
                return callback(true);
            }
        });
    },

    get_set: function (key, field, callback) {
        const keygen = this._key_generator(key);
        this._client.hgetall(keygen, function (err, data) {
            if (err) return false;
            else {
                if (field) {
                    data = data.field;
                }
                return callback(data);
            }
        });
    },

    delete_set: function (key, callback) {
        this._client.del(this._key_generator(key), function (err, reply) {
            if (err) return false;
            else
                return callback(reply);
        });
    }
};

module.exports = redis;