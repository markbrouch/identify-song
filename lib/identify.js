const request = require('request');

const acrCloudConfig = require('../config/acrCloudConfig');
const audioConfig = require('../config/audioConfig');
const sign = require('./util/acrCloudUtil').sign;
const buildStringToSign = require('./util/acrCloudUtil').buildStringToSign;
const recordSample = require('./recordSample');

const identify = (data, acrCloudOptions, audioOptions) =>
  new Promise((resolve, reject) => {
    const config = Object.assign(
      {},
      acrCloudConfig,
      acrCloudOptions,
      audioConfig,
      audioOptions
    );

    const timestamp = new Date().getTime() / 1000;

    const stringToSign = buildStringToSign('POST',
      config.endpoint,
      config.access_key,
      config.data_type,
      config.signature_version,
      timestamp
    );

    const formData = {
      sample: data,
      access_key: config.access_key,
      data_type: config.data_type,
      signature_version: config.signature_version,
      signature: signature = sign(stringToSign, config.access_secret),
      sample_bytes: data.length,
      timestamp: timestamp,
      audio_format: 'wav',
      sample_rate: config.sampleRate,
      audio_channels: config.channels
    };

    request.post({
      url: `http://${config.host}${config.endpoint}`,
      method: 'POST',
      formData: formData
    }, (err, httpResponse, body) => {
      if (err) reject(err);
      resolve(JSON.parse(body));
    });
  });

const identifyNowPlaying = (acrCloudOptions, audioOptions) =>
  new Promise((resolve, reject) => {
    if (
      !acrCloudOptions.host ||
      !acrCloudOptions.access_key ||
      !acrCloudOptions.access_secret
    ) {
      reject('Missing ACRCloud configuration data');
    }

    recordSample(audioOptions).then(audioBuffer =>
      identify(audioBuffer, acrCloudOptions).then(response => resolve(response)));
  });

module.exports = identifyNowPlaying;
