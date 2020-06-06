import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TodoService } from "../todo.service";
import { NotifierService } from "angular-notifier";
import { ApiResponse } from "../utility/Api-Response";

@Component({
  selector: "app-todo-operations",
  templateUrl: "./todo-operations.component.html",
  styleUrls: ["./todo-operations.component.css"],
})
export class TodoOperationsComponent implements OnInit {
  id: any;
  addForm: FormGroup;
  submitted = false;
  data: any;
  isUpdate: boolean = false;
  apiResponse: ApiResponse;
  btnName = "Create";

  constructor(
    private route: ActivatedRoute,
    private appService: TodoService,
    private notifierService: NotifierService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.route.params.subscribe((params) => (this.id = params.id));
  }

  ngOnInit() {
    this.formInit();
    this.id == "0" ? null : this.getData();
  }

  formInit() {
    this.addForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  getData() {
    this.isUpdate = true;
    this.btnName = "Update";
    this.appService.getTodo(this.id).subscribe((result) => {
      this.apiResponse = result as ApiResponse;
      if (this.apiResponse.status) {
        this.data = this.apiResponse.data;
        this.addForm.patchValue({
          title: this.data.title,
          description: this.data.description,
        });
      } else {
        this.notifierService.notify("error", this.apiResponse.message);
      }
    });
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) return;
    this.isUpdate ? this.onUpdate() : this.onCreate();
  }

  onUpdate() {
    this.appService
      .updateTodo(this.id, this.addForm.value)
      .subscribe((result) => {
        this.apiResponse = result as ApiResponse;
        if (this.apiResponse.status) {
          this.notifierService.notify("success", this.apiResponse.message);
          setTimeout(() => {
            this.router.navigate(["/list"]);
          }, 3000);
        } else {
          this.notifierService.notify("error", this.apiResponse.message);
        }
      });
  }

  onCreate() {
    this.appService.createTodo(this.addForm.value).subscribe((result) => {
      this.apiResponse = result as ApiResponse;
      if (this.apiResponse.status) {
        this.notifierService.notify("success", this.apiResponse.message);
        setTimeout(() => {
          this.router.navigate(["/list"]);
        }, 3000);
      } else {
        this.notifierService.notify("error", this.apiResponse.message);
      }
    });
  }

  onReset() {
    this.submitted = false;
    this.addForm.reset();
  }
}
