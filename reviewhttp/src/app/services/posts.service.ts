import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { map, delay, catchError, tap } from "rxjs/operators";
import { PostData } from "../models/posts";

const POST_URL = 'https://http-ng-project-5fd9f-default-rtdb.firebaseio.com/post.json';

@Injectable({ providedIn: 'root' })
export class PostsService {

  readonly postsError$ = new BehaviorSubject<string|null>(null);

  constructor(private readonly httpClient: HttpClient) { }

  // Send Http request
  createAndStorePost(title: string, content: string): Observable<any> {
    const postData: PostData = { title, content };
    return this.httpClient.post(POST_URL, postData, {
      observe: 'response',
    }).pipe(
      catchError(err => {
        this.postsError$.next(err.message);
        throw new Error(err);
      })
    );
  }

  fetchPosts(): Observable<PostData[]> {
    return this.httpClient.get<{ [key: string]: any }>(POST_URL, {
      headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
      params: new HttpParams().set('print', 'pretty'),
      responseType: 'json',
    })
      .pipe(
        delay(1000),
        map(response => {
          if (!response) {
            throw new Error('No post data returned');
          }
          const keys = Object.keys(response);
          const posts: PostData[] = [];
          for (const key of keys) {
            if (response.hasOwnProperty(key)) {
              posts.push({ ...response[key], id: key } as PostData);
            }
          }
          return posts;
        }),
        catchError(error => {
          return throwError(() => new Error(error));
        })
      );
  }

  deletePosts(): Observable<any> {
    return this.httpClient.delete(POST_URL, {
      observe: 'events',
      responseType: 'text',
    }).pipe(
      tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Sent) {
          console.log('sent');
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      })
    );
  }
}
