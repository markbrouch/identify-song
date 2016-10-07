const crypto = require('crypto');

const buildStringToSign = (method, uri, accessKey, dataType, signatureVersion, timestamp) =>
  [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');

const sign = (signString, accessSecret) =>
  crypto.createHmac('sha1', accessSecret)
    .update(new Buffer(signString, 'utf-8'))
    .digest().toString('base64');

module.exports = {
  buildStringToSign,
  sign
};
