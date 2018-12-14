'use strict';
const SNS = require('aws-sdk/clients/sns');
const sns = new SNS();

module.exports.forwardAsEmail = async (event, context) => {

  const params = {
    TopicArn: 'arn:aws:sns:us-west-2:439899812822:support-email',
    Subject: 'default subject',
    Message: 'default message'
  };

  try {
    if (event.hasOwnProperty('body') && event.body != null) {
      const body = JSON.parse(event.body);
      if (body.hasOwnProperty('emailSubject')) {
        params.Subject = body.emailSubject;
      }
      if (body.hasOwnProperty('emailBody')) {
        params.Message = body.emailBody;
      }
    }
    await sns.publish(params).promise();
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'successfully published email to sns'
      })
    };
  } catch(error) {
  
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'error publishing email to sns',
        error
      })
    };
  }
};
