import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Animal } from "../../../../common/tables/Animal";

@Injectable({
  providedIn: "root"
})
export class SearchAnimalService {
  private readonly BASE_URL: string = "http://localhost:3000/database";

  public constructor(private http: HttpClient) { }

  public searchAnimal(name: string): Observable<Animal[]> {
    return this.http.post<Animal[]>(this.BASE_URL + "/animal/search", name).pipe(
        catchError(this.handleError<Animal[]>("")),
    );
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

      return (error: Error): Observable<T> => {
          return of(result as T);
      };
  }
}
