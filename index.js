const express = require('express')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')

const sorular = require('./questions.js');
const descs = require('./roledescs.js');
const databaseFunctions = require('./databaseFunctions.js');

const app = express()
const port = 3000

require('dotenv').config()

// Database connection
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB
})
const data = databaseFunctions.initFunctions(connection)

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

const avatar = {}
let index = 0

app.get('/roleprofile', checkSession, (req, res) => {
  res.render('roleprofile/roleprofile.ejs', { avatar, sorular, index })
})

app.post('/login', checkSession, async (req, res) => {
  req.session.guid = req.body.guid

  const isRegistered = await data.checkLogin(req.body.guid)
  if (req.body.nick != '' && req.body.dc != '' && req.body.guid != '') {
    if (isRegistered[0].guidCount == 1) {
      res.status(200).send('1')

    } else {
      res.status(200).send('0')
    }
  } else {
    res.status(200).send('-2')
  }
})

app.post('/roleinfo', checkSession, async (req, res) => {
  const isRoleAvailable = await data.checkIfRoleAvailable(req.body.roleCode)
  if (isRoleAvailable[0].isAvailable === 0) {
    res.status(200).send('0')
  } else if (isRoleAvailable[0].isAvailable === 1) {    
    avatar.img = req.body.imgsrc
    avatar.label = req.body.label
    let roleCode = parseInt(req.body.roleCode)
    avatar.desc = descs[roleCode]
    res.status(200).send('1')
  }
})

app.post('/question', (req, res) => {
  if (req.body.index == 1 && index != 6) {
    index += 1
  } else if (req.body.index == 0 && index != 0) {
    index -= 1
  }
  // res.redirect('/roleprofile')
  res.sendStatus(200)
  console.log(req.body.index)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})