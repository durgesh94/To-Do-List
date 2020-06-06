import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { TodoOperationsComponent } from "./todo-operations/todo-operations.component";

const routes: Routes = [
  { path: "list", component: TodoListComponent },
  { path: "operation/:id", component: TodoOperationsComponent },
  { path: "404", component: PageNotFoundComponent },
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponents = [
  TodoListComponent,
  TodoOperationsComponent,
  PageNotFoundComponent,
];
