import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`src/app/layout/layout.module`).then(m => m.LayoutModule),
    // canActivate: [ AuthGuard ],
  },
  {
    path: 'auth',
    loadChildren: () => import(`src/app/auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
