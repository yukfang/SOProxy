
const proxying =  require('./utils/http/proxying');
const PixelLib = { 
    'CL11QHJC77UDR4OH8UKG' : 'e6852684567a381406732128a41e3f575a4bcb91', // Test
    'CLLJMLRC77UEE5O898U0' : 'be8e3bc8af6ae0731c1d81720ad85925ad76bb6c', // Elysian 
    'CH3L2OJC77UEADR7DK60' : '58be96d82921d12f5970806582ce70019ff95fb6', // Jasperbird.com
    'CT1UFBJC77U9RNPH9PGG' : '43811481b5cd2081423ab927bad0944822e8c396', // 叠纸 - 测试
    'CT2NISBC77U9L9BMHB9G' : '2e33a6c795f625cd3a5c2715ada427995548df18' // 叠纸 - 客户
}

async function fw_tt_eapi(args){
  const method   = 'POST'
  const endpoint = 'https:/business-api.tiktok.com/open_api/v1.3/event/track/'
  const header   = {
       'Access-Token' : `${PixelLib[args.pixel_code]}` ,
       'Content-Type' : 'application/json' 
  }
  const param = {}
  const body = {
      "event_source": "web",
      "event_source_id":  `${args.pixel_code}`,
      data: [
          {
              "event"     : `${args.event_type}`, 
              "event_time": `${args.event_time}`,  
              "event_id"  : `${args.event_id}`,  
              "user"      : {
                    "ttclid": `${args.ttclid}`, 
                    "ip"    : args.ipv4,
                    "user_agent" : args.ua,
                    // "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/117.0.0.0", 
                    // "phone": "0c7e6a405862e402eb76a70f8a26fc732d07c32931e9fae9ab1582911d2e8a3b",
                    "email": `${args.email}`, 
              },
              "page": { // Mandatory
                "url": `${args.url}`,  
                "referrer": `${args.url}`
              },
              "properties"    : {
                "currency"    : "USD",  // Mandatory 
                "value"       :  args.value,
                "content_id"  : "Beauty_Suite_Blue",
                "content_type": "product"
              }
            }
      ]
  }

  const response = await proxying(method, endpoint, header, param, body, true);
  console.log(args.pixel_code + ' ' + args.event_type + ' ' + response.data)

}

async function fw_tt_eapi_dummy(args){
    const method   = 'POST'
    const endpoint = 'https:/business-api.tiktok.com/open_api/v1.3/event/track/'
    const header   = {
         'Access-Token' : `${PixelLib[args.pixel_code]}` ,
         'Content-Type' : 'application/json' 
    }
    const param = {}
    const body = {
        "event_source": "web",
        "event_source_id":  `${args.pixel_code}`,
        data: [
            {
                "event"     : `${args.event_type}`, 
                "event_time": `${args.event_time}`,  
                "event_id"  : `${args.event_id}`,  
                "user"      : {
                      "ttclid": `${args.ttclid}`, 
                      "ip"    : "1.1.1.1", 
                      "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/117.0.0.0", 
                      // "phone": "0c7e6a405862e402eb76a70f8a26fc732d07c32931e9fae9ab1582911d2e8a3b",
                      "email": `${args.email}`, 
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
    console.log(args.pixel_code + ' ' + args.event_type + ' ' + response.data)

}

module.exports = fw_tt_eapi