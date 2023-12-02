const proxying =  require('./utils/http/proxying');
const PixelLib = {
    'CLB1D63C77UBB9N4T7V0' : '304a85310ba5a62c729230587404e04d929afa3f', //yfa-leadgen
    'CL11QHJC77UDR4OH8UKG' : 'e6852684567a381406732128a41e3f575a4bcb91'
}
const delayms = (s) => {
    return new Promise((res, rej) => {
        setTimeout(res, s );
    })
}
async function tt_eapi(args){
    const method = 'POST'
    const endpoint = 'https:/business-api.tiktok.com/open_api/v1.3/event/track/'
    const header = {
         'Access-Token' : `${PixelLib[args.pixel_code]}` ,
         'Content-Type' : 'application/json' 
    }
    const param = {}
    const body = {
        "event_source": "web",
        "event_source_id":  `${args.pixel_code}`,
        data: [
            {
                "event": `${args.event_type}`, 
                "event_time": (new Date()).getTime() ,  
                "event_id": `${args.event_id}`,  
                "user": {
                  "ttclid": `${args.ttclid}`, 
                  "ip" : "1.1.1.1", 
                  "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/117.0.0.0", // Mandatory 
                  "phone": "0c7e6a405862e402eb76a70f8a26fc732d07c32931e9fae9ab1582911d2e8a3b",
                  "email": "123456405862e402eb76a70f8a26fc732d07c32931e9fae9ab1582911d2e8a3b"
                },
                "page": { // Mandatory
                  "url": `${args.url}`,  
                  "referrer": `${args.url}`
                },
                "properties": {
                  "currency": "USD",  // Mandatory 
                  "value": 200.0, // Mandatory 
                  "contents": [
                    {
                      "price": 100.0,
                      "quantity": 2,
                      "content_id": "12345", // Mandatory 
                      "content_name": "Fancy-AirMax2.0 Black",
                      "content_category": "Shoes - Running Shoes",
                      "content_type": "product" // Mandatory 
                    }
                  ]
                }
              }
        ]
    }

    const response = await proxying(method, endpoint, header, param, body, true);
    console.log(response.data)

}

async function test() {
    const ttevents = [
        // 'Contact',
        // 'Search',
        'CompletePayment',
        // 'ViewContent',
        // 'CompleteRegistration'
    ]
    for(let i = 0; i < 3; i++) {
        const args = {
            pixel_code: 'CL11QHJC77UDR4OH8UKG',
            event_type: ttevents[i % ttevents.length],
            event_id: (new Date()).getTime() ,
            url: `https://${(new Date()).getTime()}.com`
        }
        tt_eapi(args)
        await delayms(150);
    }
}

test();