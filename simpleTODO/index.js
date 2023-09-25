const express = require('express');
const methodOverride = require("method-override");
const {v4: uuid} = require('uuid');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


let todo = [
    {
        id: uuid(),
        item: 'laundry',
        completed: false,
        state: 'incomplete'
    },
    {
        id: uuid(),
        item: 'dishes',
        completed: false,
        state: 'incomplete'
    }
]

// Root page
app.get('/', (req, res) => {
    res.render("index", {todo});
})

// Add new item
app.post('/', (req, res) => {
    const {newItem} = req.body;
    todo.push({
        id: uuid(),
        item: newItem,
        completed: false,
        state: 'incomplete'
    });
    res.redirect('/');
});

// Update item
app.patch('/:id', (req, res) => {
    const {id} = req.params;
    const updatedItem = req.body.updatedItem;
    const oldItem = todo.find(item => item.id === id);
    oldItem.item = updatedItem;
    res.redirect('/')
});

// Update state (complete | incomplete)
app.patch('/:id/state', (req, res) => {
    const {id} = req.params;
    const item = todo.find(item => item.id === id);
    item.completed = !(item.completed);
    item.state = item.completed ? 'complete':'incomplete' 
    res.redirect('/');
});

// Delete item
app.delete('/:id', (req, res) => {
    const {id} = req.params;
    todo = todo.filter(item => item.id !== id);
    res.redirect('/');
});

//-------------------------------------------------------------------
app.listen('3000', () => {
    console.log('listening 3000');
});