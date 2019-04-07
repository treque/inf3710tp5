import { Component, OnInit } from '@angular/core';
import { CommunicationService } from "./../communication.service";
import { Animal } from "../../../../common/tables/Animal";
@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent {

  public constructor(private communicationService: CommunicationService) { }

  public duplicateError: boolean = false;

  public insertAnimal(animId: string, nom: string, etat: string, espece: string, descr: string, dateNaissance: string, dateIns: string, propId: string, cliniqueId: string): void {
    const animal: Animal = {
      "animId": animId,
      "nom": nom,
      "etat": espece,
      "espece": espece,
      "descr": descr,
      "dateNaissance": dateNaissance,
      "dateIns": new Date().toLocaleDateString(),
      "propId": propId,
      "cliniqueId": cliniqueId,
    };
    this.communicationService.insertAnimal(animal).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update");
        }
        this.duplicateError = (res === -1);
    });
  }

}
