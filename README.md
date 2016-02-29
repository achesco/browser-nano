# browser-nano 6.1.4-alpha

Browser build of **[nano](https://github.com/dscape/nano)** driver for [CouchDB](http://couchdb.apache.org). Direct nano build with browserify lends `1MB+` file after minification, **broser-nano** offers `125KB` version (`77KB` for light).

### Installation

Available with npm and bower

`npm install browser-nano`

`bower install browser-nano`

### Versioning

`browser-nano`'s version corresponds to `nano`'s version (in alpha for the moment)

### Distribution (full vs light)

* `dist/browser-nano.full.js`
* `dist/browser-nano.full.min.js`
* `dist/browser-nano.light.js`
* `dist/browser-nano.light.min.js`

`light` doesn't support `follow` and `followUpdates` methods but offers 100KB of size decrease in return.

## API

Refer to [original documentation](https://github.com/dscape/nano#table-of-contents)

## Differences and Specificity

To include browser-nano to your web page add following tag:

`<script src="browser-nano.light.min.js"></script>`

that will populate global scope with `nano` variable

### Cross-Origin Resource Sharing (CORS)

Unlike NodeJs nano version, we often deal with cross-domain, cross-port, cross-protocol requests in browser. To enable CORS:

```
var couch = nano({
	url: 'http://api.host.tld',
	cors: true
});
```

This will tell browser-nano to attach credential headers (CouchDB's `AuthSession` cookie) to each request.

Note. CORS and cookie authentication should be enabled in CouchDB config:

```
[couch_httpd_auth]
allow_persistent_cookies = true
require_valid_user = true

[httpd]
enable_cors = true

[cors]
credentials = true
origins = *
```

### HTTP Basic Authorization

To perform requests with basic auth information:

`var couch = nano('http://username:password@api.host.tld');`
or
`var couch = nano({url: 'http://username:password@api.host.tld'});`

## Caveats

### OPTIONS Preflight Request

CouchDB with enabled basic auth and session cookie has peculiarity to require valid user (basic auth headers) when accessing [session endpoint](http://docs.couchdb.org/en/1.6.1/api/server/authn.html#post--_session) which actually initiates new session for specified user `name` and `password` fields.

Once again, you required to provide basic auth headers to post auth information (form fields) to get a session cookie.

On the server-side situation could be handled with:

```
require('request').post('http://login:password@api.host.tld/_session', {form: {
	name: login,
	password: password
}}, function (err, response) {
	// parse AuthSession cookie from response
});
```

But can't be handled from browser if session endpoint is CORS to your current location. Because of OPTIONS preflight request which doesn't pass any credentials for security reasons.

#### The Workaround

Is to proxy session endpoint request from a server-side using technique above and pass parsed cookie down to the browser. Just don't forget to toss in `Access-Control-Allow-Credentials: true` header along with `Set-Cookie: AuthSession=....` for cookie you've got.

### Self-Signed SSL Certificate Issue

When using CouchDB through HTTPS protocol with self-signed certificate need to manually accept it first. This could be done by accessing Couch's web admin-console on https-port manually. Otherwise, will get 'Invalid certificate error', 'net::ERR\_INSECURE\_RESPONSE' or something similar, depends on browser.

[How to enable SSL with CouchDB](https://wiki.apache.org/couchdb/How_to_enable_SSL)
