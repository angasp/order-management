import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { orderReducer } from './store/order.reducer';
import { OrderEffects } from './store/order.effects';
import { OrderService } from './services/order.service';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from './components/order.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ orders: orderReducer }),
    EffectsModule.forRoot([OrderEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    ReactiveFormsModule,
    OrderModule,
  ],
  providers: [OrderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
