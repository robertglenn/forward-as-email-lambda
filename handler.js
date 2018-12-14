'use strict';
const SNS = require('aws-sdk/clients/sns');
const sns = new SNS();

const params = {
  TopicArn: 'arn:aws:sns:us-west-2:439899812822:support-email',
  Subject: 'default subject',
  Message: 'deafult message'
};

module.exports.forwardAsEmail = async (event, context) => {

  try {
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
