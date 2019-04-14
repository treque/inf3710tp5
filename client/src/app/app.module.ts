import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AnimalInserterComponent } from "./animal-inserter/animal-inserter.component";
import { AnimalUpdaterComponent } from "./animal-updater/animal-updater.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { SearchAnimalComponent } from "./search-animal/search-animal.component";
import { TreatmentComponent } from "./treatment/treatment.component";
import { PaymentComponent } from './payment/payment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AnimalInserterComponent,
    TreatmentComponent,
    SearchAnimalComponent,
    AnimalUpdaterComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],

})
export class AppModule { }
