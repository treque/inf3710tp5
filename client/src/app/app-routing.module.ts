import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AnimalInserterComponent } from "./animal-inserter/animal-inserter.component";
import { AnimalUpdaterComponent } from "./animal-updater/animal-updater.component";
import { AppComponent } from "./app.component";
import { PaymentComponent } from "./payment/payment.component";
import { SearchAnimalComponent } from "./search-animal/search-animal.component";
import { TreatmentComponent } from "./treatment/treatment.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "treatment", component: TreatmentComponent},
  { path: "animalInserter", component: AnimalInserterComponent},
  { path: "search", component: SearchAnimalComponent},
  { path: "animalUpdater", component: AnimalUpdaterComponent},
  { path: "payment", component: PaymentComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
