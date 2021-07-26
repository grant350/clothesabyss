import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyemailonlyComponent } from './verifyemailonly.component';

describe('VerifyemailonlyComponent', () => {
  let component: VerifyemailonlyComponent;
  let fixture: ComponentFixture<VerifyemailonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyemailonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyemailonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
