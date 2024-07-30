//require express, path, and the api route
const express = require('express')
const path = require('path') 
const api = require('./routes/index.js')

//Port number
const PORT = process.env.PORT || 3001
const app = express()

// Middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', api)

// Registar routes
app.get('/notes',(req,res) => 
    
    res.sendFile(path.join(__dirname,'/public/notes.html'))
)

app.get('*',(req,res) => 
    res.sendFile(path.join(__dirname,'/public/index.html'))
)

//Listen to the port
app.listen(PORT, () => 
    console.log(` http://localhost:${PORT}`)
)