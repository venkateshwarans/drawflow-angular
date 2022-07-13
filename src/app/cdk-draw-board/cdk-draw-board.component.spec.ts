import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkDrawBoardComponent } from './cdk-draw-board.component';

describe('CdkDrawBoardComponent', () => {
  let component: CdkDrawBoardComponent;
  let fixture: ComponentFixture<CdkDrawBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdkDrawBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkDrawBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
