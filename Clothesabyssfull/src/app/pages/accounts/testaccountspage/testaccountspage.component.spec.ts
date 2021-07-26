import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestaccountspageComponent } from './testaccountspage.component';

describe('TestaccountspageComponent', () => {
  let component: TestaccountspageComponent;
  let fixture: ComponentFixture<TestaccountspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestaccountspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestaccountspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
