# identify-song
Listens to song over microphone and identifies using audio fingerprint on ACRCloud.

## Installation
```
npm install identify-song
```

## Dependencies
`identify-song` uses [ACRCloud](https://www.acrcloud.com/) for audio fingerprinting technology API. Sign up for a free developer account to get the required API access keys.

`identify-song` requires the use of [SoX](http://sox.sourceforge.net) to read audio from the microphone.

### For Mac OS
`brew install sox`

### For Linux
`sudo apt-get install sox libsox-fmt-all`

### For Windows
[download the binaries](http://sourceforge.net/projects/sox/files/latest/download)

## Usage
`identify-song` is a function that when invoked creates a `Promise` delivering the JSON result from the ACRCloud API on success.

```js
const identifySong = require('identify-song');

identifySong({
  host: '<ACRCloud host>', // i.e. 'us-west-2.api.acrcloud.com'
  access_key: '<ACRCloud access key>',
  access_secret: '<ACRCloud access secret'
})
.then(response => console.log(response))
.catch(error => console.error(error));
```

## Tips
If you keep getting 'No result' code 1001 in the response, make sure your microphone volume is set appropriately (not too quiet, but not so loud that audio is cut off).
