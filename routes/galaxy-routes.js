var express = require('express')
var router = express.Router()
var galaxies = require('../models/galaxy')
var stars = require('../models/star')

router
  .get('/', (req, res, next) => {
    galaxies.find(req.query)
      .then(galaxies => {
        res.send(galaxies)
      })
      .catch(next)
  })
  // CUSTOM ROUTES
  .get('/:galaxyId', (req, res, next)=>{
    galaxies.find({galaxyId: req.params.id})
      .then(galaxies =>{
        res.send(galaxies)
      }).catch(next)
  })
  .get('/:id/stars', (req, res, next)=>{
    stars.find({galaxyId: req.params.id})
      .then(stars =>{
        res.send(stars)
      }).catch(next)
  }) // api/galaxies/329409238/stars
  .get('/:id/stars/:starId/planets', (req, res, next)=>{
    planets.find({starId: req.params.starId})
      .then(stars =>{
        res.send(stars)
      }).catch(next)
  }) // api/galaxies/329409238/stars/687685767/planets

  .post('/', (req, res, next) => {
    galaxies.create(req.body)
      .then(galaxy =>{
        res.send(galaxy)
      }).catch(next)
  })
  .put('/:id', (req, res, next)=>{
    var id = req.params.id
    galaxies.findByIdAndUpdate(id, req.body)
      .then(galaxy =>{
        res.send({message: 'Successfully Updated'})
      }).catch(next)
  })
  .delete('/:id', (req, res, next)=>{
    galaxies.findByIdAndRemove(req.params.id)
      .then(galaxy => {
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

// /api/galaxies/91334289043/stars/9328023884/planets/93280432809483/species
