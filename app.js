const express = require('express'); // npm i express
const morgan = require('morgan') // npm i morgan
// use nodemon: npm i --save-dev nodemon
// add script in json "start": "nodemon server.js"

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

// 1 FIRST MIDDLEWARE
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next()
})

// 3 MOUNT ALL ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);



module.exports = app;