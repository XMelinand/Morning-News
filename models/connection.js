var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
    }
    mongoose.connect('mongodb+srv://admin:ywvpDrOboNxWBZY5@clusterorder66.sgrgl.mongodb.net/morningnews?retryWrites=true&w=majority',
        options,        
        function(err) { if (err){
        console.log(err);
        } else {
            console.log('bien connecté')
        }
        }
    );