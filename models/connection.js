var mongoose = require('mongoose');
import { DB_KEY } from '@env'

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
    }
    mongoose.connect(`mongodb+srv://admin:${DB_KEY}.sgrgl.mongodb.net/morningnews?retryWrites=true&w=majority`,
        options,        
        function(err) { if (err){
        console.log(err);
        } else {
            console.log('(***$$$ GET ROLLING BABY $$$***)')
        }
        }
    );