import { Component, OnInit } from "@angular/core";
import { Treatment } from "../../../../common/tables/treatment";
import { TreatmentService } from "../services/treatment.service";

@Component({
  selector: "app-treatment",
  templateUrl: "./treatment.component.html",
  styleUrls: ["./treatment.component.css"]
})
export class TreatmentComponent implements OnInit {

  private treatments: Treatment[];

  public constructor(private treatmentService: TreatmentService) {
    this.treatments = [];
  }

  public ngOnInit(): void {
    // todo
  }

  public getTreatments(animalId: string, ownerId: string, clinicId: string): void {
    this.treatmentService.getTreatments(animalId, ownerId, clinicId).toPromise().then((res: Treatment[]) => {
      console.log(res);
      this.treatments = res;
    });
  }
}
