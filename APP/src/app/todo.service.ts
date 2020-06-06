import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RequestApi, httpOptions } from "../app/utility/Api-Constant";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodoList() {
    return this.http.get(RequestApi.GET_TODO_LIST, httpOptions);
  }

  getTodo(id: any) {
    return this.http.get(RequestApi.GET_TODO_BYID + id, httpOptions);
  }

  createTodo(data: any) {
    return this.http.post(RequestApi.POST_TODO_DATA, data, httpOptions);
  }

  updateTodo(id: any, data: any) {
    return this.http.put(RequestApi.UPDATE_TODO_BYID + id, data, httpOptions);
  }

  deleteTodo(id: any) {
    return this.http.delete(RequestApi.DELETE_TODO_BYID + id, httpOptions);
  }
}
