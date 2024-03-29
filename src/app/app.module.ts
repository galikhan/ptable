import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddIconModule } from './icon/add-icon/add-icon.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SharedModule } from "./shared/shared.module";
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { InformaticsModule } from './informatics/informatics.module';
import { AuthInterceptor } from './helper/auth.interceptor';
import {ErrorInterceptor} from "./helper/error.interceptor";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		// AdminModule,
		SharedModule,
		FormsModule,
	],
	exports: [
		AddIconModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
	],
	bootstrap: [AppComponent],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
})
export class AppModule { }
