import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
	
	{
		path: '',
		component: LayoutComponent
	// 	children: [
	// 		{
	// 			path: '',
	// 			loadChildren: '../features/dashboard/dashboard.module#DashboardModule'
	// 		}
	// 		{
	// 			path: 'patient',
	// 			loadChildren: '../features/patient/patient.module#PatientModule'
	// 		},
	// 		{
	// 			path: 'hcp',
	// 			loadChildren: '../features/hcp/hcp.module#HcpModule'
	// 		},
	// 		{
	// 			path: 'case',
	// 			loadChildren: '../features/case/case.module#CaseModule'
	// 		},
	// 		{
	// 			path: 'intake',
	// 			loadChildren: '../features/intake/intake.module#IntakeModule'
	// 		},
	// 		{
	// 			path: 'home',
	// 			loadChildren: '../features/home/home.module#HomeModule'
	// 		},
	// 		{
	// 			path: 'site',
	// 			loadChildren: '../features/site/site.module#SiteModule'
	// 		},
	// 		{
	// 			path: 'message',
	// 			loadChildren: '../features/inbox/inbox.module#InboxModule'
	// 		}
	// 	]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LayoutRoutingModule {
}
