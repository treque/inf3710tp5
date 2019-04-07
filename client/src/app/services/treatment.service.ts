import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TreatmentService {

  private readonly BASE_URL: string = "http://localhost:3000/database";

  public constructor(private http: HttpClient) { }

  public getTreatment(animalId: string, ownerId: string, clinicId: string): Observable<string[]> {
    return this.http.post<string[]>(this.BASE_URL + "/treatment", {animId: animalId, ownerId: ownerId, clinicId: clinicId}).pipe(
        catchError(this.handleError<string[]>("getHotelPKs")),
    );
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

      return (error: Error): Observable<T> => {
          return of(result as T);
      };
  }
}
