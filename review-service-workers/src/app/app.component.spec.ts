import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { Post } from './model/post.model';
import { of } from 'rxjs';
import { PostComponent } from './components/post/post.component';

describe('AppComponent', () => {
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {

    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
        PostComponent,
      ],
      providers: [
        {
          provide: HttpClient, useValue: httpSpy
        }
      ]
    }).compileComponents();

    httpSpy.get.and.returnValue(of([]));
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set the app\'s posts through http client', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const posts = [{
      title: 'some title',
      body: 'something new to be here',
      id: 1,
      userId: 1,
    }];

    httpSpy.get.and.returnValue(of(posts));
    fixture.detectChanges();

    expect(app.posts).toBeDefined();
    expect(app.posts.length).toEqual(1);
    expect(app.posts[0]).toEqual(posts[0]);
  });

  it('should render title', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    tick();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Posts');
  }));
});

describe('AppComponent test http', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should get posts', () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const posts = [{
      title: 'some title',
      body: 'something new to be here',
      id: 1,
      userId: 1,
    }];

    httpClient.get<Post[]>(url).subscribe(postsRep => {
      expect(postsRep).toBeDefined();
      expect(postsRep.length).toEqual(1);
      expect(postsRep[0]).toEqual(posts[0]);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(posts);

    httpTestingController.verify();
  });
});
