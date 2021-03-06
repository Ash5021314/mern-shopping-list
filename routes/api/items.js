const express = require('express')
const router = express.Router()

//Item Model
const Item = require('../../models/Item')

// @route Get api/item
// @desc Get All Items
// @access Public
router.get('/', async (req, res) => {
  await Item.find()
    .sort({date: -1})
    .then(items => res.json(items))
})

// @route POST api/item
// @desc Create A Item
// @access Public
router.post('/', async (req, res) => {
  const newItem = new Item({
    name: req.body.name
  })
  const item = await newItem.save()
  await res.json(item)
})


// @route Delete api/item
// @desc Delete A Item
// @access Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id).then(item => item.remove().then(() => res.json({success: true}))).catch(error => res.status(404).json({success: false}))
})


module.exports = router