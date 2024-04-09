const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Concert.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
      const count = await Concert.countDocuments();  //  count all items in collection
      const rand = Math.floor(Math.random() * count);
      const item = await Concert.findOne().skip(rand);  //  skip number of items from the collection
      if(!item) res.status(404).json({ message: 'Not found' });
      else res.json(item);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const item = await Concert.findById(req.params.id);   // no need ObjectId conversion, mongoose do it underneeth 
      if(!item) res.status(404).json({ message: 'Not found' });
      else res.json(item);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.addItem = async (req, res) => {
    try {
      const { performer, genre, price, day, image } = req.body;
      if( performer && genre && price && day && image ) {
        const newItem = new Concert({ performer, genre, price, day, image });   // create item/document for model
        const addedItem = await newItem.save();                             // add item to the collection with the same model
        res.json(addedItem);
      } else {
        res.status(400).json({message: 'Missing request data...'})
      }
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.updateItem = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
      const item = await Concert.findById(req.params.id);   // check if item exist
      if(item) {
        await Concert.updateOne({ _id: req.params.id }, { $set: { performer, genre, price, day, image }});
        const item = await Concert.findById(req.params.id); 
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
      const item = await Concert.findById(req.params.id);
      if(item) {
        await Concert.deleteOne({ _id: req.params.id });
        //  await department.remove();    // another way to remove item
        res.json(item);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};