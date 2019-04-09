import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
// import { Room } from "../../../common/tables/Room";
import {schema} from "../createSchema";
import {data} from "../populateDB";

@injectable()
export class DatabaseService {

    // A MODIFIER POUR VOTRE BD
    public connectionConfig: pg.ConnectionConfig = {
        user: "sysadmin",
        database: "vetosansfrontieres",
        password: "password",
        port: 5432,
        host: "127.0.0.1",
        keepAlive : true
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    /*

        METHODES DE DEBUG
    */
    public createSchema(): Promise<pg.QueryResult> {
        this.pool.connect();

        console.log(this.pool.query(schema));
        return this.pool.query(schema);
    }

    public populateDb(): Promise<pg.QueryResult> {
            this.pool.connect();

        return this.pool.query(data);
    }
/*
    public getAllFromTable(tableName: string): Promise<pg.QueryResult> {
        //this.pool.connect();

        return this.pool.query(`SELECT * FROM HOTELDB.${tableName};`);
    }

    // HOTEL
    public getHotels(): Promise<pg.QueryResult> {
        //this.pool.connect();

        return this.pool.query('SELECT * FROM HOTELDB.Hotel;');
    }

    public getHotelNo(): Promise<pg.QueryResult> {
        //this.pool.connect();

        return this.pool.query('SELECT hotelNo FROM HOTELDB.Hotel;');
    }

    public createHotel(hotelNo: string, hotelName: string, city: string): Promise<pg.QueryResult> {
        //this.pool.connect();
        const values: string[] = [
            hotelNo,
            hotelName,
            city
        ];
        const queryText: string = `INSERT INTO HOTELDB.Hotel VALUES($1, $2, $3);`;

        return this.pool.query(queryText, values);
    }
*/
    public createAnimal(animId: string, nom: string, etat: string, espece: string, descr: string,
        dateNaissance: string, dateIns: string, propId: string, cliniqueId: string): Promise<pg.QueryResult> {
        this.pool.connect();
        const values: string[] = [
            animId,
            nom,
            etat,
            espece,
            descr,
            dateNaissance,
            dateIns,
            propId,
            cliniqueId
        ];
        const queryText: string = 
        `INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

        return this.pool.query(queryText, values);
    }

    public getClinicPKs(): Promise<pg.QueryResult> {
        return this.pool.query('SELECT cliniqueId FROM VSF.Clinique;');
    }

    public deleteAnimalById(animId: string, propId: string, cliniqueId: string): Promise<pg.QueryResult> {
        const values: string[] = [
            animId,
            propId,
            cliniqueId,
        ];
        const queryText: string = 
        `DELETE FROM VSF.Animal WHERE animId = $1 AND propId = $2 AND cliniqueId = $3;`;

        return this.pool.query(queryText, values);
    }

    public getOwnerIdsByClinicId(clinicId: string): Promise<pg.QueryResult> {
        const values: string[] = [
            clinicId
        ];
        const queryText: string = 
        `SELECT propId FROM VSF.Proprietaire WHERE cliniqueId = $1;`;
        return this.pool.query(queryText, values);
    }

    public getAnimalIdsByOwnerClinicId(ownerId: string, clinicId: string): Promise<pg.QueryResult> {
        const values: string[] = [
            clinicId,
            ownerId
        ];
        const queryText: string = 
        `SELECT animId FROM VSF.Animal WHERE cliniqueId = $1 AND propId = $2;`;
        return this.pool.query(queryText, values);
    }
/*
    // ROOM
    public getRoomFromHotel(hotelNo: string, roomType: string, price: number): Promise<pg.QueryResult> {
        //this.pool.connect();

        let query: string =
        `SELECT * FROM HOTELDB.room
        WHERE hotelno=\'${hotelNo}\'`;
        if (roomType !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`typeroom=\'${roomType}\'`);
        }
        if (price !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`price =\'${price}\'`);
        }
        console.log(query);

