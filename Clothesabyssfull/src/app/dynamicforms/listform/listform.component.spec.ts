import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormComponent } from './listform.component';

describe('ListformComponent', () => {
  let component: ListFormComponent;
  let fixture: ComponentFixture<ListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
