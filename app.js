require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');

const { isAuthenticated } = require('./middlewares/auth');

const memberRouter = require('./routes/member');
const boardRouter = require('./routes/board');
const commentRouter = require('./routes/comment');
const uploadRouter = require('./routes/upload');

const { sequelize } = require('./models');

const app = express();
sequelize.sync();

const whitelist = ['http://localhost:4200'];
let corsOptions = {
  origin: function(origin, callback){
    let isWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted); 
  },
  credentials:true
}
// CORS 설정
app.use(cors(corsOptions));

app.set('port', process.env.PORT || 8000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());

app.use('/member', memberRouter);
app.use('/board', boardRouter);
app.use('/comment', isAuthenticated, commentRouter);
app.use('/upload', uploadRouter);

/** 에러 처리 */

// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// app.use((err, req, res) => {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});