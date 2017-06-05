import { Component } from '@angular/core';

export class Page {
    id: number;
    name: string;
}

@Component({
  selector: 'app',
  template: `
    <h1>{{name}}<br><small>{{page.name}}</small></h1>
    <div><label>id: </label>{{page.id}}</div>
    <div>
        <label>name:</label>
        <input [(ngModel)]='page.name' placeholder="Seitenname">
    </div>
    `
})
export class AppComponent  {
    name = 'Aldo';
    page: Page = {id: 1, name: "Meine Seite"};
}

