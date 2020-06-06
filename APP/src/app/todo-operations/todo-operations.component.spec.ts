import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoOperationsComponent } from './todo-operations.component';

describe('TodoOperationsComponent', () => {
  let component: TodoOperationsComponent;
  let fixture: ComponentFixture<TodoOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
