import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCatagoryCtComponent } from './image-catagory-ct.component';

describe('ImageCatagoryCtComponent', () => {
  let component: ImageCatagoryCtComponent;
  let fixture: ComponentFixture<ImageCatagoryCtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCatagoryCtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCatagoryCtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
