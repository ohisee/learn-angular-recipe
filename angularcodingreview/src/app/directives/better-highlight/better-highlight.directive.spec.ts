import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BetterHighlightDirective } from './better-highlight.directive';

@Component({
  selector: 'test-component',
  template: '<div appBetterHighlight>style this div element with better highlight</div>',
})
class TestComponent { }

describe('BetterHighlightDirective', () => {
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BetterHighlightDirective,
        TestComponent,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;

    fixture.detectChanges(); // initial binding, this is required
  });

  it('should create component', () => {
    expect(testComponent).toBeTruthy();
  });

  it('should have div element', () => {
    let htmlEl = fixture.debugElement.nativeElement as HTMLElement;
    let divEls = htmlEl.querySelectorAll('div');
    expect(divEls.length).toBe(1);
  });

  it('should be have highlighted div element', () => {
    let elements = fixture.debugElement.queryAll(By.directive(BetterHighlightDirective));
    expect(elements.length).toBe(1);
    let bgColor = elements[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('blue');
  });
});
