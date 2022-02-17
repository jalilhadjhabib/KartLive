import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'faq',
        loadChildren: () => import('../faq/faq.module').then( m => m.FaqPageModule)
      },
      {
        path: 'fb',
        loadChildren: () => import('../fb/fb.module').then( m => m.FbPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then( m => m.ContactPageModule)
      },
      {
        path: 'terms2',
        loadChildren: () => import('../terms2/terms2.module').then( m => m.Terms2PageModule)
      },
      {
        path: 'privacy2',
        loadChildren: () => import('../privacy2/privacy2.module').then( m => m.Privacy2PageModule)
      },
      {
        path: 'pdf',
        loadChildren: () => import('../pdf/pdf.module').then( m => m.PdfPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard/tab1',
        pathMatch: 'full'
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule {}
