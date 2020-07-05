var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema
var leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    image: {
          type: String,
          required: true,
         

    },
    designation: {
            type: String,
            required: true,
           
    },
    abbr: {
            type: String,
            default: " ",
            required: true,
            
    },
    description: {
        type: String,
        required: true
    },
    featured:{
        type:Boolean,
        default: false
    }
}, {
    timestamps: false
});

// model of schema
var Leaders = mongoose.model('leader', leaderSchema);

// export
module.exports = Leaders;