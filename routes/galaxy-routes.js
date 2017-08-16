var express = require('express')
var router = express.Router()
var galaxies = require('../models/galaxy')
var stars = require('../models/star')
var planets = require('../models/planet')
var moons = require('../models/moon')

router
  .get('/', (req, res, next) => {
    galaxies.find(req.query)
      .then(galaxies => {
        // if(req.session.uid == "dfslkj9032jj093rjasflkj"){
        //   res.send(jakesData)
        // }
        res.send(galaxies)
      })
      .catch(next)
  })

  // CUSTOM ROUTES
  .get('/:id', (req, res, next) => {
    galaxies.findById(req.params.id)
      .then(galaxy => {
        res.send(galaxy)
      }).catch(next)
  })

  .get('/:id/stars', (req, res, next) => {
    stars.find({ galaxyId: req.params.id })
      .then(stars => {
        res.send(stars)
      }).catch(next)
  })

  .get('/:id/stars/:starId', (req, res, next) => {
    galaxies.findById(req.params.id)
      .then(star => {
        res.send(star)
      }).catch(next)
  })

  .get('/:id/stars/:starId/planets', (req, res, next) => {
    planets.find({ starId: req.params.starId })
      .then(stars => {
        res.send(stars)
      }).catch(next)
  })



  .get('/:id/stars/:starId/planets/:planetId', (req, res, next) => {
    planets.findById(req.params.planetId)
      .then(planet => {
        res.send(planet)
      }).catch(next)
  })

    .get('/:id/stars/:starId/planets/:planetId/moons', (req, res, next) => {
    moons.find({ planetId: req.params.planetId })
      .then(planets => {
        res.send(planets)
      }).catch(next)
  })

  //grabs all moons under a given galaxyId
  // .get('/:id/moons', (req, res, next) => {
  //   moons.find({ galaxyId: req.params.id })
  //     .then(moons => {
  //       res.send(moons)
  //     })
  //     .catch(next)
  // })

  // .get('/:id/planets', (req, res, next) => {
  //   planets.find({ galaxyId: req.params.id })
  //     .then(planets => {
  //       res.send(planets)
  //     }).catch(next)
  // })



  .post('/', (req, res, next) => {
    galaxies.create(req.body)
      .then(galaxy => {
        res.send(galaxy)
      }).catch(next)
  })

  .put('/:id', (req, res, next) => {
    var id = req.params.id
    galaxies.findByIdAndUpdate(id, req.body)
      .then(galaxy => {
        res.send({ message: 'Successfully Updated' })
      }).catch(next)
  })

  .delete('/:id', (req, res, next) => {
    galaxies.findByIdAndRemove(req.params.id)
      .then(galaxy => {
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

// /api/galaxies/91334289043/stars/9328023884/planets/93280432809483/species
