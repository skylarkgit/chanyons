import { MainComponent } from './login/main/main.component';
import { LoginComponent } from './chanyon/login/login.component';
import { PageNotFoundComponent } from './chanyon/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';
import { GmapComponent } from './chanyon/room/gmap/gmap.component';
import { RoomComponent } from './chanyon/room/room.component';

export const appRoutes: Routes = [
  {path: 'maps', component: GmapComponent},
  {path: 'rooms', component: RoomComponent},
  {path: 'login', component: MainComponent},
  {path: '**', component: PageNotFoundComponent}
];
