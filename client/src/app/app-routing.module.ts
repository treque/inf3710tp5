import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HotelComponent } from "./hotel/hotel.component";
import { RoomComponent } from "./room/room.component";
import { TreatmentComponent } from "./treatment/treatment.component";
import { AnimalInserterComponent } from "./animal-inserter/animal-inserter.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "room", component: RoomComponent },
  { path: "hotel", component: HotelComponent },
  { path: "treatment", component: TreatmentComponent},
  { path: "animalInserter", component: AnimalInserterComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
