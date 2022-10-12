import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppliedFiltersBarComponent } from './components/applied-filters-bar/applied-filters-bar.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { FilterDateComponent } from './components/filter-date/filter-date.component';
import { FilterNumberComponent } from './components/filter-number/filter-number.component';
import { FilterReferenceComponent } from './components/filter-reference/filter-reference.component';
import { FilterTextComponent } from './components/filter-text/filter-text.component';
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    FilterBarComponent,
    FilterTextComponent,
    FilterDateComponent,
    FilterReferenceComponent,
    FilterNumberComponent,
    AppliedFiltersBarComponent,
    PlayerCardComponent,
    PlayerTableComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
