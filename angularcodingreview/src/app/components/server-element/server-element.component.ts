import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ServerElementsType } from '../models/server.model';

// encapsulation: ViewEncapsulation.None set to None to turn off ViewEncapsulation
@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  // make this property bindable to outside
  @Input('serverElement') element: ServerElementsType = {};

  @ViewChild('heading', {static: true}) header?: ElementRef;

  @ContentChild('contentParagraph', {static: true}) paragraph?: ElementRef;

  constructor() {
    console.log('constructor');
  }
  
  public ngOnInit(): void {
    console.log('ngOnInit', 'Text content through view child: ' + this.header?.nativeElement.textContent);
    console.log('ngOnInit', 'Text content of paragraph through content child: ' + this.paragraph?.nativeElement.textContent);
  }
  
  public ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }

  public ngDoCheck(): void {
    console.log('ngDoCheck');
  }
  
  public ngAfterContentInit(): void {
    console.log('ngAfterContentInit', 'Text content of paragraph through content child: ' + this.paragraph?.nativeElement.textContent);
  }
  
  public ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }
  
  public ngAfterViewInit(): void {
    console.log('ngAfterViewInit', 'Text content: ' + this.header?.nativeElement.textContent);
  }
  
  public ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  public ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
}
