// Following: https://github.com/alexa/alexa-cookbook/blob/master/aws/Amazon-DynamoDB/read/src/index.js

//Init things
const AWSregion = 'eu-west-1';  // us-east-1
const AWS = require('aws-sdk');
const dateHelper = require('./datehelper');
const I_dateHelper = new dateHelper();
const dbTable = 'WorkoutsOfTheDay';


//Setting up entorno
AWS.config.update({
    region: AWSregion
});

//DB Helper functions

/**
 * Returns today´s CF workout from the database
 * */
async function readTodaysCFWorkout(){
    try {
        var id = I_dateHelper.todayDateFormatted()+"CF";
        const params = {
            TableName: dbTable,
            Key:{ "workout_id": id  }
        };
        var CFWorkout = readDynamoItem(params);
        return CFWorkout;
    }
    catch(error) {
        return error;
    }
}


/**
 * ReadDynamoItem will return one line of the database. Requires to receive:
 * - TableName
 * - workoutid (which is date+sport)
 * Returns a promise
 * */
function readDynamoItem(_params) {
    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});
    return new Promise((resolve) => {
        var documentClient = new AWS.DynamoDB.DocumentClient();
            documentClient.get(_params, function(err, data) {
  		if (err) {
  		    console.log ("error: "+err);
  		} else {
  		    var obj = data["Item"];
  		    resolve(obj);
  		}
	});
    });
}

function writeDynamoItem(_item) {
    let params = {
        TableName : dbTable,
        Item: _item
    };
    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});
    var documentClient = new AWS.DynamoDB.DocumentClient();
    documentClient.put(params, function(err, data) {
        console.log(data)
        if (err) console.log(err);
        else console.log(data);
    });
}

///Entry point

exports.handler = async (event) => {
    try{
        console.log("enteres here")
    }
    catch(error) {
        return error;
    }
};
