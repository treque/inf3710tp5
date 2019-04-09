import { Component } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-animal-inserter",
  templateUrl: "./animal-inserter.component.html",
  styleUrls: ["./animal-inserter.component.css"]
})
export class AnimalInserterComponent {

  public constructor(private communicationService: CommunicationService) { }

  public duplicateError: boolean = false;

  private getCurrentFormattedDate(): string {
    let today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return year + '-' + month + '-' + day;
  }
  public insertAnimal(animId: string,
                      nom: string,
                      etat: string,
                      espece: string,
                      descr: string,
                      dateNaissance: string,
                      propId: string,
                      cliniqueId: string): void {
    const animal: Animal = {
      "animid": animId,
      "nom": nom,
      "etat": etat,
      "espece": espece,
      "descr": descr,
      "datenaissance": dateNaissance,
      "dateins": this.getCurrentFormattedDate(),
      "propid": propId,
      "cliniqueid": cliniqueId,
    };
    console.log(animal);
    this.communicationService.insertAnimal(animal).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update");
        }
        this.duplicateError = (res === -1);
    });
  }

}
