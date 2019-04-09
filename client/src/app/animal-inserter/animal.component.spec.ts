import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalInserterComponent } from './animal-inserter.component';

describe('AnimalInserterComponent', () => {
  let component: AnimalInserterComponent;
  let fixture: ComponentFixture<AnimalInserterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalInserterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalInserterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
