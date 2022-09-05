const express = require('express')
const app = express()
const hbl = require ('express-handlebars')
const fetch = require('node-fetch')


app.engine('handlebars', hbl.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/requisicoes', async(req, res)=> {
    try{
        var result = await fetch('https://jsonplaceholder.typicode.com/users')
        var response = await result.json()
        if(result.status == 200){
            res.render('requisicoes', {listagem : response})
        }else {
            res.send("erro ao abrir a lista de requisições")
        }
    }catch(error){
        res.send(error)
    }
})

app.get('/apontamentos/id?', async(req, res)=>{
    try {
       if(req.params.city){
        var result = await fetch('https://jsonplaceholder.typicode.com/users' + parseInt(req.params.city))   
       }else {
        var result = await fetch('https://jsonplaceholder.typicode.com/users')
       }  
       var response = await result.json()
       console.log(response)
       if(result.status == 200){
        res.render('apontamento', {listagem: response})
       }else {
        res.send("erro ao abrir a lista de requisições")
       }
    } catch (error) {
        res.send(error)
    }
})









app.listen(3000)