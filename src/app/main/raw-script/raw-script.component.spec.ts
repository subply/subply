import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawScriptComponent } from './raw-script.component';

describe('RawScriptComponent', () => {
  let component: RawScriptComponent;
  let fixture: ComponentFixture<RawScriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawScriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
