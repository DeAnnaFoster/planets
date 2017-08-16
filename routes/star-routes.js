var express = require('express')
var router = express.Router()
var stars = require('../models/star')
var galaxies = require('../models/galaxy')
var planets = require('../models/planet')
var moons = require('../models/moon')

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

  .get('/:id/planets', (req, res, next) => {
    planets.find({ starId: req.params.id })
      .then(planets => {
        res.send(planets)
      }).catch(next)
  })

  .get('/:id/planets/:planetId', (req, res, next) => {
    stars.findById(req.params.id)
      .then(planet => {
        res.send(planet)
      }).catch(next)
  })

  .get('/:id/planets/:planetId/moons', (req, res, next) => {
    moons.find({ planetId: req.params.planetId })
      .then(planets => {
        res.send(planets)
      }).catch(next)
  })

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
