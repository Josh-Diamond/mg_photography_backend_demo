const express = require('express');
const router = express.Router();

const db = require('../data/dbConfig')
const bcrypt = require('bcryptjs');


const { authenticate, generateToken } = require('../auth/authenticate');

router.post("/user", (req, res) => {
  let admin = req.body;
  const hash = bcrypt.hashSync(admin.password, 4);
  admin.password = hash;

    db("admin")
      .insert(req.body)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

router.get("/user", authenticate, (req, res) => {
  db("admin")
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/user/:username", authenticate, (req, res) => {
  const { username } = req.params;
  db("admin")
    .where({ username })
    .first()
    .then(admin => {
      if (admin) {
        res.status(200).json(admin);
      } else {
        res.status(404).json({ message: "Admin Not Found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/user/:username", authenticate, (req, res) => {
  db("admin")
    .where({ username: req.params.username })
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

router.patch("/user/:username", authenticate, (req, res) => {
  db("admin")
    .where({ username: req.params.username })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "Admin Not Found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Request Failed" });
    });
});

router.post('/admin', (req, res) => {
  let { username, password } = req.body;
 
  db('admin')
  .where({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
        const id = user.id
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
          id
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json({error: 'Log In Failed'});
    });
 
 });

module.exports = router;