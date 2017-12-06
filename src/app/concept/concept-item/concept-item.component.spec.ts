import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptItemComponent } from './concept-item.component';

describe('ConceptItemComponent', () => {
  let component: ConceptItemComponent;
  let fixture: ComponentFixture<ConceptItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
