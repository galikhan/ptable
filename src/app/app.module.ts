import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddIconModule } from './icon/add-icon/add-icon.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		// AddIconComponent
	],
	imports: [
		// CommonModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
	],
	exports: [
		AddIconModule,
	],
	providers: [],
	bootstrap: [AppComponent],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
})
export class AppModule { }
