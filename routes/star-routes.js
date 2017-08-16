var express = require('express')
var router = express.Router()
var stars = require('../models/star')

router
  .get('/', (req, res, next) => {
    stars.find(req.query)
      .then(stars => {
        res.send(stars)
      })
      .catch(next)
  })
    
  .get('/:id', (req, res, next) => {
    stars.findById(req.params.id)
      .then(star => {
        res.send(star)
      })
      .catch(next)
  })
    //wont work.planets are not an array?
  // .get('/:id/planets', (req, res, next) => {
  //   planets.find({starId: req.params.id})
  //     .then(planets => {
  //       res.send(planets)
  //     })
  //     .catch(next)
  // })

  
  .post('/', (req, res, next) => {
    stars.create(req.body)
      .then(star => {
        res.send(star)
      }).catch(next)
  })

  .put('/:id', (req, res, next) => {
    var id = req.params.id
    stars.findByIdAndUpdate(id, req.body)
      .then(star => {
        res.send({ message: 'Successfully Updated' })
      }).catch(next)
  })

  .delete('/:id', (req, res, next) => {
    stars.findByIdAndRemove(req.params.id)
      .then(star => {
        res.send({ message: 'Successfully Removed' })
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
