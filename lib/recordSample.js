const record = require('node-record-lpcm16');
const concat = require('concat-stream');

const audioConfig = require('../config/audioConfig');

const recordSample = options => new Promise(resolve => {
  const config = Object.assign({}, audioConfig, options);

  record.start({
    sampleRate: config.sampleRate,
    verbose: config.debug
  });

  const audioStream = audioBuffer => resolve(audioBuffer);

  const concatStream = concat(audioStream);

  setTimeout(() => {
    record.stop().pipe(concatStream);
  }, config.sampleDuration);
});

module.exports = recordSample;
