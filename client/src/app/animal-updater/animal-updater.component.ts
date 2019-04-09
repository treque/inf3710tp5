import { Component } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-animal-updater",
  templateUrl: "./animal-updater.component.html",
  styleUrls: ["./animal-updater.component.css"]
})
export class AnimalUpdaterComponent {

  public clinicIds: string[];
  public ownerIds: string[];
  public animalIds: string[];
  public duplicateError: boolean = false;

  public constructor(private communicationService: CommunicationService){
    this.communicationService.getClinicPKs().subscribe((res: string[]) => {
      this.clinicIds = res;
    });
    console.log(this.getOwnerIdsByClinicId("C4"));
    console.log(this.getAnimalIdsByOwnerClinicId("P1", "C1"));
    console.log(this.deleteAnimalById("A2", "P1", "C1"));
  }

  private getOwnerIdsByClinicId(clinicId: string): void {
    this.communicationService.getOwnerIdsByClinicId(clinicId).subscribe((res: string[]) => {
      return res;
    });
  }

  private getAnimalIdsByOwnerClinicId(ownerId: string, clinicId: string): void {
    this.communicationService.getAnimalIdsByOwnerClinicId(ownerId, clinicId).subscribe((res: string[]) => {
      return res;
    });
  }

  private deleteAnimalById(animalId: string, ownerId: string, clinicId: string): void {
    this.communicationService.deleteAnimalById(animalId, ownerId, clinicId).subscribe((res: any) => {
      return res;
    })
  }

  public updateAnimal(animId: string,
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
      "dateins": dateNaissance,
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
