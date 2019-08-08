const express = require('express')
const router = express.Router()

router.get('/entrys', (req, res) => {
  Entry.find()
    .then((entries) => {
      res.json(entries)
    }).catch((err) => {
      res.json(err)
    })
})

router.post('/entrys', (req, res) => {
  const body = req.body
  const entry = new Entry(body)
  entry.save()
    .then((entry) => {
      res.json(entry)
    }).catch((err) => {
      res.json(err)
    })
})

router.get('/entrys/:id', (req, res) => {
  const id = req.params.id
  Entry.findById(id)
    .then((entry) => {
      res.json(entry)
    }).catch((err) => {
      res.json(err)
    })
})

router.delete('/entrys/:id', (req, res) => {
  const id = req.params.id
  Entry.findByIdAndDelete(id)
    .then((entry) => {
      res.json(entry)
    }).catch((err) => {
      res.json(err)
    })
})

router.put('/entrys/:id', (req, res) => {
  const body = req.body
  const id = req.params.id
  Entry.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then((entry) => {
      res.json(entry)
    }).catch((err) => {
      res.json(err)
    })
})


module.exports = router


