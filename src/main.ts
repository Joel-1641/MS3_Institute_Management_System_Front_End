import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { MatTableModule } from '@angular/material/table';
// import { importProvidersFrom, NgModule } from '@angular/core';
// import { ToastrModule } from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(routes)],
// }).catch((err) => console.error(err));

// const extendedAppConfig = {
//   ...appConfig,
//   providers: [
//     ...(appConfig.providers || []),
//     importProvidersFrom(
//       BrowserAnimationsModule,
//       ToastrModule.forRoot({
//         timeOut: 3000,
//         positionClass: 'toast-top-right',
//         preventDuplicates: true,
//       })
//     ), provideAnimationsAsync(),
//     MatTableModule,
//   ],
// };

bootstrapApplication(AppComponent, appConfig,)
  .catch((err) => console.error(err));
