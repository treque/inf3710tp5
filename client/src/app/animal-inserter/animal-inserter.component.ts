import { Component } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-animal-inserter",
  templateUrl: "./animal-inserter.component.html",
  styleUrls: ["./animal-inserter.component.css"]
})
export class AnimalInserterComponent {
  model: NgbDateStruct;
  isDisabled = (date: NgbDate, current: {month: number}) => date.month !== current.month;
  isWeekend = (date: NgbDate) =>  this.calendar.getWeekday(date) >= 6;
  public clinicIds: string[];
  public ownerIds: string[];
  public isOwnersDisabled: boolean = true;
  public selectedClinic: string = "Choisir...";
  public duplicateError: boolean = false;
  public success: boolean = false;

  public constructor(private communicationService: CommunicationService, private calendar: NgbCalendar) { 
    this.communicationService.getClinicPKs().subscribe((res: string[]) => {
      this.clinicIds = res;
    });
  }

  public updateOwners(): void {
    this.isOwnersDisabled = false;
    this.getOwnerIdsByClinicId(this.selectedClinic);
  }

  private getOwnerIdsByClinicId(clinicId: string): void {
    this.communicationService.getOwnerIdsByClinicId(clinicId).subscribe((res: string[]) => {
      this.ownerIds = res;
    });
  }

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
    this.communicationService.insertAnimal(animal).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update");
            this.success = true;
            setTimeout(() => {location.reload();}, 3000);
        }
        this.duplicateError = (res === -1);
    });
  }

}
