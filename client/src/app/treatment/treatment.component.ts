import { Component, OnInit } from "@angular/core";
import { TreatmentService } from "../services/treatment.service";

@Component({
  selector: "app-treatment",
  templateUrl: "./treatment.component.html",
  styleUrls: ["./treatment.component.css"]
})
export class TreatmentComponent implements OnInit {

  public constructor(private treatmentService: TreatmentService) { }

  public ngOnInit(): void {
    // todo
  }

  public getTreatment(animalId: string, ownerId: string, clinicId: string): void {
    this.treatmentService.getTreatment(animalId, ownerId, clinicId).toPromise().then((res: string[]) => {
      console.log(res);
    });
  }
}
