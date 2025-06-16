import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDonutComponent } from './simple-donut.component';

describe('SimpleDonutComponent', () => {
  let component: SimpleDonutComponent;
  let fixture: ComponentFixture<SimpleDonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleDonutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
