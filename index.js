const express = require('express')
const ejs = require("ejs")
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const routes =require('./routes')



const app = express()


app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
			
//set view engine
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use(routes)

var port = process.env.PORT || 3002

app.listen(port, () => console.log('server started', port))



