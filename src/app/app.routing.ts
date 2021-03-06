import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { RedirectComponent } from './components/redirect/redirect.component';

const appRoutes = [
    {
        path: 'add',
        component: AddComponent,
    },
    {
        path: 'list',
        component: ListComponent,
    },
    {
        path: 'redirect',
        component: RedirectComponent,
    },
    {
        path: '',
        redirectTo: '/add',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: ListComponent,
    }
];


@NgModule({
    declarations: [
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(appRoutes)
    ],
    exports: [ RouterModule ],
    providers: []
  })
  export class RoutingModule { }