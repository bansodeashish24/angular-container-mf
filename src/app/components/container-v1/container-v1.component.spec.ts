import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerV1Component } from './container-v1.component';

describe('ContainerV1Component', () => {
  let component: ContainerV1Component;
  let fixture: ComponentFixture<ContainerV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerV1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
