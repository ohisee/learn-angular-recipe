import { Component, OnInit, Injector, SecurityContext } from '@angular/core';
import { createCustomElement } from "@angular/elements";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { Post } from './model/post.model';
import { PostComponent } from './components/post/post.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Post[] = [];
  customElementContent: SafeHtml | null = '';

  constructor(
    private httpClient: HttpClient,
    private injector: Injector,
    private domSanitizer: DomSanitizer) {

    const CustomPostElement = createCustomElement(PostComponent, { injector: injector });

    customElements.define('my-post', CustomPostElement);

    setTimeout(() => {
      this.customElementContent =
        domSanitizer.bypassSecurityTrustHtml('<my-post title="Some title" content="some message"></my-post>');
    }, 2000);
  }

  ngOnInit(): void {
    this.httpClient
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(fetchedPosts => (this.posts = fetchedPosts));
  }
}
