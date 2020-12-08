const router = require('express').Router();
let Grocery = require('../models/grocery.model');

router.route('/').get((req, res) => {
  Grocery.find()
    .then(groceries => res.json(groceries))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const quantity = Number(req.body.quantity);
  const date = Date.parse(req.body.date);

  const newExercise = new Grocery({
    username,
    description,
    quantity,
    date,
  });

  newExercise.save()
  .then(() => res.json('Grocery added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Grocery.findById(req.params.id)
    .then(grocery => res.json(grocery))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Grocery.findByIdAndDelete(req.params.id)
    .then(() => res.json('Grocery deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Grocery.findById(req.params.id)
    .then(grocery => {
      grocery.username = req.body.username;
      grocery.description = req.body.description;
      grocery.quantity = Number(req.body.quantity);
      grocery.date = Date.parse(req.body.date);

      grocery.save()
        .then(() => res.json('Grocery updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;