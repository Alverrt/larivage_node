const express = require('express')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')

const sorular = require('./questions.js');
const descs = require('./roledescs.js');
const databaseFunctions = require('./databaseFunctions.js');

const app = express()
const port = 80

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
  } else {
    next()
  }
}

const insertBanInfoIfNotExist = async (guid) => {
  const existence = await data.checkIfExistInBanlist(guid)
  if (existence[0].isExist === 0) {
    await data.saveToBanlist(guid)
    return true
  } else {
    const isBanned = await data.checkIfUserBanned(guid)
    if (isBanned[0].is_banned === 0) {
      return true
    } else {
      return false
    }
  }
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

app.post('/login', async (req, res) => {
  req.session.guid = req.body.guid
  req.session.nick = req.body.nick
  req.session.dc = req.body.dc

  const isRegistered = await data.checkLogin(req.body.guid)
  if (req.body.nick != '' && req.body.dc != '' && req.body.guid != '') {
    if (isRegistered[0].guidCount == 1) {
      if (await insertBanInfoIfNotExist(req.body.guid)) {
        res.status(200).send('1')
      } else {
        res.status(200).send('-1')
      }
    } else {
      res.status(200).send('0')
    }
  } else {
    res.status(200).send('-2')
  }
})

const checkIfUndefined = (obj, prop) => {
  if (typeof obj !== 'undefined' && obj.length > 0) {
    return true
  } else {
    return false
  }
}

app.post('/roleinfo', checkSession, async (req, res) => {
  const isRoleAvailable = await data.checkIfRoleAvailable(req.body.roleCode)
  if (isRoleAvailable !== 'undefined' && isRoleAvailable.length > 0) {
    if (isRoleAvailable[0].isAvailable === 0) {
      res.status(200).send('0')
    } else if (isRoleAvailable[0].isAvailable === 1) {
      let roleCode = parseInt(req.body.roleCode)
      const roleDescs = await data.getRoleDescs(roleCode)
      if (typeof roleDescs !== 'undefined' && roleDescs.length > 0) {
        avatar.img = req.body.imgsrc
        avatar.label = req.body.label
        avatar.updesc = roleDescs[0].role_up_desc
        avatar.desc = roleDescs[0].role_down_desc
        avatar.roleCode = req.body.roleCode
        res.status(200).send('1')
      } else {
        avatar.img = req.body.imgsrc
        avatar.label = req.body.label
        avatar.roleCode = req.body.roleCode
      }
    }
  } else {
    res.status(200).send('0')
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
})

app.post('/roleregister', async (req, res) => {
  const isRoleAvailable = await data.checkIfRoleAvailable(req.body.code)
  if (isRoleAvailable[0].isAvailable === 0) {
    res.status(200).send('0')

  } else if (isRoleAvailable[0].isAvailable === 1) {
    const previousRoleRequestCount = await data.checkApplicationCount(req.session.guid)

    if (previousRoleRequestCount[0].appCount < 3) {
      const isBanned = await data.checkIfUserBanned(req.session.guid)
      if (isBanned[0].is_banned === 0) {

        if (req.session.nick && req.session.dc) {
          const ic_nick = req.session.nick
          const dc_nick = req.session.dc
          const guid = req.session.guid
          const rolecode = req.body.code

          await data.registerRole(guid, ic_nick, dc_nick, rolecode)
          const roleLimitReached = await data.checkApplicationCount(guid)

          res.status(200).send('1') // hersey okey rolebaseye yonlendir


        } else {
          req.session = null
          res.status(200).send('-4') //sessionlarda hata var
        }
      } else {
        req.session = null
        res.status(200).send('-3') // ban yemissin
      }

    } else {
      req.session = null
      res.status(200).send('-1') // role sinirini doldurdun en fazla 3 basvuruyu gectin
    }

  }


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})