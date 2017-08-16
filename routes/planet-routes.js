var express = require('express')
var router = express.Router()
var planets = require('../models/planet')

router
  .get('/', (req, res, next) => {
    planets.find(req.query)
      .then(planets => {
        res.send(planets)
      })
      .catch(next)
  })

  .get('/:id', (req, res, next) => {
    planets.findById(req.params.id)
      .then(planet => {
        res.send(planet)
      })
      .catch(next)
  })

  // .get('/:id/moons', (req, res, next) => {
  //   //moons.find({ planetId: req.params.id })
  //   moons.findById(req.params.id)
  //     .then(moons => {
  //       res.send(moons)
  //     })
  //     .catch(next)
  // })

  //grabs all planets under a given starId
  .get('/:id/stars', (req, res, next) => {
    planets.find({ starId: req.params.id })
      .then(planets => {
        res.send(planets)
      })
      .catch(next)
  })

  //grabs all planets under a given galaxyId
  .get('/:id/galaxy', (req, res, next) => {
    planets.find({ galaxyId: req.params.id })
      .then(planets => {
        res.send(planets)
      })
      .catch(next)
  })



  .post('/', (req, res, next) => {
    planets.create(req.body)
      .then(planet => {
        res.send(planet)
      }).catch(next)
  })

  .put('/:id', (req, res, next) => {
    var id = req.params.id
    planets.findByIdAndUpdate(id, req.body)
      .then(planet => {
        res.send({ message: 'Successfully Updated' })
      }).catch(next)
  })
    
  .delete('/:id', (req, res, next) => {
    planets.findByIdAndRemove(req.params.id)
      .then(planet => {
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
