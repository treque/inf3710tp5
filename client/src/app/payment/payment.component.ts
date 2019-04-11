import { Component } from "@angular/core";
import { Total } from "../../../../common/tables/total";
import { Treatment } from "../../../../common/tables/treatment";
import { PaymentService } from "../services/payment.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent {

  public _selectedClinic: string;
  public _selectedOwner: string;
  public _selectedAnimal: string;
  public clinicIds: string[];
  public ownerIds: string[];
  public animalIds: string[];
  public _treatments: Treatment[];
  public _total: number;

  public constructor(private paymentService: PaymentService) {
    this._selectedClinic = "Choisir...";
    this._selectedOwner = "Choisir...";
    this._selectedAnimal = "Choisir...";

    this._treatments = [];
    this._total = 0;
  }

  public getBill(animalId: string, ownerId: string, clinicId: string): void {
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

}
