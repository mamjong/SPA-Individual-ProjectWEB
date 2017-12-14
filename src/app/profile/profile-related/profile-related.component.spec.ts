import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRelatedComponent } from './profile-related.component';

describe('ProfileRelatedComponent', () => {
  let component: ProfileRelatedComponent;
  let fixture: ComponentFixture<ProfileRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
