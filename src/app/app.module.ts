import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { LandingComponent } from './landing/landing.component';
import { LogoContainerComponent } from './logo-container/logo-container.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
  declarations: [AppComponent, GridComponent, LandingComponent, LogoContainerComponent, SideMenuComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
