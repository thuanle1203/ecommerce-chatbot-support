'use strict';
const CartService = require('../service/cart.service');
const CustomerService = require('../service/customer.service');

exports.create = (req, res) => {
  // Validate request
  // if (!req.body.name) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  CartService.create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cart."
      });
    });
};

// Retrieve all Carts from the database.
exports.findAll = (req, res) => {
  // const email = req.query.email;
  // var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  CartService.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Carts."
      });
    });
};

// Find a single Cart with an id
exports.findOne = (req, res) => {

  const sessionId = req.params.sessionId;

  CartService.findByData({ sessionId: sessionId })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Cart with id " + sessionId });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Cart with id=" + sessionId });
    });
};

// Update a Cart by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const sessionId = req.params.sessionId;

  CartService.updateById(sessionId, req.body)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Cart with id=${sessionId}. Maybe Cart was not found!`
        });
      } else res.send({ message: "Cart was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cart with id=" + sessionId
      });
    });
};

// Delete a Cart with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  CartService.deleteById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
        });
      } else {
        res.send({
          message: "Cart was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cart with id=" + id
      });
    });
};

// Delete all Carts from the database.
exports.deleteAll = (req, res) => {
  CartService.deleteAll()
    .then(data => {
      res.send({
        message: `${data.deletedCount} Carts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Carts."
      });
    });
};

// Find all published Carts
// exports.findAllPublished = (req, res) => {
//   Cart.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Carts."
//       });
//     });
// };