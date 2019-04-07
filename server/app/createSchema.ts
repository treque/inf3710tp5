/*export const schema: string = `
SET search_path = hotelDB;

DROP SCHEMA IF EXISTS HOTELDB CASCADE;
CREATE SCHEMA HOTELDB;

CREATE TABLE IF NOT EXISTS  HOTELDB.Hotel (
		hotelNo		VARCHAR(10)		NOT NULL,
		hotelName 	VARCHAR(20)		NOT NULL,
		city		VARCHAR(50)		NOT NULL,
		PRIMARY KEY (hotelNo));

CREATE TABLE IF NOT EXISTS HOTELDB.Room(
roomNo VARCHAR(10) NOT NULL,
hotelNo VARCHAR(10)	NOT NULL,
typeroom VARCHAR(10)	NOT NULL,
price NUMERIC(6,3) NOT NULL,
PRIMARY KEY (roomNo, hotelNo),
FOREIGN KEY(hotelNo) REFERENCES HOTELDB.Hotel(hotelNo) ON DELETE RESTRICT ON UPDATE CASCADE);


CREATE DOMAIN HOTELDB.sexType AS CHAR
	CHECK (VALUE IN ('M', 'F'));

CREATE TABLE IF NOT EXISTS HOTELDB.Guest(
guestNo		VARCHAR(10)		NOT NULL,
nas		VARCHAR(10)		UNIQUE NOT NULL,
guestName 	VARCHAR(20)		NOT NULL,
gender		sexType			DEFAULT 'M',
guestCity	VARCHAR(50)		NOT NULL,
PRIMARY KEY (guestNo));

CREATE TABLE IF NOT EXISTS HOTELDB.Booking(
		hotelNo		VARCHAR(10)		NOT NULL,
		guestNo	  	VARCHAR(10)		NOT NULL,
		dateFrom 	DATE			NOT NULL,
		dateTo		DATE			NULL,
		roomNo		VARCHAR(10)		NOT NULL,
		PRIMARY KEY (hotelNo, guestNo, roomNO, dateFrom),
		FOREIGN KEY (guestNo) REFERENCES HOTELDB.Guest(guestNo)
		ON DELETE SET NULL ON UPDATE CASCADE,
		FOREIGN KEY (hotelNo, roomNo) REFERENCES HOTELDB.Room (hotelNo, roomNo)
		ON DELETE NO ACTION ON UPDATE CASCADE,
		CONSTRAINT date CHECK (dateTo >= dateFrom),
		CONSTRAINT dateFrom CHECK (dateFrom >= current_date));

ALTER TABLE HOTELDB.Guest ALTER gender DROP DEFAULT;
`;
*/

