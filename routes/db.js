//Create a router, require uuid, and the file system
const notesApi = require('express').Router()
const {v4: uuidv4} = require('uuid')
const fs = require('fs')

//Read the information from the database json file
notesApi.get('/', (req,res) => {
    fs.readFile('./db/db.json','utf8',(err,data) => {
        if(err){
            console.log(err)
        }
        else{
            const parsedData = JSON.parse(data)
            res.json(parsedData)
        } 
    } )
    
    
})

//Create a new note object and add to the database
notesApi.post('/', (req,res) => {
    
    //If the information contains both properties create a new note object and add to the database
    const {title,text} = req.body
    if(title && text){
        const newNote = {
            title,
            text,
            id:uuidv4()
        }

        //Read from the database
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                const parsedData = JSON.parse(data)
                console.log(parsedData)

                //Add new note to the database array
                parsedData.push(newNote);
                
                // Write the updated database array to the file
                fs.writeFile('./db/db.json',JSON.stringify(parsedData, null, 4), (err) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        //Return the new note object
                        res.status(201).json(newNote)
                    }
                })
            }
        })

       
    }
    else{
        res.status(500).json('Error creating new note')
    }
} )

//Delete selected note
notesApi.delete('/:id',(req,res) => {
    
    //Read from the database
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            const parsedData = JSON.parse(data)
            console.log(parsedData)

            const notDeleted = parsedData.filter(note => note.id != req.params['id'])

            // Write the updated database array to the file
            fs.writeFile('./db/db.json', JSON.stringify(notDeleted, null, 4), (err) => {
                if (err) {
                    res.status(500).json('Error deleting note')
                }
                else {
                    //Return the deleted note
                    res.status(201).json(parsedData.filter(note => note.id === req.params['id'])[0])
                }
            })
        }
    })

})

//Export the router
module.exports = notesApi