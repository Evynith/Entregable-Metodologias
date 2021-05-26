/** Script de creación de la base de datos */
CREATE TABLE unc_249456.materiales (
    id SERIAL NOT NULL,    
    nombre varchar(20)   NOT NULL,
    imagen bytea  NOT NULL,
    descripcion varchar(200),
    CONSTRAINT materiales_pk PRIMARY KEY (id)
);