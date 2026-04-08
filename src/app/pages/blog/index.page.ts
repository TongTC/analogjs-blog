import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  template: `
    <h1>Semiconductor Updates</h1>

    @for (post of posts; track post.attributes.slug) {
      <div class="post-list" >
    <a [routerLink]="['/blog/', post.attributes.slug]">
      <img class="post__image" [src]="post.attributes.coverImage" [alt]="post.attributes.title" />
      <h2 class="post__title">{{ post.attributes.title }}</h2>
      <p class="post__desc">{{ post.attributes.description }}</p>
    </a></div>
    }
  `,
  styles: `
    .post-list {
      margin-bottom: 1.5rem;
      margin-top: 1.5rem;
    }

    h1 {
      margin-bottom: 3rem;
      color: #123647;
    }

    a {
      text-align: left;
      display: block;
      margin-bottom: 2rem;
    }

    .post__image {
      width: 100%;
      max-height: 240px;
      object-fit: cover;
      border-radius: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .post__title,
    .post__desc {
      margin: 0;
      text-align: left;
    }

    .post__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .post__desc {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  `,
})
export default class Blog {
  readonly posts = injectContentFiles<PostAttributes>();
}
