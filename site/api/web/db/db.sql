/** Script de creación de la base de datos */
DROP TABLE IF EXISTS unc_249456.franja_horaria;
CREATE TABLE unc_249456.franja_horaria (
    id SERIAL NOT NULL,
    nombre varchar(20)  NOT NULL,
    CONSTRAINT franja_horaria_pk PRIMARY KEY (id)
);
--INSERTS
INSERT INTO unc_249456.franja_horaria (nombre)
VALUES ('9 a 12hs');

INSERT INTO unc_249456.franja_horaria (nombre)
VALUES ('13 a 17hs');