/** Script de creación de la base de datos */
DROP TABLE IF EXISTS unc_249456.aviso_retiro;
DROP TABLE IF EXISTS unc_249456.franja_horaria;
CREATE TABLE unc_249456.franja_horaria (
    id SERIAL NOT NULL,
    nombre varchar(20)  NOT NULL,
    CONSTRAINT franja_horaria_pk PRIMARY KEY (id)
);
--INSERTS
INSERT INTO unc_249456.franja_horaria (nombre) VALUES ('9 a 12hs');
INSERT INTO unc_249456.franja_horaria (nombre) VALUES ('13 a 17hs');

DROP TABLE IF EXISTS unc_249456.volumen_materiales; 
CREATE TABLE unc_249456.volumen_materiales (
    id SERIAL NOT NULL,
    categoria varchar(20) NOT NULL,
    CONSTRAINT volumen_materiales_pk PRIMARY KEY (id)
);

INSERT INTO unc_249456.volumen_materiales (categoria) VALUES ('Caja');
INSERT INTO unc_249456.volumen_materiales (categoria) VALUES ('Baúl de un auto');
INSERT INTO unc_249456.volumen_materiales (categoria) VALUES ('Camioneta');
INSERT INTO unc_249456.volumen_materiales (categoria) VALUES ('Camión');

CREATE TABLE unc_249456.aviso_retiro (
    id SERIAL NOT NULL,
    fecha_emision timestamp  NOT NULL,
    nombre varchar(20)   NOT NULL,
    telefono int   NOT NULL,
    direccion varchar(25)   NOT NULL,
    foto bytea  NULL,
    id_horario int   NOT NULL,
    id_volumen int   NOT NULL,
    CONSTRAINT aviso_retiro_pk PRIMARY KEY (id)
);

ALTER TABLE unc_249456.aviso_retiro ADD CONSTRAINT aviso_retiro_franja_horaria
    FOREIGN KEY (id_horario)
    REFERENCES franja_horaria (id)
;

ALTER TABLE unc_249456.aviso_retiro ADD CONSTRAINT aviso_retiro_volumen_materiales
    FOREIGN KEY (id_volumen)
    REFERENCES volumen_materiales (id) 
;