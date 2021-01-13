const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/views')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('login/login.ejs')
})

// giris yabmadiysa giremez kontrolu yap
app.get('/rolebase', (req, res) => {
  res.render('rolebase/chooseRole.ejs')
})

app.get('/rolprofile', (req, res) => {
  res.render('rolebase/rolprofile.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})