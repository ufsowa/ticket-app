const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const { db } = require('../db/db');

const data = db.testimonials;

router.route('/').get((req, res) => {
    console.log('get all ');
    res.json(data);
});

router.route('/random').get((req, res) => {
    console.log('get random ');
    res.json(data[Math.floor(Math.random() * data.length)]);
});

router.route('/:id').get((req, res) => {
    console.log('get id ');
    res.json(data.find(item => item.id.toString() === req.params.id));
});

router.route('/').put((req, res) => {
    console.log('put item ');
    const {author, text} = req.body;

    if( author && text) {
        data.push({id: shortid(), ...{author, text}});
        res.json(data);            
    } else {
        res.status(400).json({message: 'Missing request data...'})
    }
});

router.route('/:id').put((req, res) => {
    console.log('edit item ');
    const {author, text} = req.body;
    if( author || text) {
        const index = data.findIndex(item => item.id.toString() === req.params.id);
        data[index] = { ...data[index], ...req.body};
        res.json(data);
    } else {
        res.status(400).json({message: 'Missing request data...'})
    }
});

router.route('/:id').delete((req, res) => {
    console.log('delete item ');
    res.json(data.filter(item => item.id.toString() !== req.params.id));
});

module.exports = router;