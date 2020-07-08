const passport = require('passport');

const authMiddleware=require('../middleware/auth')

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook')
  );

  app.get('/auth/google/callback', passport.authenticate('google'),(req,res)=>{
    //res.redirect('http://localhost:3000/dashboard');
    res.send({
      user:req.user
    })

  });

  app.get('/auth/facebook/callback', passport.authenticate('facebook'),(req,res)=>{
    //res.redirect('http://localhost:3000/dashboard');
    res.send({
      user:req.user
    })
  });

  app.get('/', (req, res) => {
    res.send('Home');
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};