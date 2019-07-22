const express = require('express')
const body_parser = require('body-parser')

const app = express(body_parser.json())

//middleware
app.use()

//validate URL
app.get('/:url', (req, res) => {

})

//generate key
app.post('/generateKey', (req, res) => {

})

//validate key
app.post('/validateKey', (req, res) => {
    
})

app.listen(3000)