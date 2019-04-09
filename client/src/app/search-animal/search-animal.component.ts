import { Component } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { SearchAnimalService } from "../services/search-animal.service";

@Component({
  selector: "app-search-animal",
  templateUrl: "./search-animal.component.html",
  styleUrls: ["./search-animal.component.css"]
})
export class SearchAnimalComponent {

  private _animals: Animal[];

  public constructor(private searchAnimalService: SearchAnimalService) {
    this._animals = [];
  }

  public searchAnimal(name: string): void {
    console.log(name);
    this.searchAnimalService.searchAnimal(name).toPromise()
    .then((res: Animal[]) => {
      console.log(res);
      this._animals = [];
      for (const animal of res) {
        this._animals.push({    animid: animal.animid,
                                nom: animal.nom,
                                etat: animal.etat,
                                espece: animal.espece,
                                descr: animal.descr,
                                datenaissance: new Date(animal.datenaissance).toLocaleDateString(),
                                dateins: new Date(animal.dateins).toLocaleDateString(),
                                propid: animal.propid,
                                cliniqueid: animal.cliniqueid,
                              });
      }    });
  }

}
