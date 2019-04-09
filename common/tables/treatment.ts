/*export interface Treatment {
    "traitId": string;
    "examId": string;
    "animId": string;
    "propId": string;
    "cliniqueId": string;
    "typeId": string;
    "qte": string;
    "dateDebut": string;
    "dateFin": string;
}*/

export interface Treatment {
    typeid: string;
    qte: string;
    datedebut: string;
    datefin: string;
    descr: string;
    cout: number;
}