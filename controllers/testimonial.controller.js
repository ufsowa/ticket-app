const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonial.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
      const count = await Testimonial.countDocuments();  //  count all items in collection
      const rand = Math.floor(Math.random() * count);
      const item = await Testimonial.findOne().skip(rand);  //  skip number of items from the collection
      if(!item) res.status(404).json({ message: 'Not found' });
      else res.json(item);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const item = await Testimonial.findById(req.params.id);   // no need ObjectId conversion, mongoose do it underneeth 
      if(!item) res.status(404).json({ message: 'Not found' });
      else res.json(item);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.addItem = async (req, res) => {
    try {
      const { author, text } = req.body;
      if( author && text ) {
        const newItem = new Testimonial({ author, text });   // create item/document for model
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
    const { author, text } = req.body;
    try {
      const item = await Testimonial.findById(req.params.id);   // check if item exist
      if(item) {
        await Testimonial.updateOne({ _id: req.params.id }, { $set: { author, text }});
        const item = await Testimonial.findById(req.params.id); 
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
      const item = await Testimonial.findById(req.params.id);
      if(item) {
        await Testimonial.deleteOne({ _id: req.params.id });
        //  await department.remove();    // another way to remove item
        res.json(item);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};