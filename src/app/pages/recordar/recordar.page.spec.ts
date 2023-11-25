import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordarPage } from './recordar.page';

describe('RecordarPage', () => {
  let component: RecordarPage;
  let fixture: ComponentFixture<RecordarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecordarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
