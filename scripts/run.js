const exec = require('child_process').exec;
const request = require('superagent');
const path = require('path');

// Hipchat paramerters
const accessToken = 'lCxpX4CBsVMTHV8MU8G47D0o27fF7vjpkQc7SDwy';
const roomId = encodeURIComponent('Test Hipchat');

// get arguments
const step = process.argv.slice(2)[0];
const command = process.argv.slice(2)[1];

executeCommande();

/**
 * Execute a commande
 */
function executeCommande() {

  exec(command, {
    cwd: path.join(__dirname, '..'),
    maxBuffer: 600 * 1024
  }, (error, stdout, stderr) => {

    // TODO : keep colors
    console.log(stdout);

    if (error) {

      // send notification to hipchat
      sendNotification(step, command, stdout+error, roomId, accessToken)
        .then((res) => {
          console.log('successfully sent notification to hipchat room');
        })
        .catch((err) => {
          console.log('failed to sent notification to hipchat room', err);
        })
        .then(() => {
          // TODO : keep colors
          console.error(error);
          process.exit(1);
        });
    }
  });
}

/**
 * Send sample notification to Hipchat
 * @param  step
 * @param  command
 * @param  message
 * @return Promise
 */
function sendNotification(step, command, message, roomId, accessToken) {
  return new Promise((resolve, reject) => {
    let url = `https://acquia.hipchat.com/v2/room/${roomId}/notification?auth_token=${accessToken}`;
    request.post(url)
      .send({
        'color': 'purple',
        'message_format': 'text',
        'message': `Execution step: ${step} \nCommand failed: ${command} \n${message}`,
      })
      .end((error, res) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(res);
        }
      });
  });
}
