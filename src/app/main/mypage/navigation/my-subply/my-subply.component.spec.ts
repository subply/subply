import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubplyComponent } from './my-subply.component';

describe('MySubplyComponent', () => {
  let component: MySubplyComponent;
  let fixture: ComponentFixture<MySubplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySubplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySubplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
