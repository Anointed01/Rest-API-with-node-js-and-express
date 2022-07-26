const fs = require ('fs/promises');
const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const {v4: uuid} = require('uuid');

const app = express();
app.use(express.json());

app.get('/outfit', (req, res)=>{

    const tops = ['orang', 'white', 'black', 'navy'];
    const jeans = ['blue', 'gray', 'white', 'navy'];
    const shoes = ['black', 'white', 'brown', 'gray'];

    res.json({
        top: _.sample(tops),
        jeans: _.sample(jeans),
        shoes: _.sample(shoes)
    })
   
})

app.post('/comments', async(req, res)=>{

    const id = uuid();
    const content = req.body.content;

    if(!content){
        return res.sendStatus(400);
    }

    await fs.mkdir('data/comments', {recursive:true});
    await fs.writeFile(`data/comments/${id}.txt`, content)

    res.status(201).json({
        id:id
    });
})

app.get('/comments/:id', async(req, res)=>{
    const id = req.params.id;
    let content;

    try{
        content = await fs.readFile(`data/comments/${id}.txt`, "utf-8");
    } catch{
        res.sendStatus(404)
    }

    res.json({
        content:content
    })
})

app.listen(3000, ()=>{
    console.log("api is running at port 3000")
})
