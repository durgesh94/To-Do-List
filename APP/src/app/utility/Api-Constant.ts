import { HttpHeaders } from "@angular/common/http";

export const GlobalVariable = Object.freeze({
  /* Local Environment */
  BASE_API_URL: "http://localhost:3000/",

  /* Development Local Environment */
  // BASE_API_URL: ''

  /* UAT Environment - Server */
  // BASE_API_URL: ''
});

export const RequestApi = Object.freeze({
  GET_TODO_LIST: GlobalVariable.BASE_API_URL + "todo",
  GET_TODO_BYID: GlobalVariable.BASE_API_URL + "todo/",
  POST_TODO_DATA: GlobalVariable.BASE_API_URL + "todo",
  UPDATE_TODO_BYID: GlobalVariable.BASE_API_URL + "todo/",
  DELETE_TODO_BYID: GlobalVariable.BASE_API_URL + "todo/",
});

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
