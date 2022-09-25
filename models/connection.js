var mongoose = require('mongoose');
var config = require('../config')
console.log(JSON.stringify(config))

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
    }
    mongoose.connect(`mongodb+srv://admin:${config.MONGO_KEY}.sgrgl.mongodb.net/morningnews?retryWrites=true&w=majority`,
        options,        
        function(err) { if (err){
        console.log(err);
        } else {
            console.log('(***$$$ GET ROLLING BABY $$$***)')
        }
        }
    );

