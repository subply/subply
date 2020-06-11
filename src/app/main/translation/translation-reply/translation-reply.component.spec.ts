import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationReplyComponent } from './translation-reply.component';

describe('TranslationReplyComponent', () => {
  let component: TranslationReplyComponent;
  let fixture: ComponentFixture<TranslationReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
