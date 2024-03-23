const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const { db } = require('../db/db');

const data = db.seats;

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

router.route('/').post((req, res) => {
    console.log('post item ');
    const {day, seat, client, email} = req.body;

    // check if seat is already reserved
    const isReserved = data.some(item => {
        return item.day === day && item.seat === seat;
    });

    if( day && seat && client && email) {
        if(!isReserved){
            const item = {id: shortid(), ...{day, seat, client, email}};
            data.push(item);
            res.json(item);            
        } else {
            res.status(409).json({message: 'The slot is already taken...'})
        }
    } else {
        res.status(400).json({message: 'Missing request data...'})
    }
});

router.route('/:id').put((req, res) => {
    console.log('edit item ');
    const {day, seat, client, email} = req.body;
    if( day || seat || client || email) {
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