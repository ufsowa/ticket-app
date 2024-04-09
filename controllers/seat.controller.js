const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
      const count = await Seat.countDocuments();  //  count all items in collection
      const rand = Math.floor(Math.random() * count);
      const item = await Seat.findOne().skip(rand);  //  skip number of items from the collection
      if(!item) res.status(404).json({ message: 'Not found' });
      else res.json(item);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const item = await Seat.findById(req.params.id);   // no need ObjectId conversion, mongoose do it underneeth 
      if(!item) res.status(404).json({ message: 'Not found' });
      else res.json(item);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.addItem = async (req, res) => {
    try {
      const { day, seat, client, email } = req.body;

      // check if seat is already reserved
      const isReserved = await Seat.exists( { day, seat} );
      if(isReserved){
        res.status(409).json({message: 'The slot is already taken...'})
      } else {
        if( day && seat && client && email) {
          const newItem = new Seat({ day, seat, client, email });   // create item/document for model
          const addedItem = await newItem.save();                             // add item to the collection with the same model
          res.json(addedItem);
        } else {
          res.status(400).json({message: 'Missing request data...'})
        }
      }
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.updateItem = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
      const item = await Seat.findById(req.params.id);   // check if item exist
      if(item) {
        await Seat.updateOne({ _id: req.params.id }, { $set: { day, seat, client, email }});
        const item = await Seat.findById(req.params.id); 
        res.json(item);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    } 
};

exports.deleteItem = async (req, res) => {
    try {
      const item = await Seat.findById(req.params.id);
      if(item) {
        await Seat.deleteOne({ _id: req.params.id });
        //  await department.remove();    // another way to remove item
        res.json(item);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};