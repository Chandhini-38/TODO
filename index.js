const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 8080;
const TaskSchema = require('./model')
const cors = require('cors'); 

app.use(express.json());
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));
  
mongoose.connect('mongodb+srv://chandhini:chandhini@cluster1.kiwms7e.mongodb.net/?retryWrites=true&w=majority').then(() =>{
    console.log('Connected to database');
})
app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.post('/addtask', async(req,res) =>{
    const { todo} = req.body;
    try{
        const newData = new TaskSchema({
            //left side one is the key in the schema and right side one is the value from the user
            todo : todo //user input
        })
        await newData.save();
        return res.status(200).json(await TaskSchema.find())
    }catch(error){
        console.log('Error');

    }

}),
//get task by id
app.get('/gettask/:id', async(req,res) =>{
    try{
        const task = await TaskSchema.findById(req.params.id);
        return res.status(200).json(task);
    }catch(err){
        console.log(err);
    }
})
//get all tasks
app.get('/gettask', async(req,res) =>{
    try{
        const task = await TaskSchema.find();
        return res.status(200).json(task);
    }catch(error){
        console.log(error);
    }
})
//delete tasks
app.delete('/delete/:id', async(req,res) => {
    try{
        const task = await TaskSchema.findByIdAndDelete(req.params.id);
        return res.status(200).json(task);
    }catch(error){
        console.log(error);
    }
})


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});