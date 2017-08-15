var express = require('express')
var router = express.Router()
var moons = require('../models/moon')

router
  .get('/', (req, res, next) => {
    moons.find(req.query)
      .then(moons => {
        res.send(moons)
      })
      .catch(next)
  })
  .post('/', (req, res, next) => {
    moons.create(req.body)
      .then(moon =>{
        res.send(moon)
      }).catch(next)
  })
  .put('/:id', (req, res, next)=>{
    var id = req.params.id
    moons.findByIdAndUpdate(id, req.body)
      .then(moon =>{
        res.send({message: 'Successfully Updated'})
      }).catch(next)
  })
  .delete('/:id', (req, res, next)=>{
    moons.findByIdAndRemove(req.params.id)
      .then(moon => {
        res.send({message: 'Successfully Removed'})
      }).catch(next)
  })






// ERROR HANDLER
router.use('/', (err, req, res, next) => {
  if (err) {
    res.send(418, {
      success: false,
      error: err.message
    })
  } else {
    res.send(400, {
      success: false,
      error: 'Something failed please try again later'
    })
  }
})

module.exports = router
