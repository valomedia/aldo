import {Component, Input} from '@angular/core';
import {Post} from './post';

/*
 * The Component showing a single post in detail.
 */

@Component({
    selector: 'post',
    template: `
        <h1>{{post.from.name}}</h1>
    `,
    styleUrls: ['dist/post.component.css']
})
export class PostComponent {
    @Input()
    post: Post;
}

