var nano = require('nano'),
    request = require('browser-request'),
    parse = require('url').parse;

module.exports = self.nano = function (cfg) {
    var url;

    if (typeof cfg === 'string') {
        cfg = {url: cfg};
    }
    url = parse(cfg.url);
    if (url.auth) {
        cfg.auth = {
            username: url.auth.split(':')[0],
            password: url.auth.split(':')[1]
        };
    }
    cfg.url = [url.protocol, '//', url.host].join('');

    cfg.request = function (req, callback) {
        if (cfg.cors) {
            req.withCredentials = true;
        }
        if (cfg.auth) {
            req.authorization = true;
            req.auth = cfg.auth;
        }
        request(req, callback || function () {}); // browser-request throws error on undefined callback
    };
    return nano(cfg);
};
