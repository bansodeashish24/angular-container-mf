import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'container-v1',
  },
  {
    path: 'container-v1',
    loadChildren: () => import('./components/container-v1/container-v1.module').then((m) => m.ContainerV1Module),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
