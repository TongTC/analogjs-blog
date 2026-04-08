import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  template: `
    <h1>Semiconductor Updates</h1>

    <div class="blog-layout">
      <aside class="filter-nav">
        <h2 class="filter-nav__title">หมวดหมู่</h2>
        <button
          type="button"
          class="filter-nav__button"
          [class.is-active]="selectedCategory() === 'all'"
          (click)="setCategory('all')"
        >
          ทั้งหมด
        </button>

        @for (category of categories; track category) {
          <button
            type="button"
            class="filter-nav__button"
            [class.is-active]="selectedCategory() === category"
            (click)="setCategory(category)"
          >
            {{ category }}
          </button>
        }
      </aside>

      <section class="blog-content">
        <div class="blog-grid">
          @for (post of filteredPosts(); track post.attributes.slug) {
            <div class="post-list">
              <a [routerLink]="['/blog/', post.attributes.slug]">
                <img class="post__image" [src]="post.attributes.coverImage" [alt]="post.attributes.title" />
                <p class="post__category">{{ post.attributes.category }}</p>
                <h2 class="post__title">{{ post.attributes.title }}</h2>
                <p class="post__desc">{{ post.attributes.description }}</p>
              </a>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: `
    .blog-layout {
      display: grid;
      grid-template-columns: 1fr 240px;
      gap: 2rem;
      align-items: start;
      text-align: left;
    }

    .filter-nav {
      position: sticky;
      top: 1.5rem;
      display: flex;
      flex-direction: column;
      align-self: start;
      gap: 0.6rem;
      padding: 1rem;
      border-radius: 0.75rem;
      border: 1px solid #dbe5ea;
      background: #f8fbfd;
    }

    .filter-nav__title {
      margin: 0 0 0.5rem;
      font-size: 1rem;
      color: #123647;
    }

    .filter-nav__button {
      border: 0;
      border-radius: 0.6rem;
      padding: 0.55rem 0.7rem;
      text-align: left;
      color: #234556;
      background: transparent;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .filter-nav__button:hover {
      background: #eaf3f8;
    }

    .filter-nav__button.is-active {
      background: #123647;
      color: #fff;
    }

    .blog-content {
      grid-column: 1;
      min-width: 0;
      margin: 0;
      padding: 0;
      align-self: start;
    }

    .filter-nav {
      grid-column: 2;
    }

    .blog-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1.5rem;
      margin: 0;
    }

    .post-list {
      margin: 0;
    }

    h1 {
      margin-top: 0;
      margin-bottom: 3rem;
      color: #123647;
    }

    .post__category {
      margin: 0 0 0.35rem;
      color: #4d7084;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    a {
      text-align: left;
      display: block;
      margin: 0;
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

    @media (max-width: 1024px) {
      .blog-layout {
        grid-template-columns: 1fr;
      }

      .filter-nav {
        grid-column: auto;
        position: static;
      }

      .blog-content {
        grid-column: auto;
      }

      .blog-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 640px) {
      .blog-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export default class Blog {
  readonly posts = injectContentFiles<PostAttributes>();
  readonly selectedCategory = signal<string>('all');
  readonly categories = [...new Set(this.posts.map((post) => post.attributes.category))].sort((a, b) =>
    a.localeCompare(b),
  );

  readonly filteredPosts = computed(() => {
    const activeCategory = this.selectedCategory();
    if (activeCategory === 'all') {
      return this.posts;
    }

    return this.posts.filter((post) => post.attributes.category === activeCategory);
  });

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
