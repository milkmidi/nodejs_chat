const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const chalk = require('chalk');

const app = express();
const http = require('http').Server(app);

const config = require('./config/config.js');


const ROOT_PATH = path.resolve('./');
const DEV_MODE = process.argv.indexOf('development') > 0;

require('./config/database')(app);


app.use(express.static(`${ROOT_PATH}/public`))
    .use(express.static(`${ROOT_PATH}/dist`))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(session({
        secret: '@#$TYHBVGHJIY^TWEYKJHNBGFDWGHJKUYTWE#$%^&*&^%$#', // 建議使用 128 個字符的隨機字符串
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 1000 },
    }))
    .set('superSecret', config.secret)
    .set('view engine', 'pug');

require('./controller/IOController')(app, http);
require('./controller/IndexController')(app);
require('./controller/AuthenticateController')(app);
require('./controller/APIController')(app);


http.listen(config.port, () => {
    console.log(`listening on *:${config.port}`);
});

if (DEV_MODE) {
    app.locals.pretty = true;
    require('./dev')(app);
    // const morgan = require('morgan');
    // app.use(morgan('dev'));
    console.log(chalk.black.bgYellow(`http://localhost:${config.port} Start`));
} else {
    console.log(chalk.bgCyan.white.bold(`http://localhost:${config.port} Start`));
    // MainControll.handlerAllRouter( app );
}
