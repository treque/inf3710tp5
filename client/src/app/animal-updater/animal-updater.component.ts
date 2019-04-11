import { Component, ViewChild, ElementRef } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-animal-updater",
  templateUrl: "./animal-updater.component.html",
  styleUrls: ["./animal-updater.component.css"]
})
export class AnimalUpdaterComponent {
  model: NgbDateStruct;
  isDisabled = (date: NgbDate, current: {month: number}) => date.month !== current.month;
  isWeekend = (date: NgbDate) =>  this.calendar.getWeekday(date) >= 6;

  @ViewChild("nom") nameField: ElementRef;
  @ViewChild("espece") typeField: ElementRef;
  @ViewChild("etat") stateField: ElementRef;
  @ViewChild("desc") descField: ElementRef;
  @ViewChild("ddn") dobField: ElementRef;
  @ViewChild("di") regDateField: ElementRef;
  public clinicIds: string[];
  public ownerIds: string[];
  public animalIds: string[];
  public duplicateError: boolean = false;
  public selectedClinic: string = "Choisir...";
  public selectedOwner: string = "Choisir...";
  public selectedAnimal: string = "Choisir...";
  public isOwnersDisabled: boolean = true;
  public isAnimalsDisabled: boolean = true;

  public constructor(private communicationService: CommunicationService, private calendar: NgbCalendar){
    this.communicationService.getClinicPKs().subscribe((res: string[]) => {
      this.clinicIds = res;
    });
  }

  private resetFields(): void {
    this.nameField.nativeElement.value = "";
    this.typeField.nativeElement.value = "";
    this.stateField.nativeElement.value = "";
    this.descField.nativeElement.value = "";
    this.dobField.nativeElement.value = "";
    this.regDateField.nativeElement.value = "";
  }

  public updateOwners(): void {
    this.isOwnersDisabled = false;
    this.resetFields();
    this.getOwnerIdsByClinicId(this.selectedClinic);
  }

  public updateAnimals(): void {
    this.isAnimalsDisabled = false;
    this.resetFields();
    this.getAnimalIdsByOwnerClinicId(this.selectedOwner, this.selectedClinic);
  }

  public updateFields(): void {
    this.getAnimalAndUpdate(this.selectedAnimal, this.selectedOwner, this.selectedClinic);
  }

  public updateAnimal(name: string, specie: string, state: string, desc: string, dob: string, regDate: string): void {
    const animal: Animal = {
      "animid": this.selectedAnimal,
      "nom": name,
      "etat": state,
      "espece": specie,
      "descr": desc,
      "datenaissance": dob,
      "dateins": regDate,
      "propid": this.selectedOwner,
      "cliniqueid": this.selectedClinic,
    };
    console.log(animal);
    this.communicationService.updateAnimal(animal).subscribe((res: number) => {
      console.log(res);
    });
    location.reload();
  }

  private getAnimalAndUpdate(animId: string, ownerId: string, clinicId: string): void {
    this.communicationService.getAnimalById(animId, ownerId, clinicId).subscribe((res: Animal) => {
      this.nameField.nativeElement.value = res.nom;
      this.typeField.nativeElement.value = res.espece;
      this.stateField.nativeElement.value = res.etat;
      this.descField.nativeElement.value = res.descr;
      this.dobField.nativeElement.value = res.datenaissance.substring(0,10);
      this.regDateField.nativeElement.value = res.dateins.substring(0,10);
    });
  }

  private getOwnerIdsByClinicId(clinicId: string): void {
    this.communicationService.getOwnerIdsByClinicId(clinicId).subscribe((res: string[]) => {
      this.ownerIds = res;
    });
  }

  private getAnimalIdsByOwnerClinicId(ownerId: string, clinicId: string): void {
    this.communicationService.getAnimalIdsByOwnerClinicId(ownerId, clinicId).subscribe((res: string[]) => {
      this.animalIds = res;
    });
  }

  public deleteAnimalById(animalId: string, ownerId: string, clinicId: string): void {
    this.communicationService.deleteAnimalById(animalId, ownerId, clinicId).subscribe((res: any) => {
      return res;
    })
    location.reload();
  }

}
