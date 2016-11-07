var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
  "id": {
    type: String
  },
  "intent": {
    type: String
  },
  "state": {
    type: String
  },
  "payer": {
    "payment_method": {
      type: String
    }
  },
  "transactions": [
    {
      "amount": {
        "total": {
          type: String
        },
        "currency": {
          type: String
        },
        "details": {
          "subtotal": String,
          "tax": String,
          "shipping": String,
          "handling_fee": String,
          "shipping_discount": String,
          "insurance": String
        }
      },
      "description": {
          type: String
      },
      "custom": {
        type: String
      },
      "invoice_number": {
        type: String
      },
      "item_list": {
        "items": [{
            "name": {
              type: String
            },
            "sku": {
              type: String
            },
            "price": {
              type: String
            },
            "currency": {
              type: String
            },
            "quantity": {
              type: Number
            },
            "description": {
              type: String
            },
            "tax": {
              type: String
            }
          }
        ]},
      "related_resources": {
          type: String
      }
    }
  ],
  "create_time": {
      type: Date,
      default: Date.now()
  },
  "links": [
    {
      "href": {
        type: String
      },
      "rel": {
        type: String
      },
      "method": {
        type: String
      }
    }
  ],
  "httpStatusCode": {
      type: Number
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'},

});
module.exports = mongoose.model('Payment',paymentSchema);
