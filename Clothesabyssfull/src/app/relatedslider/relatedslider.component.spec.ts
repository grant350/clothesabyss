import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedsliderComponent } from './relatedslider.component';

describe('RelatedsliderComponent', () => {
  let component: RelatedsliderComponent;
  let fixture: ComponentFixture<RelatedsliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedsliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
