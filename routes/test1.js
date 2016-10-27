{
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "47"
        },
        "description": "Test Transaction",
        "item_list": {
            "items": [{
                "name": "Bloated Buffalo",
                "price": "22",
                "quantity": 2,
                "currency": "USD",
                "sku": "5811d22a00ddea9c460ebfa6"
            }, {
                "name": "Overfed Orangutan",
                "price": "25",
                "quantity": 1,
                "currency": "USD",
                "sku": "5811d22a00ddea9c460ebfa5"
            }]
        }
    }],
    "redirect_urls": {
        "return_url": "http://localhost:3000/execute",
        "cancel_url": "http://localhost:3000/cancel"
    }
}