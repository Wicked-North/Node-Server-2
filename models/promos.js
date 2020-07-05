var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


// schema
var promoSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
          type: String,
          required: true,
          unique: false  

    },
    
    label: {
            type: String,
            default: " ",
            required: false,
            unique: false
    },
    price: {
          type: Currency,
          required: true,
          unique: false
    }, 
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Promos = mongoose.model('promo', promoSchema);

// make this available to our Node applications
module.exports = Promos;