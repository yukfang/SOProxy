const fs     = require('fs');
const Koa    = require('koa');
const serve  = require('koa-static')
const { bodyParser } = require("@koa/bodyparser");
const fw_tt_eapi = require('./fw_tt_api')
const PixelLib = { 
    'CL11QHJC77UDR4OH8UKG' : 'e6852684567a381406732128a41e3f575a4bcb91' //test
}

const path   = require('path')
const koaApp = new Koa();
koaApp.use(serve(path.join(__dirname, '/public')))
koaApp.use(bodyParser());
var port = (process.env.PORT ||  80 );

koaApp.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt} \n\n`);
    console.log('-------------------------------------------------------------------')
});

// x-response-time
koaApp.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

koaApp.use(async (ctx, next) => {
    console.log('-------------------------------------------------------------------')
    if (ctx.path === '/event') {
        const headers = ctx.request.headers
        const body = ctx.request.body;
        // console.log(headers)
        console.log(body)
        console.log(body.pixel_code)
        fw_tt_eapi(body)
        ctx.body = 'ok'
    }  else if (ctx.path === '/') {
        ctx.body = fs.readFileSync('index.html', {encoding:'utf8', flag:'r'});
    } else {
        ctx.body = 'Hello World: ' + ctx.path;
    }

    next();
})



async function init() {
    console.log(`Server Init ---> ${(new Date(Date.now())).toISOString()}`);
}

module.exports = {
  koaApp,
  init,
};


