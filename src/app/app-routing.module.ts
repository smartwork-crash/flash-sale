import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserAuthGuard } from './core/gaurd/user-auth.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('src/app/layout/layout.module').then(module => module.LayoutModule),
		canActivate: [UserAuthGuard],
	},
	{
		path: 'user',
		component: UserComponent
	},
	{
		path: '**',
		redirectTo: '404',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
