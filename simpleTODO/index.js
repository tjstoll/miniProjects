const mongoose = require('mongoose');
const express = require('express');
const methodOverride = require("method-override");
const app = express();
const path = require('path');

const Item = require('./models/item');
const List = require('./models/list');

mongoose.connect(
    'mongodb://127.0.0.1:27017/todo',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('mongo connection open!');
    }).catch(err => {
        console.log('mongo error occurred');
        console.log(err);
    });

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Root page
app.get('/', async (req, res) => {
    const lists = await List.find({});
    res.render("index", {lists});
});

// Add new list
app.post('/new/list', async (req, res) => {
    const newList = new List(req.body);
    await newList.save();
    res.redirect('/');
});

// Show List
app.get('/list/:id', async (req, res) => {
    const { id } = req.params;
    const list = await List.findById(id);
    res.render('list', {list});
});

// // Update item
// app.patch('/:id', (req, res) => {
//     const {id} = req.params;
//     const updatedItem = req.body.updatedItem;
//     const oldItem = todo.find(item => item.id === id);
//     oldItem.item = updatedItem;
//     res.redirect('/')
// });

// // Update state (complete | incomplete)
// app.patch('/:id/state', (req, res) => {
//     const {id} = req.params;
//     const item = todo.find(item => item.id === id);
//     item.completed = !(item.completed);
//     item.state = item.completed ? 'complete':'incomplete' 
//     res.redirect('/');
// });

// // Delete item
// app.delete('/:id', (req, res) => {
//     const {id} = req.params;
//     todo = todo.filter(item => item.id !== id);
//     res.redirect('/');
// });

//-------------------------------------------------------------------
app.listen('3000', () => {
    console.log('listening 3000');
});