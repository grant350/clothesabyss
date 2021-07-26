import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormfieldbuilderComponent } from './formfieldbuilder.component';

describe('FormfieldbuilderComponent', () => {
  let component: FormfieldbuilderComponent;
  let fixture: ComponentFixture<FormfieldbuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormfieldbuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormfieldbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
