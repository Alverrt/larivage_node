const express = require('express')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')

const sorular = require('./questions.js');

const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'/*, { redirect: false }*/))
app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/views')
app.use(express.urlencoded({ extended: false }))

app.use(cookieSession({
  name: 'guid',
  secret: 'albertino'
}))

const checkSession = (req, res, next) => {
  if (!req.session.guid) {
    res.redirect('/')
  }
  next()
}


app.get('/', (req, res) => {
  /*if (req.session.guid) {
    res.redirect('/rolebase') //prodda aktif et
  }*/
  res.render('login/login.ejs')
})

// giris yabmadiysa giremez kontrolu yap
app.get('/rolebase', checkSession, (req, res) => {
  res.render('rolebase/chooseRole.ejs')
})

const avatar = { }

app.get('/roleprofile', checkSession, (req, res) => {
  res.render('roleprofile/roleprofile.ejs', { avatar, sorular })
})

app.post('/login', (req, res) => {
  req.session.guid = req.body.guid
  res.redirect('/rolebase')
})

app.post('/roleinfo', checkSession, (req, res) => {
  avatar.img = req.body.imgsrc
  avatar.label = req.body.label
  res.redirect('/roleprofile')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})