import { Component } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { SearchAnimalService } from "../services/search-animal.service";
import { Treatment } from "../../../../common/tables/treatment";
import { Exam } from "../../../../common/tables/exam";
import { TreatmentService } from "../services/treatment.service";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-search-animal",
  templateUrl: "./search-animal.component.html",
  styleUrls: ["./search-animal.component.css"]
})
export class SearchAnimalComponent {

  private _animals: Animal[];
  private _treatments: Treatment[];
  private _exams: Exam[];

  public constructor(private searchAnimalService: SearchAnimalService,
                     private treatmentService: TreatmentService,
                     private communicationService: CommunicationService) {
    this._animals = [];
    this._treatments = [];
    this._exams = [];
  }

  public searchAnimal(name: string): void {
    console.log(name);
    this.searchAnimalService.searchAnimal(name).toPromise()
    .then((res: Animal[]) => {
      console.log(res);
      this._animals = [];
      for (const animal of res) {
        this._animals.push({    animid: animal.animid,
                                nom: animal.nom,
                                etat: animal.etat,
                                espece: animal.espece,
                                descr: animal.descr,
                                datenaissance: new Date(animal.datenaissance).toLocaleDateString(),
                                dateins: new Date(animal.dateins).toLocaleDateString(),
                                propid: animal.propid,
                                cliniqueid: animal.cliniqueid,
                              });
      }
    });
  }

  public showInfo(animalId: string, ownerId: string, clinicId: string): void {
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
    });

    this.communicationService.getExamsById(animalId, ownerId, clinicId).toPromise().then((res: Exam[]) => {
      this._exams = [];
      for (const exam of res) {
        this._exams.push({examid: exam.examid,
                          dateexam: new Date(exam.dateexam).toLocaleDateString(),
                          heure: exam.heure,
                          nomvet: exam.nomvet,
                          descr: exam.descr});
      }

      console.log(this._exams);
    });
  // @ts-ignore
    document.getElementById("infos").style.display = "block";
  }
  
  public exit() {
    // @ts-ignore
    document.getElementById("infos").style.display = "none";
  }
}
