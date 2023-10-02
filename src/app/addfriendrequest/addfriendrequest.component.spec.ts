import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfriendrequestComponent } from './addfriendrequest.component';

describe('AddfriendrequestComponent', () => {
  let component: AddfriendrequestComponent;
  let fixture: ComponentFixture<AddfriendrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfriendrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfriendrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
