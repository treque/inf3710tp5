import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, concat, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Animal } from "../../../common/tables/Animal";
import { Exam } from "../../../common/tables/exam";

@Injectable()
export class CommunicationService {

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor(private http: HttpClient) { }

    private _listners: any = new Subject<any>();

    public listen(): Observable<any> {
       return this._listners.asObservable();
    }

    public filter(filterBy: string): void {
       this._listners.next(filterBy);
    }

    public getExamsById(animalId: string, ownerId: string, clinicId: string): Observable<Exam[]> {
        return this.http.post<Exam[]>(this.BASE_URL + "/exam", {animId: animalId, ownerId: ownerId, clinicId: clinicId}).pipe(
            catchError(this.handleError<Exam[]>("getExamsById")),
        );
    }

    public getOwnerIdsByClinicId(clinicId: string): Observable<string[]> {
        return this.http.get<string[]>(this.BASE_URL + "/owner/findByClinic" + "?id=" + clinicId).pipe(
            catchError(this.handleError<string[]>("getOwnerIdsByClinicId")),
        );
    }

    public getAnimalIdsByOwnerClinicId(ownerId: string, clinicId: string): Observable<string[]> {
        return this.http.get<string[]>(this.BASE_URL + "/animal/findByOwnerClinic" + "?clinicId=" + clinicId +"&ownerId=" + ownerId ).pipe(
            catchError(this.handleError<string[]>("getAnimalIdsByOwnerClinicId")),
        );
    }

    public insertAnimal(animal: Animal): Observable<number> {

        return this.http.post<number>(this.BASE_URL + "/animal/insert", animal).pipe(
            catchError(this.handleError<number>("insertAnimal")),
        );
    }

    public getClinicPKs(): Observable<string[]> {

        return this.http.get<string[]>(this.BASE_URL + "/clinic/clinicId").pipe(
            catchError(this.handleError<string[]>("getAnimalPKs")),
        );
    }

    public getAnimalById(animId: string, ownerId: string, clinicId: string): Observable<Animal> {
        return this.http.get<Animal>(this.BASE_URL + "/animal/get" + "?animId=" + animId + "&ownerId=" + ownerId + "&clinicId=" + clinicId).pipe(
            catchError(this.handleError<Animal>("getAnimalById")),
        );
    }

    public insertHotel(hotel: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/hotel/insert", hotel).pipe(
            catchError(this.handleError<number>("inserHotel")),
        );
    }

    public deleteAnimalById(animalId: string, ownerId: string, clinicId: string): Observable<number> {
        return this.http.delete<number>(this.BASE_URL + "/animal/delete" + "?animId=" + animalId + "&ownerId=" + ownerId + "&clinicId=" + clinicId).pipe(
            catchError(this.handleError<number>("deleteAnimalById")),
        );
    }

    public updateAnimal(animal: Animal){
        return this.http.post<number>(this.BASE_URL + "/animal/update", animal).pipe(
            catchError(this.handleError<number>("updateAnimal")),
        );
    }

    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                      this.http.post<any>(this.BASE_URL + "/populateDb", []));
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
