import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './core/services/auth-guard.service';
import {OauthGuard} from './core/services/oauth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/applications', pathMatch: 'full'},
  {
    path: 'jobs',
    loadChildren: 'app/jobs/jobs.module#JobsModule',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'applications/:app/info',
    loadChildren: 'app/application/application.module#ApplicationModule',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'applications',
    loadChildren: 'app/jobs/jobs.module#JobsModule',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'disabled/:app',
    loadChildren: 'app/pipelines-not-enabled/pipelines-not-enabled.module#PipelinesNotEnabledModule',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {path: 'auth/tokens', loadChildren: 'app/auth-tokens/auth-tokens.module#AuthTokensModule'},
  {
    path: 'auth/acquia', loadChildren: 'app/auth-acquia/auth-acquia.module#AuthAcquiaModule',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'auth/oauth', loadChildren: 'app/auth-oauth/auth-oauth.module#AuthOauthModule',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard, OauthGuard]
  },
  {
    path: 'auth', loadChildren: 'app/auth-oauth/auth-oauth.module#AuthOauthModule', // temporary to handle github old route
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard, OauthGuard]
  },
  {path: 'error', loadChildren: 'app/status-code/status-code.module#StatusCodeModule'},
  {path: '404', loadChildren: 'app/status-code/status-code.module#StatusCodeModule'},
  {path: 'mock/header', loadChildren: 'app/mock-api/mock-api.module#MockApiModule'},
  {path: 'landing', loadChildren: 'app/landing-page/landing-page.module#LandingPageModule'},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}

