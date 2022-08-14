const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

app.listen(process.env.PORT || 8080, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.DB_CONNECTION)

const accountRoute = require('./routers/account')
const roomRoute = require('./routers/room')
const loginRoute = require('./routers/auth')
const messageRoute = require('./routers/message')

const url = '/api/v1/'

app.use('/', loginRoute)
app.use(url + 'account/', accountRoute)
app.use(url + 'room/', roomRoute)
app.use(url + 'message/', messageRoute)


