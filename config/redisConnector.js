const _config = require('./redisConfig');


const redisConnector = {
    _redis: null,

    /**
     * @return {null}
     */
    Redis: function () {
        if (redisConnector._redis == null) {
            const redis = require('redis');
            redisConnector._redis = redis.createClient(_config.redis.port, _config.redis.host);
            redisConnector._redis.select(_config.redis.db, function (err, resp) {
                //console.log(resp);
            });

            if (_config.redis.password != "") {
                redisConnector._redis.auth(_config.redis.password, function () {
                    console.log('Authenticated...');
                });
            }

            redisConnector._redis.on('error', function (err) {
                console.log('Error Connecting: ' + err);
            });
        }
        return redisConnector._redis;
    }
};


module.exports = redisConnector;