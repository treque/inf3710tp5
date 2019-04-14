import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

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
                        console.log("Schéma créé");
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                });

        router.post("/populateDb",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.populateDb().then((result: pg.QueryResult) => {
                        console.log("DB populée");
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
        });

        router.post("/animal/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                        const animId: string = req.body.animid;
                        const nom: string = req.body.nom;
                        const etat: string = req.body.etat;
                        const espece: string = req.body.espece;
                        const descr: string = req.body.descr;
                        const dateNaissance: string = req.body.datenaissance;
                        const dateIns: string = req.body.dateins;
                        const propId: string = req.body.propid;
                        const cliniqueId: string = req.body.cliniqueid;
                        this.databaseService.createAnimal(  animId, nom, etat, espece, descr,
                                                            dateNaissance, dateIns, propId, cliniqueId).then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        router.post("/animal/update",
                    (req: Request, res: Response, next: NextFunction) => {
                        const animId: string = req.body.animid;
                        const nom: string = req.body.nom;
                        const etat: string = req.body.etat;
                        const espece: string = req.body.espece;
                        const descr: string = req.body.descr;
                        const dateNaissance: string = req.body.datenaissance;
                        const dateIns: string = req.body.dateins;
                        const propId: string = req.body.propid;
                        const cliniqueId: string = req.body.cliniqueid;
                        this.databaseService.updateAnimal(  animId, nom, etat, espece, descr,
                                                            dateNaissance, dateIns, propId, cliniqueId).then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        router.get("/clinic/clinicId",
                   (req: Request, res: Response, next: NextFunction) => {
           this.databaseService.getClinicPKs().then((result: pg.QueryResult) => {
             const clinicPKs: string[] = result.rows.map((row: any) => row.cliniqueid);
             res.json(clinicPKs);
           }).catch((e: Error) => {
             console.error(e.stack);
         });
       });

        router.delete("/animal/delete",
                      (req: Request, res: Response, next: NextFunction) => {
          this.databaseService.deleteAnimalById(req.query.animId, req.query.ownerId, req.query.clinicId).then((result: pg.QueryResult) => {
            res.json(result);
          }).catch((e: Error) => {
            console.error(e.stack);
        });
      });

        router.get("/animal/get",
                   (req: Request, res: Response, next: NextFunction) => {

                    this.databaseService.getAnimalById(req.query.animId, req.query.ownerId, req.query.clinicId)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rows[0]);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        router.get("/owner/findByClinic",
                   (req: Request, res: Response, next: NextFunction) => {
          this.databaseService.getOwnerIdsByClinicId(req.query.id).then((result: pg.QueryResult) => {
            const ownerIds: string[] = result.rows.map((row: any) => row.propid)
            res.json(ownerIds);
          }).catch((e: Error) => {
            console.error(e.stack);
        });
      });

        router.get("/animal/findByOwnerClinic",
                   (req: Request, res: Response, next: NextFunction) => {
         this.databaseService.getAnimalIdsByOwnerClinicId(req.query.ownerId, req.query.clinicId).then((result: pg.QueryResult) => {
            const animalIds: string[] = result.rows.map((row: any) => row.animid);
            res.json(animalIds);
         }).catch((e: Error) => {
           console.error(e.stack);
       });
     });

        router.post("/treatment", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getTreatmentsById(req.body.animId, req.body.ownerId, req.body.clinicId)
            .then((result: pg.QueryResult) => {
                res.json(result.rows);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.post("/animal/search", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getAnimalsByName(req.body[0])
            .then((result: pg.QueryResult) => {
                res.json(result.rows);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.post("/payment/bill", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getBillById(req.body.animId, req.body.ownerId, req.body.clinicId)
            .then((result: pg.QueryResult) => {
                res.json(result.rows);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.post("/payment/total", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getTotalBill(req.body.animId, req.body.ownerId, req.body.clinicId)
            .then((result: pg.QueryResult) => {
                res.json(result.rows);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.post("/exam", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getExams(req.body.animId, req.body.ownerId, req.body.clinicId)
            .then((result: pg.QueryResult) => {
                res.json(result.rows);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });
        return router;
    }
}
