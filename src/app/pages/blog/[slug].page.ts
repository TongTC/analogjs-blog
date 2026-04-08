import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';

import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-blog-post',
  imports: [AsyncPipe, MarkdownComponent],
  template: `
    @if (post$ | async; as post) {
    <article class="post">
      <img class="post__image" [src]="post.attributes.coverImage" />
      <analog-markdown [content]="post.content" />
    </article>
    }
  `,
  styles: `
    .post {
      width: min(100%, 820px);
      margin: 0 auto;
      padding: 0 clamp(0.75rem, 2.5vw, 1.5rem) 2rem;
      box-sizing: border-box;
      display: grid;
      gap: 1rem;
      text-align: left;
      line-height: 1.7;
    }

    .post__image {
      width: 100%;
      max-height: min(44vh, 420px);
      object-fit: cover;
      border-radius: 0.75rem;
    }

    @media (min-width: 768px) {
      .post {
        padding: 0 clamp(1rem, 3vw, 2rem) 2.5rem;
      }
    }
  `,
})
export default class BlogPost {
  readonly post$ = injectContent<PostAttributes>('slug');
}
