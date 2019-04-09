import { Component } from "@angular/core";
import { PaymentService } from "../services/payment.service";
import { Treatment } from "../../../../common/tables/treatment";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent {

  public constructor(private paymentService: PaymentService) { }

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
                               cout: treatment.cout
                              });
      }

      //console.log(this._treatments[0].datefin.toLocaleDateString());
    });
  }

}
