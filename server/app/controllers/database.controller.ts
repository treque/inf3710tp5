import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import {Hotel} from "../../../common/tables/Hotel";
import {Room} from '../../../common/tables/Room';

import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/createSchema",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.createSchema().then((result: pg.QueryResult) => {
                        console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                });

        router.post("/populateDb",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.populateDb().then((result: pg.QueryResult) => {
                        console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
        });

        router.get("/hotel",
                   (req: Request, res: Response, next: NextFunction) => {
                    // Send the request to the service and send the response
                    this.databaseService.getHotels().then((result: pg.QueryResult) => {
                    const hotels: Hotel[] = result.rows.map((hot: any) => (
                        {
                        hotelno: hot.hotelno,
                        hotelname: hot.hotelname,
                        city: hot.city
                    }));
                    res.json(hotels);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get("/hotel/hotelNo",
                   (req: Request, res: Response, next: NextFunction) => {
                      this.databaseService.getHotelNo().then((result: pg.QueryResult) => {
                        const hotelPKs: string[] = result.rows.map((row: any) => row.hotelno);
                        res.json(hotelPKs);
                      }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                  });

        router.post("/animal/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                        const animId: string = req.body.animId;
                        const nom: string = req.body.nom;
                        const etat: string = req.body.etat;
                        const espece: string = req.body.espece;
                        const descr: string = req.body.descr;
                        const dateNaissance: string = req.body.dateNaissance;
                        const dateIns: string = req.body.dateIns;
                        const propId: string = req.body.propId;
                        const cliniqueId: string = req.body.cliniqueId;
                        this.databaseService.createAnimal(  animId, nom, etat, espece, descr,
                                                            dateNaissance, dateIns, propId, cliniqueId).then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        router.get("/rooms",
                   (req: Request, res: Response, next: NextFunction) => {

                    // this.databaseService.getRoomFromHotel(req.query.hotelNo, req.query.roomType, req.query.price)
                    this.databaseService.getRoomFromHotelParams(req.query)
                    .then((result: pg.QueryResult) => {
                        const rooms: Room[] = result.rows.map((room: Room) => (
                            {
                            hotelno: room.hotelno,
                            roomno: room.roomno,
                            typeroom: room.typeroom,
                            price: parseFloat(room.price.toString())
                        }));
                        res.json(rooms);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        router.post("/rooms/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                    const room: Room = {
                        hotelno: req.body.hotelno,
                        roomno: req.body.roomno,
                        typeroom: req.body.typeroom,
                        price: parseFloat(req.body.price)};
                    console.log(room);

                    this.databaseService.createRoom(room)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    })
                    .catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        router.get("/tables/:tableName",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getAllFromTable(req.params.tableName)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        return router;
    }
}
