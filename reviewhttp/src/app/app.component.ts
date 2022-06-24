import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from "rxjs";
import { PostsService } from './services/posts.service';
import { PostData } from './models/posts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  loadedPosts: PostData[] = [];
  isFetching = false;
  readonly isFetching$ = new BehaviorSubject<boolean>(false);
  readonly error$ = new BehaviorSubject<string | null>(null);

  private subject?: Subscription;

  constructor(private readonly postsService: PostsService) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.isFetching$.next(true);
    this.postsService.fetchPosts().subscribe({
      next: postData => {
        this.loadedPosts = postData;
        this.isFetching = false;
        this.isFetching$.next(false);
      },
      error: error => {
        this.isFetching = false;
        this.isFetching$.next(false);
        this.error$.next(error.message);
      }
    });

    this.subject = this.postsService.postsError$.subscribe(
      errorMessage => this.error$.next(errorMessage)
    );

    console.log('error message', this.error$.getValue());
  }

  onCreatePost(postData: PostData): void {
    this.postsService.createAndStorePost(postData.title, postData.content)
      .subscribe({
        next: res => {
          console.log(res);
          this.loadedPosts.push(postData);
        }
      });
  }

  onFetchPosts(): void {
    // Send Http request
    this.isFetching = true;
    this.isFetching$.next(true);
    this.postsService.fetchPosts().subscribe({
      next: postData => {
        this.loadedPosts = postData;
        this.isFetching = false;
        this.isFetching$.next(false);
      },
      error: error => {
        this.isFetching = false;
        this.isFetching$.next(false);
        this.error$.next(error.message);
      }
    });
  }

  onClearPosts(): void {
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onClickToHandleError(): void {
    this.error$.next(null);
  }

  ngOnDestroy(): void {
    this.subject?.unsubscribe();
  }

  // private fetchPosts(): void {
  //   this.isFetching = true;
  //   this.isFetching$.next(true);
  //   this.httpClient.get<{ [key: string]: any }>(
  //     '../post.json')
  //     .pipe(
  //       delay(1000),
  //       map(response => {
  //         const keys = Object.keys(response);
  //         const posts: PostData[] = [];
  //         for (const key of keys) {
  //           if (response.hasOwnProperty(key)) {
  //             posts.push({ ...response[key], id: key } as PostData);
  //           }
  //         }
  //         return posts;
  //       })
  //     )
  //     .subscribe(posts => {
  //       this.loadedPosts = posts;
  //       this.isFetching = false;
  //       this.isFetching$.next(false);
  //     });
  // }
}

