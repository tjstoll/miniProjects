// Prepopulate the db for testing purposes

const mongoose = require('mongoose');
const List = require('./../models/list');

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

const listItems = [
    {
        title: 'chores',
    },
    {
        title: 'groceries'
    }
]

// List.insertMany(listItems).then((res)=>{
//     console.log(res);
// }).catch(e => {
//     console.log(e);
// })