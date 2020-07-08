const express = require('express');
const passport = require('passport')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session');

require('./utils/passport')(passport)

const port = process.env.PORT || 8000

mongoose.connect('mongodb+srv://userRepl:legrand@cluster0.8bacb.mongodb.net/event-dev?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.error('err',err)
})

const app = express();
app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: ['sasasa']
    })
  );

app.use(passport.initialize())
app.use(passport.session());

require('./routes/auth')(app);



app.listen(port, () => {
    console.log(`Server Started on ${port}`)
})