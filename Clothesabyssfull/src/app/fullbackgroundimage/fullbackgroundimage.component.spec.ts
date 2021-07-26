import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullbackgroundimageComponent } from './fullbackgroundimage.component';

describe('FullbackgroundimageComponent', () => {
  let component: FullbackgroundimageComponent;
  let fixture: ComponentFixture<FullbackgroundimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullbackgroundimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullbackgroundimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
