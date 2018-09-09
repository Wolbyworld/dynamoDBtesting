// Following: https://github.com/alexa/alexa-cookbook/blob/master/aws/Amazon-DynamoDB/read/src/index.js

//Init things
const config = require('./configuration')
const AWS = require('aws-sdk');
const dateHelper = require('./datehelper');
const I_dateHelper = new dateHelper();
const AWSregion = config.awsRegion;  
const dbTable = config.dynamoDBTableName;
const C_rsshelper = require('./FeedReaderHelper');
const rsshelper = new C_rsshelper();


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
    try{
        let params = {
            TableName : dbTable,
            Item: _item
        };
        console.log(params)
        var AWS = require('aws-sdk');
        AWS.config.update({region: AWSregion});
        var documentClient = new AWS.DynamoDB.DocumentClient();
        documentClient.put(params, function(err, data) {
            if (err) console.log(err);
            else console.log(data);
        });
    } catch(error) {
        console.log(error)
    }
}

///Entry point

exports.handler = async (event) => {
    try{
        allWods = await rsshelper.workouts();
        console.log("test" + await rsshelper.workouts().cf)
        for (var x in allWods){
            console.log("Guardando " + x)
            writeDynamoItem(x)
        }
        console.log(allWods)
        writeDynamoItem(allWods)
        
    }
    catch(error) {
        console.log(error)
        return error;
    }
};
