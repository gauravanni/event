const express = require('express');
const app = express();

const port = process.env.PORT || 8000

app.get('',(req,res)=>{
    res.send('Home Page')
})

app.get('/api/events',(req,res)=>{
    res.send({
        status:true,
        results: [{
            id:101,
            name:'Event1'
        }]
    })
})

app.listen(port,()=>{
    console.log(`Server Started on ${port}`)
})