import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphpageComponent } from './graphpage.component';

describe('GraphpageComponent', () => {
  let component: GraphpageComponent;
  let fixture: ComponentFixture<GraphpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
