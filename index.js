const express = require('express')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public', {redirect: false} ))
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

app.get('/roleprofile', checkSession, (req, res) => {
  res.render('roleprofile/roleprofile.ejs')
})

app.post('/login', (req, res) => {
  req.session.guid = req.body.guid
  res.redirect('/rolebase')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})