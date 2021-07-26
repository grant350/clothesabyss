import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainsettingsComponent } from './mainsettings.component';

describe('MainsettingsComponent', () => {
  let component: MainsettingsComponent;
  let fixture: ComponentFixture<MainsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
