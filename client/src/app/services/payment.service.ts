import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Treatment } from "../../../../common/tables/Treatment";

@Injectable({
  providedIn: "root"
})
export class PaymentService {

  private readonly BASE_URL: string = "http://localhost:3000/database";

  public constructor(private http: HttpClient) { }

  public getBill(animalId: string, ownerId: string, clinicId: string): Observable<Treatment[]> {
    return this.http.post<Treatment[]>(this.BASE_URL + "/payment/bill", {animId: animalId, ownerId: ownerId, clinicId: clinicId}).pipe(
        catchError(this.handleError<Treatment[]>("")),
    );
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

      return (error: Error): Observable<T> => {
          return of(result as T);
      };
  }}
