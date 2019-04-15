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
    nomVet          VARCHAR(30) NOT NULL,
    animId          VARCHAR(30) NOT NULL,
    propId          VARCHAR(30) NOT NULL,
    cliniqueId      VARCHAR(30) NOT NULL,
    descr           VARCHAR(99) NOT NULL,
    PRIMARY KEY(examId, animId, propId, cliniqueId),
    FOREIGN KEY (animId, propId, cliniqueId) REFERENCES VSF.Animal(animId, propId, cliniqueId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS VSF.Employe (
    empId           VARCHAR(30)     NOT NULL UNIQUE,
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
