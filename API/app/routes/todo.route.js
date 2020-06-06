module.exports = (app) => {
  const todo = require("../controllers/todo.controller.js");

  // Create a new ToDo - POST Request
  app.post("/todo", todo.create);

  // Retrieve all ToDos - GET Request
  app.get("/todo", todo.findAll);

  // Retrieve a single ToDo with id - GET Request with Param
  app.get("/todo/:id", todo.findOne);

  // Update a ToDo with id - PUT Request with Param
  app.put("/todo/:id", todo.update);

  // Update a ToDo with id - PATCH Request with Param
  app.patch("/todo/:id", todo.update);

  // Delete a ToDo with id - DELETE Request with Param
  app.delete("/todo/:id", todo.delete);
};
