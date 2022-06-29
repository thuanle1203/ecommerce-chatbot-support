'use strict';
const OrderService = require('../service/Order.service');

exports.create = (req, res) => {
  const sessionId = req.params.sessionId;
  const businessId = req.params.businessId;

  OrderService.create(sessionId, businessId, req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    });
};

// Find a single Order with an id
exports.findById = (req, res) => {

  OrderService.findByData({ _id: req.params.id })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Order with id " + sessionId });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Order with id=" + sessionId });
    });
};

exports.findDetailById= (req, res) => {

  OrderService.findDetailById(req.params.id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Order with id " + sessionId });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Order with id=" + sessionId });
    });
};

exports.findByBusinessId = (req, res) => {

  const businessId = req.params.businessId

  OrderService.findByData({ businessId: businessId })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
      });
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  // const email = req.query.email;
  // var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  OrderService.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
      });
    });
};

// Find a single Order with an id
exports.findOne = (req, res) => {

  const sessionId = req.params.sessionId;
  const businessId = req.params.businessId;

  OrderService.findByData({ sessionId: sessionId, businessId: businessId })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Order with id " + sessionId });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Order with id=" + sessionId });
    });
};

// Update a Order by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const sessionId = req.params.sessionId;
  const businessId = req.params.businessId;

  OrderService.updateById(sessionId, businessId, req.body)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Order with id=${sessionId}. Maybe Order was not found!`
        });
      } else res.send({ message: "Order was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Order with id=" + sessionId
      });
    });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  OrderService.deleteById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
        });
      } else {
        res.send({
          message: "Order was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id
      });
    });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  OrderService.deleteAll()
    .then(data => {
      res.send({
        message: `${data.deletedCount} Orders were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Orders."
      });
    });
};

// Find all published Orders
// exports.findAllPublished = (req, res) => {
//   Order.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Orders."
//       });
//     });
// };