        return this.pool.query(query);
    }

    public getRoomFromHotelParams(params: object): Promise<pg.QueryResult> {
        //this.pool.connect();

        let query: string = 'SELECT * FROM HOTELDB.room \n';
        const keys: string[] = Object.keys(params);
        if (keys.length > 0) {
            query = query.concat(`WHERE ${keys[0]} =\'${params[keys[0]]}\'`);
        }

        // On enleve le premier element
        keys.shift();

        // tslint:disable-next-line:forin
        for (const param in keys) {
            const value: string = keys[param];
            query = query.concat(`AND ${value} = \'${params[value]}\'`);
            if (param === 'price') {
                query = query.replace('\'', '');
            }
        }

        console.log(query);

        return this.pool.query(query);

    }

    public createRoom(room: Room): Promise<pg.QueryResult> {
        //this.pool.connect();
        const values: string[] = [
            room.roomno,
            room.hotelno,
            room.typeroom,
            room.price.toString()
        ];
        const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4);`;

        return this.pool.query(queryText, values);
    }

    // GUEST
    public createGuest(guestNo: string,
                       nas: string,
                       guestName: string,
                       gender: string,
                       guestCity: string): Promise<pg.QueryResult> {
        //this.pool.connect();
        const values: string[] = [
            guestNo,
            nas,
            guestName,
            gender,
            guestCity
        ];
        const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;

        return this.pool.query(queryText, values);
    }

    // BOOKING
    public createBooking(hotelNo: string,
                         guestNo: string,
                         dateFrom: Date,
                         dateTo: Date,
                         roomNo: string): Promise<pg.QueryResult> {
        //this.pool.connect();
        const values: string[] = [
            hotelNo,
            guestNo,
            dateFrom.toString(),
            dateTo.toString(),
            roomNo
        ];
        const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;

        return this.pool.query(queryText, values);
    }
    */
    // treatment of an animal
    public getTreatmentsById(animalId: string, ownerId: string, clinicId: string): Promise<pg.QueryResult> {
        const queryText: string = `SELECT typeId, qte, dateDebut, dateFin, VSF.TypeTraitement.descr,` +
                                  `cout as prix FROM VSF.Traitement INNER JOIN VSF.TypeTraitement USING(typeId)` +
                                  `INNER JOIN VSF.Animal USING(animId, propId, cliniqueId) WHERE animId = $1` +
                                  'AND propId = $2 AND cliniqueId = $3;';
        const values: string[] = [
            animalId,
            ownerId,
            clinicId
        ];

        return this.pool.query(queryText, values);
    }

    public getBillById(animalId: string, ownerId: string, clinicId: string): Promise<pg.QueryResult> {
        const queryText: string = `SELECT typeId, qte, VSF.TypeTraitement.descr, cout as prix, ` +
                                  `cout*qte as cout FROM VSF.Traitement INNER JOIN VSF.TypeTraitement USING(typeId)` +
                                  `INNER JOIN VSF.Animal USING(animId, propId, cliniqueId) WHERE animId = $1` +
                                  'AND propId = $2 AND cliniqueId = $3;';
        const values: string[] = [
            animalId,
            ownerId,
            clinicId
        ];

        return this.pool.query(queryText, values);
    }

    public getTotalBill(animalId: string, ownerId: string, clinicId: string): Promise<pg.QueryResult> {
        const queryText: string = `SELECT SUM(cout*qte) as total FROM VSF.Traitement INNER JOIN VSF.TypeTraitement USING(typeId)` +
                                  `INNER JOIN VSF.Animal USING(animId, propId, cliniqueId) WHERE animId = $1` +
                                  'AND propId = $2 AND cliniqueId = $3;';
        const values: string[] = [
            animalId,
            ownerId,
            clinicId
        ];

        return this.pool.query(queryText, values);
    }

    public getAnimalsByName(name: string): Promise<pg.QueryResult> {
        const queryText: string = `SELECT * FROM VSF.Animal WHERE lower(nom) LIKE $1;`;

        return this.pool.query(queryText, ['%' + name + '%']);
    }
}
