'use strict';
const CustomerService = require('../service/Customer.service')

exports.create = (req, res) => {
  // Validate request
  // if (!req.body.name) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  CustomerService.create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  // const email = req.query.email;
  // var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  CustomerService.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  CustomerService.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Customer with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Customer with id=" + id });
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  CustomerService.updateById(id, req.body)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`
        });
      } else res.send({ message: "Customer was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id
      });
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  CustomerService.deleteById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
        });
      } else {
        res.send({
          message: "Customer was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id
      });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  CustomerService.deleteAll()
    .then(data => {
      res.send({
        message: `${data.deletedCount} Customers were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Customers."
      });
    });
};

// Find all published Customers
// exports.findAllPublished = (req, res) => {
//   Customer.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Customers."
//       });
//     });
// };