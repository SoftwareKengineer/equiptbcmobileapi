let bodyParser = require('body-parser')
const express = require('express')
const { Sequelize, DataTypes } = require('sequelize');

const port = 3000

const sequelize = new Sequelize('equiptbcmobileapi', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

const Customer = sequelize.define('Customer', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM,
    values: ['male', 'female', 'other'],
    allowNull: false
  }
}, {
  // Other model options go here
});

// sequelize.sync({ force: true }).then(() => {
//   console.log("All models were synchronized successfully.");
// });

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.json('Api is working !')
})

// TODO: Refractor App to MVC 

app.post('/customers', function (req, res) {
  Customer.create({ 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city,
    state: req.body.state,
    gender: req.body.gender
  }).then((customer) => {
    res.json({ data: customer, message: "Customer created succesfully !"})
  })
  .catch((error) => {
    res.json({data: error, message: "Error"})
  });
})

app.get('/customers', function (req, res) {
  Customer.findAll().then((customers) => {
    res.json({data: customers, message: "Get a list of customers"})
  }).catch((error) => {
    res.json({data: error, message: "Error"})
  });
})

app.get('/customers/:id', function (req, res) {
  Customer.findByPk(req.params.id).then((customer) => {
    res.json({ data: customer, message: "Get Customer succesfully !"})
  })
  .catch((error) => {
    res.json({data: error, message: "Error"})
  });
})

app.put('/customers/:id', function (req, res) {
  Customer.findByPk(req.params.id).then((customer) => {
    customer.firstName = req.body.firstName
    customer.lastName = req.body.lastName
    customer.phoneNumber = req.body.phoneNumber
    customer.city = req.body.city
    customer.state = req.body.state
    customer.gender = req.body.gender
    customer.save().then((newCustomer) => {
      res.json({ data: newCustomer, message: "Customer updated succesfully !"})
    })
    .catch((error) => {
      res.json({data: error, message: "Error"})
    });
  })
  .catch((error) => {
    res.json({data: error, message: "Error"})
  });
})

app.delete('/customers/:id', function (req, res) {
  Customer.findByPk(req.params.id).then((customer) => {
    customer.destroy().then(() => {
      res.json({ message: "Customer deleted !"})
    }).catch((error) => {
      res.json({data: error, message: "Error"})
    });
  })
  .catch((error) => {
    res.json({data: error, message: "Error"})
  });
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})