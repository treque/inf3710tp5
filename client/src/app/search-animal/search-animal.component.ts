import { Component } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { SearchAnimalService } from "../services/search-animal.service";

@Component({
  selector: "app-search-animal",
  templateUrl: "./search-animal.component.html",
  styleUrls: ["./search-animal.component.css"]
})
export class SearchAnimalComponent {

  public constructor(private searchAnimalService: SearchAnimalService) {}

  public searchAnimal(name: string): void {
    this.searchAnimalService.searchAnimal(name).toPromise()
    .then((res: Animal[]) => {
      console.log(res);
    });
  }

}
