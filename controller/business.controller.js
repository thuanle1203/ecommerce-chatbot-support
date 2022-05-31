'use strict';
const mongoose = require('mongoose');
const Business = mongoose.model('business');

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a business
  const business = new Business({
    name: req.body.name,
    owner: req.body.ownerId
  });

  // Save business in the database
  business
    .save(business)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the business."
      });
    });
};

// Retrieve all businesss from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  Business.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving businesss."
      });
    });
};

// Find a single business with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Business.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found business with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving business with id=" + id });
    });
};

// Update a business by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Business.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update business with id=${id}. Maybe business was not found!`
        });
      } else res.send({ message: "business was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating business with id=" + id
      });
    });
};

// Delete a business with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Business.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete business with id=${id}. Maybe business was not found!`
        });
      } else {
        res.send({
          message: "business was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete business with id=" + id
      });
    });
};

// Delete all businesss from the database.
exports.deleteAll = (req, res) => {
  Business.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} businesss were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all businesss."
      });
    });
};

// Find all published businesss
exports.findAllPublished = (req, res) => {
  Business.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving businesss."
      });
    });
};