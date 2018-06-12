// 'use strict';
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const _ = require('lodash');
// const sendgrind = require('@sendgrid/mail');

// admin.initializeApp(functions.config().firebase);
// sendgrind.setApiKey('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');

// function getEmails () {
//   return admin.database().ref(`/devices`)
//     .once('value')
//     .then(snapshot => snapshot.val())
//     .then( devices => _.chain(devices).filter( device => device.type === 112 ).map(device => device.owner).value());
// }

// function sendEmail(user, to) {
//   const msg = {
//     to,
//     from: 'noreply@limbo.com',
//     subject: 'We found an object',
//     text: 'Hello world',
//     html: '<strong>Hello World</strong>',
//   };
//   sendgrind.send(msg);
// }

// exports.emailTrigger = functions.database.ref('/lost-devices/{uid}').onWrite( (event) => {
//   let data = event.after.val();

//   if (data !== null) {
//     getEmails().then( users => {
//       for (let user of users) {
//         sendEmail(user.name, user.email);
//         console.log(`Email sent to ${user.email}`);
//       }
//     });
//   }

//   return true;
// });

var functions = require('firebase-functions');

const sendgrid = require('sendgrid')
const client = sendgrid("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")

function parseBody(body) {
  var helper = sendgrid.mail;
  var fromEmail = new helper.Email(body.from);
  var toEmail = new helper.Email(body.to);
  var subject = body.subject;
  var content = new helper.Content('text/html', body.content);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
  return  mail.toJSON();
}


exports.httpEmail = functions.https.onRequest((req, res) => {
  return Promise.resolve()
    .then(() => {
      if (req.method !== 'POST') {
        const error = new Error('Only POST requests are accepted');
        error.code = 405;
        throw error;
      }


      const request = client.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: parseBody(req.body)
      });

      return client.API(request)


    })
    .then((response) => {
      if (response.body) {
        res.send(response.body);
      } else {
        res.end();
      }
    })

    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });


})