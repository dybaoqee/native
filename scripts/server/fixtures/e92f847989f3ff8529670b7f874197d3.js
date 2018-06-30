var path = require("path");

/**
 * POST /graphql_api
 *
 * host: localhost:4000
 * accept: * / *
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGFjNzE4ZTRjYzFhZGExODI5MWIzYjA1NjU3N2IwMWY3.5Ao8hz5vG8DELGkyGx5FenaDqVGXhxa20nHd8W1PT2o
 * accept-language: en-us
 * authorization: undefined
 * content-length: 166
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Fri, 08 Jun 2018 19:11:13 GMT");
  res.setHeader("content-length", "63");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGFjNzE4ZTRjYzFhZGExODI5MWIzYjA1NjU3N2IwMWY3.5Ao8hz5vG8DELGkyGx5FenaDqVGXhxa20nHd8W1PT2o; path=/; HttpOnly"]);
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "nc4kn2e7m0p2mbj0j23tslf5om5tgu6t");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("content-type", "application/json; charset=utf-8");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJkYXRhIjp7InRvdXJWaXN1YWxpemVkIjp7ImlkIjoiMjM4IiwiX190eXBlbmFtZSI6Ikxpc3RpbmcifX19", "base64"));
  res.end();

  return __filename;
};