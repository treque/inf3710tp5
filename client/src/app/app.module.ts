import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AnimalInserterComponent } from "./animal-inserter/animal-inserter.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { HotelComponent } from "./hotel/hotel.component";
import { RoomComponent } from "./room/room.component";
import { SearchAnimalComponent } from "./search-animal/search-animal.component";
import { TreatmentComponent } from "./treatment/treatment.component";
@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    HotelComponent,
    AnimalInserterComponent,
    TreatmentComponent,
    SearchAnimalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],

})
export class AppModule { }
