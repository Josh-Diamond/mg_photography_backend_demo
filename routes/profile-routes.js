const express = require('express');
const router = express.Router();

const db = require('../data/dbConfig')

const { authenticate } = require('../auth/authenticate');

router.post("/", authenticate, (req, res) => {
    db("profile")
      .insert(req.body)
    //   .returning('id')
      .then(ids => {
        res.status(201).json({ message: "Successfully Uploaded"})
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  router.get("/", (req, res) => {
    db("profile")
      .then(profile => {
        res.status(200).json(profile);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    db("profile")
      .where({ id })
      .first()
      .then(profile => {
        if (profile) {
          res.status(200).json(profile);
        } else {
          res.status(404).json({ message: "ID Not Found" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  
  router.delete("/:id", authenticate, (req, res) => {
    db("profile")
      .where({ id: req.params.id })
      .del()
      .then(count => {
        if (count > 0) {
          res.status(204).end();
        } else {
          res.status(404).json({ message: "Not Found" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Request Failed" });
      });
  });
  
  router.patch("/:id", authenticate, (req, res) => {
    db("profile")
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: "ID Not Found" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Request Failed" });
      });
  });

module.exports = router;