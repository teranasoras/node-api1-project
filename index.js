console.log('hello')
const express = require('express')
const generate = require('shortid').generate


const app= express()
app.use(express.json())


const PORT = 5000


const users = [
    {id: generate(), name: 'Jane Doe', bio:"Not Tarzan's Wife, another Jane" }
]


app.get('/users', (req, res) =>{
    res.status(200).json(users)
})

app.get('/users/:id', (req, res) =>{
    const {id} = req.params
    const user = users.find(user => user.id === id)

    if (!user) {
        res.status(404).json({
            message: `no users with the id ${id}`,
        })
    } else {
        res.status(200).json(user)
    }
})


app.post('/users', (req, res) =>{
    const {name, bio} = req.body
    if (!name || !bio){
        res.status(400).json({
            message: 'I need to know more about them to add them'
        })
    }else {
        const newUser = { id: generate(), name, bio}

        users.push(newUser)

        res.status(201).json(newUser)
    }
})

app.put('/users/:id', (req, res) =>{
    const {id} = req.params
    const {name, bio} = req.body
    const indexOfUser= users.findIndex(user => user.id === id)

    if (indexOfUser !== -1){
        users[indexOfUser] = {id, name, bio}
        res.status(200).json({id, name, bio})   
     }else{
         res.status(404).json({
             message: 'thats not one of our users'
         })
     }
}) 

app.delete('/users/:id', (req, res) =>{
    const {id}= req.params
    try{
        if(!users.find(user => user.id === id)){
            res.status(404).json({message : 'thats not one of our users at the moment'})
        }else {
            users = users.filter(user => user.id !== id)
            res.status(200).json({message : 'we got rid of them, dont ask too many questions'})
        }
    } catch (error){
        res.status(500).json({message: 'we couldnt get rid of them, theyre too powerful. You should probably hide from them'})
    }
})

app.all('*', (req, res) => {
    res.status(404).json({ message: 'go to '})
  })

app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
  })