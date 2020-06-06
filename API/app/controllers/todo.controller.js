const ToDo = require("../models/todo.model.js");
const handler = require("../../handlers/response.handler.js");

//** Create and Save a new ToDo */
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return handler.error(
      { code: 400, message: "ToDo content can not be empty." },
      res
    );
  }
  // Create a ToDo
  const todo = new ToDo({
    title: req.body.title,
    description: req.body.description,
  });
  // Save ToDo in the database
  todo
    .save()
    .then((data) => {
      res.message = "New todo created.";
      return handler.success(res, data);
    })
    .catch((err) => {
      err.code = 500;
      return handler.error(err, res);
    });
};

//** Retrieve and return all todos from the database. */
exports.findAll = (req, res) => {
  ToDo.find()
    .then((todos) => {
      res.message = "All todo retrieved.";
      return handler.success(res, todos);
    })
    .catch((err) => {
      err.code = 500;
      return handler.error(err, res);
    });
};

//** Find a single todo with a id */
exports.findOne = (req, res) => {
  const id = req.params.id;
  ToDo.findById(id)
    .then((todo) => {
      if (!todo) {
        return handler.error(
          { code: 404, message: "ToDo not found with id " + id },
          res
        );
      }
      res.message = "ToDo found with id " + id;
      return handler.success(res, todo);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return handler.error(
          { code: 404, message: "ToDo not found with id " + id },
          res
        );
      }
      return handler.error(
        { code: 500, message: "Error retrieving todo with id" + id },
        res
      );
    });
};

//** Update a todo identified by the id in the request */
exports.update = (req, res) => {
  const id = req.params.id;
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "ToDo content can not be empty",
    });
  }

  const data = {
    title: req.body.title,
    description: req.body.description,
  };

  // Find todo and update it with the request body
  ToDo.findByIdAndUpdate(id, data, { new: true })
    .then((todo) => {
      if (!todo) {
        return handler.error(
          { code: 404, message: "ToDo not found with id " + id },
          res
        );
      }
      res.message = "ToDo updated successfully";
      return handler.success(res, todo);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return handler.error(
          { code: 404, message: "ToDo not found with id " + id },
          res
        );
      }
      return handler.error(
        { code: 500, message: "Error updating todo with id" + id },
        res
      );
    });
};

//** Delete a todo with the specified id in the request */
exports.delete = (req, res) => {
  const id = req.params.id;
  ToDo.findByIdAndRemove(id)
    .then((todo) => {
      if (!todo) {
        return handler.error(
          { code: 404, message: "ToDo not found with id " + id },
          res
        );
      }
      res.message = "ToDo deleted successfully.";
      return handler.success(res, todo);
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return handler.error(
          { code: 404, message: "ToDo not found with id " + id },
          res
        );
      }
      return handler.error(
        { code: 500, message: "Could not delete todo with id" + id },
        res
      );
    });
};
