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

  private _treatments: Treatment[];
  private _total: number;

  public constructor(private paymentService: PaymentService) {
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