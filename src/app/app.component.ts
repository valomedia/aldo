import { Component } from '@angular/core';

const PAGES: Page[] = [
    {id: 1, name: "Meine Seite"},
    {id: 2, name: "Deine Seite"},
    {id: 3, name: "Seine Seite"},
    {id: 4, name: "Ihre Seite"},
    {id: 5, name: "Andere Seite"},
    {id: 6, name: "Unsere Seite"},
    {id: 7, name: "Eure Seite"},
    {id: 8, name: "Noch eine Seite"}
];

export class Page {
    id: number;
    name: string;
}

@Component({
  selector: 'app',
  template: `
    <h1>{{name}}</h1>
    <div *ngIf='page'>
        <h2>{{page.name}} – Detailansicht</h2>
        <div><label>id: </label>{{page.id}}</div>
        <div>
            <label>name:</label>
            <input [(ngModel)]='page.name' placeholder="Seitenname">
        </div>
    </div>
    <div>
        <h2>Seiten</h2>
        <ul class='pages'>
            <li
                    *ngFor='let e of pages'
                    (click)='select(e)'
                    [class.selected]='e === this.page'>
                <span class='badge'>{{e.id}}</span>{{e.name}}
            </li>
        </ul>
    </div>
    `
})
export class AppComponent  {
    name = 'Aldo';
    pages = PAGES;
    page: Page;
    select = (page: Page): Page => this.page = page;
}

