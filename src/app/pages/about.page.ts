import { Component } from '@angular/core';

@Component({
	selector: 'app-about',
	template: `
		<section>
			<h1>About Me</h1>
			<p>
				Welcome to my blog. This page is a simple template you can customize
				with your own bio, background, and interests.
			</p>

			<h2>What I Write About</h2>
			<ul>
				<li>Web development</li>
				<li>Angular and Analog</li>
				<li>Project notes and tutorials</li>
			</ul>
		</section>
	`,
	styles: `
		section {
			text-align: left;
			max-width: 720px;
			margin: 0 auto;
			line-height: 1.6;
		}

		h1,
		h2 {
			margin-bottom: 0.5rem;
		}

		ul {
			padding-left: 1.25rem;
		}
	`,
})
export default class About {}
