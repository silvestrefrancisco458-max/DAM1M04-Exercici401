const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.engine(
  'hbs',
  exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: {
      eq: (a, b) => a === b,
      gt: (a, b) => a > b,
      lt: (a, b) => a < b,
      suma: (a, b) => Number(a) + Number(b),
      resta: (a, b) => Number(a) - Number(b),
    },
  })
)

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {
  res.locals.theme = 'clar'
  next()
})

app.use('/', require('./routes/dashboard'))
app.use('/', require('./routes/productes'))
app.use('/', require('./routes/clients'))
app.use('/', require('./routes/vendes'))
app.use('/', require('./routes/crud'))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor MiniERP en http://localhost:${PORT}`)
})