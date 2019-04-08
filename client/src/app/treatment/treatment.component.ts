import { Component, OnInit } from "@angular/core";
import { Treatment } from "../../../../common/tables/treatment";
import { TreatmentService } from "../services/treatment.service";

@Component({
  selector: "app-treatment",
  templateUrl: "./treatment.component.html",
  styleUrls: ["./treatment.component.css"]
})
export class TreatmentComponent implements OnInit {

  private _treatments: Treatment[];

  public get treatment(): Treatment[] {
    return this._treatments;
  }

  public constructor(private treatmentService: TreatmentService) {
    this._treatments = [];
  }

  public ngOnInit(): void {
    // todo
  }

  public getTreatments(animalId: string, ownerId: string, clinicId: string): void {
    this.treatmentService.getTreatments(animalId, ownerId, clinicId).toPromise().then((res: Treatment[]) => {
      console.log(res);
      //this._treatments = res;

      for (const treatment of res) {
        this._treatments.push({typeid: treatment.typeid,
                               qte: treatment.qte,
                               datedebut: new Date(treatment.datedebut).toLocaleDateString(),
                               datefin: new Date(treatment.datefin).toLocaleDateString()
                              });
      }

      //console.log(this._treatments[0].datefin.toLocaleDateString());
    });
  }
}
