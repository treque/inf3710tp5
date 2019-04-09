import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AnimalInserterComponent } from "./animal-inserter/animal-inserter.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { HotelComponent } from "./hotel/hotel.component";
import { RoomComponent } from "./room/room.component";
import { TreatmentComponent } from "./treatment/treatment.component";
import { AnimalUpdaterComponent } from './animal-updater/animal-updater.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    HotelComponent,
    AnimalInserterComponent,
    TreatmentComponent,
    AnimalUpdaterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],

})
export class AppModule { }
