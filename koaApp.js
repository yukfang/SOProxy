const fs     = require('fs');
const Koa    = require('koa');
const serve = require('koa-static')
const path = require('path')
const koaApp = new Koa();
koaApp.use(serve(path.join(__dirname, '/public')))
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
        // console.log(headers)
        ctx.body = null
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


