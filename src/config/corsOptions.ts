/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 *
 * Origin: true - reflects the request origin as allowed origin
 * Do not use '*' as allowed Origin when credentials is set to true
 */

export default {
  // origin: ['http://127.0.0.1', 'http://localhost']
  origin: true,
  methods: [
    'GET',
    'POST'
  ],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'X-HTTP-Method-Override',
    'Content-Type',
    'Accept'
  ],
  credentials: true,
  optionsSuccessStatus: 204
};
