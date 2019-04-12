import { Component } from "@angular/core";
import { Total } from "../../../../common/tables/total";
import { Treatment } from "../../../../common/tables/treatment";
import { PaymentService } from "../services/payment.service";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent {

  public _selectedClinic: string;
  public _selectedOwner: string;
  public _selectedAnimal: string;
  public _clinicIds: string[];
  public _ownerIds: string[];
  public _animalIds: string[];
  public _isOwnersDisabled: boolean = true;
  public _isAnimalsDisabled: boolean = true;
  public _treatments: Treatment[];
  public _total: number;

  public constructor(private paymentService: PaymentService,
                     private communicationService: CommunicationService) {
    this._selectedClinic = "Choisir...";
    this._selectedOwner = "Choisir...";
    this._selectedAnimal = "Choisir...";

    this._treatments = [];
    this._total = 0;

    this.communicationService.getClinicPKs().subscribe((res: string[]) => {
      console.log(res);
      this._clinicIds = res;
    });
  }

  public getBill(animalId: string, ownerId: string, clinicId: string): void {
    this._treatments = [];
    this.paymentService.getBill(animalId, ownerId, clinicId).toPromise().then((res: Treatment[]) => {
      console.log(res);
      //this._treatments = res;

      for (const treatment of res) {
        this._treatments.push({typeid: treatment.typeid,
                               qte: treatment.qte,
                               datedebut: new Date(treatment.datedebut).toLocaleDateString(),
                               datefin: new Date(treatment.datefin).toLocaleDateString(),
                               descr: treatment.descr,
                               prix: treatment.prix,
                               cout: treatment.cout
                              });
      }
    });

    this.paymentService.getTotal(animalId, ownerId, clinicId).toPromise().then((res: Total[]) => {
      this._total = res[0].total;
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
