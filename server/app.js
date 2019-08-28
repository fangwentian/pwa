const Koa = require('koa');
const Router = require('koa-router');
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');
const serve = require('koa-static');

let app = new Koa();
let router = new Router();

app.use(koaNunjucks({
    ext: 'html',
    path: path.join(__dirname, '../client/dist'),
    nunjucksConfig: {
        trimBlocks: true
    }
}));

router.get('/', async (ctx, next) => {
    ctx.render('index')
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(serve(path.join(__dirname, '../client/resource')));

app.listen(3000);
console.log('server start on 127.0.0.1:3000')
