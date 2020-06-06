import { Component, OnInit } from "@angular/core";
import { TodoService } from "../todo.service";
import { NotifierService } from "angular-notifier";
import { ApiResponse } from "../utility/Api-Response";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"],
})
export class TodoListComponent implements OnInit {
  TodoList = [];
  apiResponse: ApiResponse;

  constructor(
    private todoService: TodoService,
    private notifierService: NotifierService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.todoService.getTodoList().subscribe((result) => {
      this.apiResponse = result as ApiResponse;
      if (this.apiResponse.status) {
        this.TodoList = this.apiResponse.data;
      } else {
        this.notifierService.notify("error", this.apiResponse.message);
      }
    });
  }

  onDelete(id) {
    this.todoService.deleteTodo(id).subscribe((result) => {
      this.apiResponse = result as ApiResponse;
      if (this.apiResponse.status) {
        this.notifierService.notify("success", this.apiResponse.message);
        this.getData();
      } else {
        this.notifierService.notify("error", this.apiResponse.message);
      }
    });
  }
}
