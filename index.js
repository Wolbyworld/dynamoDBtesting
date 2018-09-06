// Following: https://github.com/alexa/alexa-cookbook/blob/master/aws/Amazon-DynamoDB/read/src/index.js

//Init things
const AWSregion = 'eu-west-1';  // us-east-1
const AWS = require('aws-sdk');

const params = {
    TableName: 'WorkoutsOfTheDay',
    Key:{ "workout_id": '1'  }
};

AWS.config.update({
    region: AWSregion
});

function willbecallback(_message){
	return JSON.stringify(data, null, 2)
}



//Dynamo reader
function readDynamoItem(params) {

   var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});
    console.log("entre")

    var documentClient = new AWS.DynamoDB.DocumentClient();

    documentClient.get(params, function(err, data) {
  		if (err) console.log("Mal"+err);
  		else console.log("Bien"+data);
	});


}


exports.handler = (event, context, callback) => {
    // TODO implement
    const response = {
        statusCode: 200,
        //body: readDynamoItem(params, willbecallback)
    };
    console.log("Response", readDynamoItem(params) )
    callback(null, response);
};


