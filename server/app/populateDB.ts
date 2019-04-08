export const data: string = /*`SET search_path = hotelDB;

INSERT INTO HOTELDB.Hotel VALUES ('H111', 'Grosvenor Hotel', 'London');
INSERT INTO HOTELDB.Hotel VALUES ('H112', 'Kingston Hotel', 'Kingston');
INSERT INTO HOTELDB.Hotel VALUES ('H113', 'Hotel des pas perdus', 'Montreal');

INSERT INTO HOTELDB.Room VALUES ('1', 'H111', 'S', 72.00);
INSERT INTO HOTELDB.Room VALUES ('2', 'H111', 'S', 100.00);
INSERT INTO HOTELDB.Room VALUES ('3', 'H111', 'D', 200.00);
INSERT INTO HOTELDB.Room VALUES ('4', 'H111', 'D', 250.00);
INSERT INTO HOTELDB.Room VALUES ('1', 'H112', 'D', 450.00);
INSERT INTO HOTELDB.Room VALUES ('2', 'H112', 'D', 450.00);
INSERT INTO HOTELDB.Room VALUES ('3', 'H112', 'D', 450.00);

INSERT INTO HOTELDB.Guest (guestNo, nas, guestName, gender, guestCity) VALUES ('G111', '123', 'John Smith', 'M', 'London');
INSERT INTO HOTELDB.Guest (guestNo, nas, guestName, gender,  guestCity)VALUES ('G112', '213', 'Alex L', 'M', 'Kingston');
INSERT INTO HOTELDB.Guest (guestNo, nas, guestName, gender,  guestCity)VALUES ('G113', '233', 'Idris S',  'M', 'Montreal');
INSERT INTO HOTELDB.Guest (guestNo, nas, guestName, gender, guestCity) VALUES ('G114', '312', 'Guillaume D', 'M',  'Quebec');
INSERT INTO HOTELDB.Guest (guestNo, nas, guestName, gender, guestCity)VALUES ('G115', '122', 'Katrine S.',  'F', 'Kingston');
INSERT INTO HOTELDB.Guest (guestNo, nas, guestName, gender, guestCity)VALUES ('G116', '111', 'Simon D', 'M',  'Kingston');

INSERT INTO HOTELDB.Booking VALUES ('H111', 'G111', DATE'2019-04-01', DATE'2019-04-04', '1');
INSERT INTO HOTELDB.Booking VALUES ('H111', 'G114', DATE'2019-04-01', DATE'2019-04-05', '3');
INSERT INTO HOTELDB.Booking VALUES ('H111', 'G116', DATE'2019-04-03', DATE'2019-04-06', '4');
INSERT INTO HOTELDB.Booking (hotelNo, guestNo, dateFrom, roomNo) VALUES ('H112', 'G115', DATE'2019-05-03',  '1');

UPDATE HOTELDB.Guest set guestName = 'Alexandra L.' where guestNo='G112';
;`;*/
`
SET search_path = vetoSansFrontieres;

INSERT INTO VSF.Clinique (cliniqueId, nom, adr, telNo, faxNo) VALUES ('C1', 'Clinique du Soleil', '6768 boul. Saint Laurent, Montreal, Quebec, H2S 3C7', '5149961251', '5149971252');
INSERT INTO VSF.Clinique (cliniqueId, nom, adr, telNo, faxNo) VALUES ('C2', 'Clinique du Ciel', '3269 rue Fenelon, Montreal, Quebec, H2A 1M7', '5149998898', '5149998888');
INSERT INTO VSF.Clinique (cliniqueId, nom, adr, telNo, faxNo) VALUES ('C3', 'Clinique de la Lune', '1725 rue Jean Talon E, Montreal, Quebec, H2E 1T3', '5148820098', '5143749999');
INSERT INTO VSF.Clinique (cliniqueId, nom, adr, telNo, faxNo) VALUES ('C4', 'Clinique du mois de mars', '7725 rue Millet, Saint-Leonard, Quebec, H1S 2N3', '5148144799', '5142931347');

-- clinique 1
INSERT INTO VSF.Proprietaire (propId, nom, adr, telNo, cliniqueId) VALUES ('P1', 'Jean de La Riziere', '123 rue Mill, Repentigny, Quebec, J2E 1D9', '4509872934', 'C1');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A1', 'Boo', 'VIVANT', 'perruche', 'perruche bleue avec un developpement normal, mais un proprietaire soucieux et riche', '2000-01-01', '2018-01-20', 'P1', 'C1');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A2', 'Poo', 'VIVANT', 'perruche', 'perruche rouge avec un developpement normal, mais un proprietaire soucieux et riche', '2002-03-13', '2018-01-20', 'P1', 'C1');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A3', 'Coo', 'DECEDE', 'perruche', 'perruche naine jaune avec problemes respiratoires chroniques', '2002-03-14', '2018-01-20', 'P1', 'C1');

INSERT INTO VSF.Proprietaire (propId, nom, adr, telNo, cliniqueId) VALUES ('P2', 'Nama Tga', '384 av. Namaste, Bali, Somewhere, O2I 2P0', '4388287675', 'C1');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A1', 'Shibuya', 'VIVANT', 'chien', 'shiba aux ongles trop longs et trop durs', '2007-11-01', '2018-01-24', 'P2', 'C1');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A2', 'Guana', 'VIVANT', 'chien', 'jindo extremement difficile sur la nourriture. possiblement boulimique ', '2008-09-01', '2019-02-22', 'P2', 'C1');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A3', 'Mocha', 'VIVANT', 'chien', 'petit chien tremblottant et autrefois abuse', '2009-12-29', '2018-01-23', 'P2', 'C1');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A4', 'Samshik', 'VIVANT', 'chat', 'extremement obese. animal nocturne. a peur du soleil et des regards', '2011-10-31', '2015-04-21', 'P2', 'C1');

INSERT INTO VSF.Proprietaire (propId, nom, adr, telNo, cliniqueId) VALUES ('P3', 'Jeanine Tremblay', '123 rue Mill, Repentigny, Quebec, J2E 1D9', '4509872934', 'C1');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A1', 'Chocolat', 'VIVANT', 'chien', 'grogne et mord. rage infectieuse', '2012-12-20', '2018-04-09', 'P3', 'C1');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A2', 'Mocha', 'DECEDE', 'chat', 'chat avec tumeur record au cerveau', '1960-04-21', '1959-04-01', 'P3', 'C1');

INSERT INTO VSF.Proprietaire (propId, nom, adr, telNo, cliniqueId) VALUES ('P4', 'Jean Tremblay', '124 rue Mill, Repentigny, Quebec, J2E 1D9', '4509872935', 'C1');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A1', 'Bunny', 'VIVANT', 'perruche', 'attaque les objets verts', '2012-10-21', '2017-01-19', 'P4', 'C1');

-- clinique 2
-- liosa a un chat et un chien, chacun enregistres a deux cliniques differentes. elle fait partie des gens qui own un chien et un chat.
INSERT INTO VSF.Proprietaire (propId, nom, adr, telNo, cliniqueId) VALUES ('P1', 'Liosa Pedegrosa', '1343 boul. Chill, Moui, Ontario, P2A 2A9', '4509832934', 'C2');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A1', 'Liora', 'VIVANT', 'chien', 'developpement relativement normal, a des tendances de chat', '2018-10-10', '2019-01-29', 'P1', 'C2');

INSERT INTO VSF.Proprietaire (propId, nom, adr, telNo, cliniqueId) VALUES ('P2', 'Kiki de Montparnasse', '234 rue de la Dentelle, Paris, Province Parisienne, K2J 3L0', '0308887734', 'C2');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A1', 'Chili', 'VIVANT', 'chien', 'a des tendances de chat', '2018-10-27', '2019-07-28', 'P2', 'C2');

INSERT INTO VSF.Proprietaire (propId, nom, adr, telNo, cliniqueId) VALUES ('P3', 'Jean de La Riziere', '123 rue Mill, Repentigny, Quebec, J2E 1D9', '4509872934', 'C2');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A1', 'Boo', 'VIVANT', 'perruche', 'perruche bleue en sante. Jean est tres nerveux', '2000-01-01', '2018-01-20', 'P3', 'C2');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A2', 'Coo', 'DECEDE', 'perruche', 'perruche naine jaune; problemes respiratoires chroniques', '2002-03-14', '2018-01-20', 'P3', 'C2');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A3', 'Manitou', 'VIVANT', 'chien', 'bouvier bernois obese', '2005-02-14', '2019-01-04', 'P3', 'C2');

-- clinique 3
INSERT INTO VSF.Proprietaire (propId, nom, adr, telNo, cliniqueId) VALUES ('P1', 'Anca Banana', '2932 rue Grand Trunk, Verdun, Quebec, J2E 1D9', '4509872934', 'C3');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A1', 'Boo', 'VIVANT', 'chien', 'qi estime a 6. il ne sait pas courir ni sasseoir', '2018-10-27', '2019-07-28', 'P1', 'C3');

INSERT INTO VSF.Proprietaire (propId, nom, adr, telNo, cliniqueId) VALUES ('P2', 'Petit Grand', '49 rue St-Denis, Montreal, Quebec, K2A 9M8', '5148877373', 'C3');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A1', 'Bandit', 'VIVANT', 'raton-laveur', 'extrement obese, possession sans permis', '2015-10-19', '2016-01-24', 'P2', 'C3');

INSERT INTO VSF.Proprietaire (propId, nom, adr, telNo, cliniqueId) VALUES ('P3', 'Mona Mimosa', '99 rue Lotto, Montreal, Quebec, J2E 1D9', '4509872934', 'C3');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A1', 'Poona', 'VIVANT', 'chien', 'manque patte gauche avant, amputation maison', '2013-08-11', '2018-06-22', 'P3', 'C3');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A2', 'Samosa', 'VIVANT', 'chat', 'sent le cumin, cause inconnue', '2003-07-29', '2019-03-01', 'P3', 'C3');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A3', 'Amandine', 'VIVANT', 'chien', 'mangeuse chronique de chocolat', '2005-05-21', '1959-08-01', 'P3', 'C3');

INSERT INTO VSF.Proprietaire (propId, nom, adr, telNo, cliniqueId) VALUES ('P4', 'Madame Chatoya', '666 rue Poil, Montreal, Quebec, D8E 2U4', '4387162234', 'C3');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A1', 'Felina', 'VIVANT', 'chat', 'a un apparence humain en raison de ses fausses dents humaines', '2019-04-02', '2019-04-04', 'P4', 'C3');

INSERT INTO VSF.Proprietaire (propId, nom, adr, telNo, cliniqueId) VALUES ('P5', 'Fiona Dublayeur', '6766 rue des Balais, Montreal, Quebec, O2E 8W2', '5147639999', 'C3');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A1', 'Amandine', 'DECEDE', 'chat', 'chat ne anormalement obese', '2019-01-01', '2019-01-01', 'P5', 'C3');

-- clinique 4
INSERT INTO VSF.Proprietaire (propId, nom, adr, telNo, cliniqueId) VALUES ('P1', 'Liosa Pedegrosa', '1343 boul. Chill, Moui, Ontario, P2A 2A9', '4509832934', 'C4');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A1', 'Liona', 'VIVANT', 'chat', 'a des tendances feroces', '2019-01-01', '2019-02-03', 'P1', 'C4');
INSERT INTO VSF.Animal (animId, nom, etat, espece, descr, dateNaissance, dateIns, propId, cliniqueId) VALUES ('A2', 'Tiger', 'VIVANT', 'chat', 'bouge rarement', '2019-01-01', '2019-02-03', 'P1', 'C4');

-- employes

INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E2', '002', 'Ne-Yo Manilo', '112 av. Lafleur, Montreal, Quebec, 4I9 2U3', '5146666666', '2001-02-02', 'M', 'C1', 'ENTRETIEN', 17000);
INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E11', '011', 'Marco Locos', '1 rue Cafe, Montreal, Quebec, A1A 3B3', '5147777777', '1999-01-18', 'M', 'C1', 'SECRETAIRE', 22000);
INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E12', '012', 'Charlie Unger', '3 rue Moon, Montreal, Quebec, O0D 2J2', '5148888888', '2000-08-20', 'M', 'C2', 'ENTRETIEN', 18000);
INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E16', '016', 'Kiara Smith', '3 rue Tina, Montreal, Quebec, M0E 2J3', '5148888838', '1993-02-23', 'M', 'C2', 'PUBLICISTE', 98000);
INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E13', '013', 'Cathy Diem', '67 rue Hot-Dog, Montreal, Quebec, H8G 5U7', '5149999999', '1999-01-03', 'F', 'C3', 'SECRETAIRE', 20000);
INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E14', '014', 'Trang Dinh', '3 boul. de Neige, Montreal, Quebec, H8G 5E4', '5140000009', '1991-08-09', 'F', 'C4', 'STAGIAIRE', 0);
INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E15', '015', 'Ai Ling Jiang', '87 rue Tipi, Montreal, Quebec, J9K 5U8', '5141122222', '1996-02-17', 'F', 'C3', 'STAGIAIRE', 10000);


INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E3', '003', 'Beyonce Knowles', '45 rue de la Grange, Montreal, Quebec, O0P 2C7', '5142222222', '1993-11-27', 'F', 'C1', 'GESTIONNAIRE', 90000);
INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E4', '004', 'Jeffree Star', '134 rue Orange, Montreal, Quebec, F8J 6D6', '5142223343', '1997-12-31', 'M', 'C2', 'GESTIONNAIRE', 80000);
INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E5', '005', 'Kira La Souris', '5 rue Rouge, Montreal, Quebec, U9I 4K5', '5149993333', '1983-09-12', 'F','C3', 'GESTIONNAIRE', 70000);
INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E6', '006', 'My Nguyen', '23 rue Jaune, Montreal, Quebec, K50 2L1', '5144556678', '1977-10-19', 'F', 'C4', 'GESTIONNAIRE', 55000);

INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E7', '007', 'Annie Chen', '112 rue de la Monnaie, Montreal, Quebec, C9A 9E7', '5143334433', '1990-01-05', 'F', 'C1', 'VETERINAIRE', 105000);
INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E8', '008', 'Rui Tong', '2993 rue de la Mennais, Montreal, Quebec, U3A 4N9', '5141719800', '1980-10-20', 'M', 'C2', 'VETERINAIRE', 214000);
INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E9', '009', 'Candy Zheng', '1282 av. Kirkland, Montreal, Quebec, U3A 2K4', '4389102322', '1969-05-12', 'F', 'C3', 'VETERINAIRE', 310000);
INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E17', '010', 'Jean Tremblay', '999 rue leblanc, Montreal, Quebec, U3A 8O8', '5149824154', '1963-03-09', 'M', 'C4', 'VETERINAIRE', 100000);
INSERT INTO VSF.Employe (empId, nas, nom, adr, telNo, dateNaissance, sexe, cliniqueId, fonction, salaire) VALUES ('E10', '010', 'Andy Lau', '900 rue de la Tisane, Montreal, Quebec, U3A 1O8', '4509823144', '1963-02-09', 'M', 'C4', 'VETERINAIRE', 76000);

-- types de traitements offerts
INSERT INTO VSF.TypeTraitement (typeId, descr, cout) VALUES ('T000', 'Frais examen', 20);
INSERT INTO VSF.TypeTraitement (typeId, descr, cout) VALUES ('T110', 'Traitement a la Penicilline', 50);
INSERT INTO VSF.TypeTraitement (typeId, descr, cout) VALUES ('T112', 'Vaccination contre la grippe', 70);
INSERT INTO VSF.TypeTraitement (typeId, descr, cout) VALUES ('T113', 'Traitement a lhuile deucalyptus', 40);
INSERT INTO VSF.TypeTraitement (typeId, descr, cout) VALUES ('T114', 'Bain de lait de chevre', 100);
INSERT INTO VSF.TypeTraitement (typeId, descr, cout) VALUES ('T134', 'Brossage de dent (brosse a dent incluse)', 6);
INSERT INTO VSF.TypeTraitement (typeId, descr, cout) VALUES ('T115', 'Chirurgie Generale', 2000);
INSERT INTO VSF.TypeTraitement (typeId, descr, cout) VALUES ('T120', 'Traitement affectueux', 25);
INSERT INTO VSF.TypeTraitement (typeId, descr, cout) VALUES ('T116', 'Chimiotherapie Generale', 5000);
INSERT INTO VSF.TypeTraitement (typeId, descr, cout) VALUES ('T117', 'Abonnement au gym', 100);

-- Examens et traitements
-- DANS LA CLINIQUE 1
INSERT INTO VSF.Examen (examId, dateExam, heure, nomVet, descr, animId, propId, cliniqueId) VALUES ('X1', '2019-01-09', '13:00:00', 'Annie Chen', 'animal en manque daffection', 'A1', 'P1', 'C1');
INSERT INTO VSF.Traitement (traitId, examId, typeId, cliniqueId, animId, propId, qte, dateDebut, dateFin) VALUES ('TR1', 'X1', 'T120', 'C1', 'A1', 'P1', 1, '2019-01-09', '2019-01-10');
INSERT INTO VSF.Traitement (traitId, examId, typeId, cliniqueId, animId, propId, qte, dateDebut, dateFin) VALUES ('TR2', 'X1', 'T000', 'C1', 'A1', 'P1', 1, '2019-01-09', '2019-01-09');

-- faire un chien vaccine contre la gripppe ou le owner a un chat
INSERT INTO VSF.Examen (examId, dateExam, heure, nomVet, descr, animId, propId, cliniqueId) VALUES ('X2', '2019-01-12', '14:00:00', 'Annie Chen', 'se mouche avec du papier brun', 'A1', 'P3', 'C1');
INSERT INTO VSF.Traitement (traitId, examId, typeId, cliniqueId, animId, propId, qte, dateDebut, dateFin) VALUES ('TR1', 'X2', 'T112', 'C1', 'A1', 'P3', 1, '2019-04-10', '2019-04-20');
INSERT INTO VSF.Traitement (traitId, examId, typeId, cliniqueId, animId, propId, qte, dateDebut, dateFin) VALUES ('TR2', 'X2', 'T134', 'C1', 'A1', 'P3', 2, '2019-04-10', '2019-04-25');
INSERT INTO VSF.Traitement (traitId, examId, typeId, cliniqueId, animId, propId, qte, dateDebut, dateFin) VALUES ('TR3', 'X2', 'T000', 'C1', 'A1', 'P3', 1, '2019-01-12', '2019-01-12');


-- DANS LA CLINIQUE 2
INSERT INTO VSF.Examen (examId, dateExam, heure, nomVet, descr, animId, propId, cliniqueId) VALUES ('X1', '2019-01-10', '14:00:00', 'Rui Tong', 'souffre d''anemie', 'A1', 'P2', 'C2');
INSERT INTO VSF.Traitement (traitId, examId, typeId, cliniqueId, animId, propId, qte, dateDebut, dateFin) VALUES ('TR1', 'X1', 'T113', 'C2', 'A1', 'P2', 1, '2019-01-09', '2019-02-09');
INSERT INTO VSF.Traitement (traitId, examId, typeId, cliniqueId, animId, propId, qte, dateDebut, dateFin) VALUES ('TR2', 'X1', 'T114', 'C2', 'A1', 'P2', 3, '2019-01-29', '2019-02-28');
INSERT INTO VSF.Traitement (traitId, examId, typeId, cliniqueId, animId, propId, qte, dateDebut, dateFin) VALUES ('TR3', 'X1', 'T120', 'C2', 'A1', 'P2', 1, '2019-01-19', '2019-02-19');
INSERT INTO VSF.Traitement (traitId, examId, typeId, cliniqueId, animId, propId, qte, dateDebut, dateFin) VALUES ('TR4', 'X1', 'T000', 'C2', 'A1', 'P2', 1, '2019-01-10', '2019-01-10');

-- DANS LA CLINIQUE 3
INSERT INTO VSF.Examen (examId, dateExam, heure, nomVet, descr, animId, propId, cliniqueId) VALUES ('X1', '2019-01-11', '15:00:00', 'Candy Zheng', 'a consomme du chocolat mais en quantite minime', 'A1', 'P3', 'C3');
INSERT INTO VSF.Traitement (traitId, examId, typeId, cliniqueId, animId, propId, qte, dateDebut, dateFin) VALUES ('TR1', 'X1', 'T000', 'C3', 'A1', 'P3', 1, '2019-01-11', '2019-01-11');

-- DANS LA CLINIQUE 4
INSERT INTO VSF.Examen (examId, dateExam, heure, nomVet, descr, animId, propId, cliniqueId) VALUES ('X1', '2019-01-12', '14:00:00', 'Andy Lau', 'obsession aux savons', 'A1', 'P1', 'C4');
INSERT INTO VSF.Traitement (traitId, examId, typeId, cliniqueId, animId, propId, qte, dateDebut, dateFin) VALUES ('TR1', 'X1', 'T113', 'C4', 'A1', 'P1', 7, '2019-01-22', '2019-01-22');
INSERT INTO VSF.Traitement (traitId, examId, typeId, cliniqueId, animId, propId, qte, dateDebut, dateFin) VALUES ('TR2', 'X1', 'T000', 'C4', 'A1', 'P1', 1, '2019-01-12', '2019-01-12');

`;
