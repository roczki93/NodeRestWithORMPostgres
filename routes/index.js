const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://myuser:mypass@192.168.177.183:5432/mydatabase1',{logging: false});

var UserInformation = sequelize.define('user_information', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  },
  email: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  street: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.STRING
  },
  longitude: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  freezeTableName: true // Model tableName will be the same as the model name
});

// UserInformation.sync({force: false}).then(function () {
//   // Table created
//   return UserInformation.create({
//     firstName: 'Lukasz',
//     lastName: 'Lukasimir',
//     email: 'taki@email.com',
//     gender: 'male',
//     city: 'Gliwice',
//     street: '22 Dluga',
//     latitude: '40.0000',
//     longitude: '50.9990'
//   });
// });
//get user info
router.get('/api/v1/userinfo', (req, res, next) => {
    return UserInformation
      .findAll({ 
        order: [['id', 'DESC']], 
        limit: 10 
      })
      .then(UserInformation => res.status(200).send(UserInformation));
});
router.get('/api/v1/userinfo/:findParam', (req, res, next) => {
    return UserInformation
      .find({ 
        where: {
          id: req.params.findParam 
        }
      })
      .then(UserInformation => res.status(200).send(UserInformation));
});
//end get user info
//add user info
router.post('/api/v1/userinfo', (req, res, next) => {
  // Grab data from http request
  const data = ;
  return UserInformation.create(
  {
    first_name: req.body.first_name, 
    last_name: req.body.last_name, 
    email: req.body.email, 
    gender: req.body.gender, 
    city: req.body.city, 
    street: req.body.street, 
    latitude: req.body.latitude, 
    longitude: req.body.longitude,
  })
    .then(function(UserInformation => res.status(200).send(UserInformation));
});
//end!
/* GET home page. */
router.get('/', function(req, res, next) {
  UserInformation.findOne().then(function (userInfo) {
    console.log(userInfo.get());
  });
  
      UserInformation.findOne().then(function (userInfo) {
          res.json(userInfo.get());
      });
    
  // res.render('index', { title: 'Express' });
});

module.exports = router;
