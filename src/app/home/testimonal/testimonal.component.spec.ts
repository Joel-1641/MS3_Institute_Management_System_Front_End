import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonalComponent } from './testimonal.component';

describe('TestimonalComponent', () => {
  let component: TestimonalComponent;
  let fixture: ComponentFixture<TestimonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
