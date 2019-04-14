import { Component, OnInit } from "@angular/core";
import { Treatment } from "../../../../common/tables/treatment";
import { TreatmentService } from "../services/treatment.service";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-treatment",
  templateUrl: "./treatment.component.html",
  styleUrls: ["./treatment.component.css"]
})
export class TreatmentComponent implements OnInit {

  public _selectedClinic: string;
  public _selectedOwner: string;
  public _selectedAnimal: string;
  public _clinicIds: string[];
  public _ownerIds: string[];
  public _animalIds: string[];
  public _isOwnersDisabled: boolean = true;
  public _isAnimalsDisabled: boolean = true;
  private _treatments: Treatment[];
  public _noResults: boolean = false;

  public get treatment(): Treatment[] {
    return this._treatments;
  }

  public constructor(private treatmentService: TreatmentService,
                     private communicationService: CommunicationService) {
    this._treatments = [];
    this.communicationService.getClinicPKs().subscribe((res: string[]) => {
      console.log(res);
      this._clinicIds = res;
    });
  }

  public ngOnInit(): void {
    // todo
  }

  public getTreatments(animalId: string, ownerId: string, clinicId: string): void {
    this._treatments = [];
    this.treatmentService.getTreatments(animalId, ownerId, clinicId).toPromise().then((res: Treatment[]) => {
      for (const treatment of res) {
        this._treatments.push({typeid: treatment.typeid,
                               qte: treatment.qte,
                               datedebut: new Date(treatment.datedebut).toLocaleDateString(),
                               datefin: new Date(treatment.datefin).toLocaleDateString(),
                               descr: treatment.descr,
                               cout: treatment.cout
                              });
      }
      this._noResults = this._treatments.length === 0 ? true : false;
    });
  }

  public updateOwners(): void {
    this._isOwnersDisabled = false;
    this.getOwnerIdsByClinicId(this._selectedClinic);
  }

  private getOwnerIdsByClinicId(clinicId: string): void {
    this.communicationService.getOwnerIdsByClinicId(clinicId).subscribe((res: string[]) => {
      this._ownerIds = res;
    });
  }

  public updateAnimals(): void {
    this._isAnimalsDisabled = false;
    this.getAnimalIdsByOwnerClinicId(this._selectedOwner, this._selectedClinic);
  }

  private getAnimalIdsByOwnerClinicId(ownerId: string, clinicId: string): void {
    this.communicationService.getAnimalIdsByOwnerClinicId(ownerId, clinicId).subscribe((res: string[]) => {
      this._animalIds = res;
    });
  }
}
