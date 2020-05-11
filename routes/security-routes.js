const express = require('express');
const router = express.Router();

const db = require('../data/dbConfig')
const bcrypt = require('bcryptjs');


const { authenticate, generateToken } = require('../auth/authenticate');

router.post("/", (req, res) => {
  let admin = req.body;
  const hash = bcrypt.hashSync(admin.security_question_answer, 4);
  admin.security_question_answer = hash;

    db("security")
      .insert(req.body)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

router.get("/", authenticate, (req, res) => {
  db("security")
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  db("security")
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

router.delete("/:username", authenticate, (req, res) => {
  db("security")
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

router.patch("/:username", authenticate, (req, res) => {
  db("security")
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

router.post('/reset_password', (req, res) => {
  let { security_question, security_question_answer } = req.body;
 
  db('security')
  .where({security_question})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(security_question_answer, user.security_question_answer)) {
      const token = generateToken(user);
        res.status(200).json({
          token
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