export const schema: string = `
SET search_path = vetoSansFrontieres;

DROP SCHEMA IF EXISTS VSF CASCADE;
CREATE SCHEMA VSF;

CREATE DOMAIN VSF.Etat AS CHAR(6)
	CHECK (VALUE IN ('VIVANT', 'DECEDE'));

CREATE DOMAIN VSF.Sexe AS CHAR
	CHECK (VALUE IN ('M', 'F'));

CREATE DOMAIN VSF.Fonction AS VARCHAR(12)
	CHECK (VALUE IN ('GESTIONNAIRE', 'VETERINAIRE', 'INFIRMIERE', 'SECRETAIRE', 'ENTRETIEN', 'STAGIAIRE', 'PUBLICISTE'));

CREATE TABLE IF NOT EXISTS VSF.Clinique (
    cliniqueId  VARCHAR(30) NOT NULL UNIQUE,
    nom         VARCHAR(30) NOT NULL,
    adr         VARCHAR(60) NOT NULL,
    telNo       BIGINT     NOT NULL,
    faxNo       BIGINT     NOT NULL,
    PRIMARY KEY(cliniqueId)
);

CREATE TABLE IF NOT EXISTS VSF.Proprietaire (
    propId      VARCHAR(30) NOT NULL,
    cliniqueId  VARCHAR(30) NOT NULL,
    nom         VARCHAR(30) NOT NULL,
    adr         VARCHAR(60) NOT NULL,
    telNo       BIGINT     NOT NULL,
    PRIMARY KEY(propId, cliniqueId),
    FOREIGN KEY (cliniqueId) REFERENCES VSF.Clinique(cliniqueId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS VSF.Animal (
    animId          VARCHAR(30) NOT NULL,
    nom             VARCHAR(30) NOT NULL,
    etat            VSF.Etat    DEFAULT 'VIVANT',
    espece          VARCHAR(30) NOT NULL,
    descr           VARCHAR(99) NOT NULL,
    dateNaissance   DATE        NOT NULL,
    dateIns         DATE        NOT NULL,
    propId          VARCHAR(30) NOT NULL,
    cliniqueId      VARCHAR(30) NOT NULL,
    PRIMARY KEY(animId, propId, cliniqueId),
    FOREIGN KEY (propId, cliniqueId) REFERENCES VSF.Proprietaire(propId, cliniqueId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS VSF.Examen (
    examId          VARCHAR(30) NOT NULL,
    dateExam        DATE        NOT NULL,
    heure           TIME        NOT NULL,
    nomVet          VARCHAR(30) NOT NULL, -- fct pr verifier si c bien un vet ( check vsf.checkVet() par ex) https://stackoverflow.com/questions/3880698/can-a-check-constraint-relate-to-another-table
    animId          VARCHAR(30) NOT NULL,
    propId          VARCHAR(30) NOT NULL,
    cliniqueId      VARCHAR(30) NOT NULL,
    descr           VARCHAR(99) NOT NULL,
    PRIMARY KEY(examId, animId, propId, cliniqueId),
    FOREIGN KEY (animId, propId, cliniqueId) REFERENCES VSF.Animal(animId, propId, cliniqueId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS VSF.Employe (
    empId           VARCHAR(30)     NOT NULL,
    nas             VARCHAR(30)     NOT NULL,
    nom             VARCHAR(30)     NOT NULL,
    adr             VARCHAR(60)     NOT NULL,
    telNo           BIGINT         NOT NULL,
    dateNaissance   DATE            NOT NULL,
    sexe            VSF.sexe        DEFAULT 'M',
    cliniqueId      VARCHAR(30)     NOT NULL,
    fonction        VSF.Fonction    NOT NULL,
    salaire         NUMERIC(8,2)    NOT NULL,
    PRIMARY KEY(empId),
    FOREIGN KEY (cliniqueId) REFERENCES VSF.Clinique(cliniqueId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS VSF.TypeTraitement (
    typeId      VARCHAR(30)  NOT NULL UNIQUE,
    descr       VARCHAR(99)  NOT NULL,
    cout        NUMERIC(7,2) NOT NULL,
    PRIMARY KEY(typeId)
);

CREATE TABLE IF NOT EXISTS VSF.Traitement (
    traitId     VARCHAR(30)  NOT NULL,
    examId      VARCHAR(30)  NOT NULL,
    animId      VARCHAR(30)  NOT NULL,
    propId      VARCHAR(30)  NOT NULL,
    cliniqueId  VARCHAR(30)  NOT NULL,
    typeId      VARCHAR(20)  NOT NULL,
    qte         BIGINT       NOT NULL,
    dateDebut   DATE         NOT NULL,
    dateFin     DATE         NOT NULL,
    PRIMARY KEY(traitId, examId, animId, propId, cliniqueId),
    FOREIGN KEY (examId, animId, propId, cliniqueId) REFERENCES VSF.Examen(examId, animId, propId,cliniqueId) ON DELETE CASCADE,
    FOREIGN KEY (typeId) REFERENCES VSF.TypeTraitement(typeId) ON DELETE CASCADE
);
`;
