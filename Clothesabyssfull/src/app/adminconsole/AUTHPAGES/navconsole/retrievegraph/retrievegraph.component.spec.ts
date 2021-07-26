import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievegraphComponent } from './retrievegraph.component';

describe('RetrievegraphComponent', () => {
  let component: RetrievegraphComponent;
  let fixture: ComponentFixture<RetrievegraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrievegraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrievegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
