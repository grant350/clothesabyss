import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSlideComponent } from './container-slide.component';

describe('ContainerSlideComponent', () => {
  let component: ContainerSlideComponent;
  let fixture: ComponentFixture<ContainerSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
