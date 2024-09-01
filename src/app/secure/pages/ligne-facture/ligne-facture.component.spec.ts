/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LigneFactureComponent } from './ligne-facture.component';

describe('LigneFactureComponent', () => {
  let component: LigneFactureComponent;
  let fixture: ComponentFixture<LigneFactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
