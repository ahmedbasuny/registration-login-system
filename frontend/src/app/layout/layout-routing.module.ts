import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../core/guards/auth.guard';


const routes: Routes = [
  { path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
    {
      path: '',
      loadChildren: () => import(`src/app/features/home/home.module`).then(m => m.HomeModule)
    },
  ] },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
