import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAddItemComponent } from './blog-add-item.component';

describe('BlogAddItemComponent', () => {
  let component: BlogAddItemComponent;
  let fixture: ComponentFixture<BlogAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogAddItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
