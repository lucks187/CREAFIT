CREATE DATABASE creafit;
USE creafit;

-- =========================
-- TABLA USUARIO
-- =========================
CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL
);

-- =========================
-- TABLA PRODUCTO
-- =========================
CREATE TABLE Producto (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio FLOAT NOT NULL,
    CHECK (precio >= 0)
);

-- =========================
-- TABLA LOTE
-- =========================
CREATE TABLE Lote (
    idLote INT AUTO_INCREMENT PRIMARY KEY,
    idProducto INT NOT NULL,
    fechaCaducidad DATE NOT NULL,
    cantidadInicial INT NOT NULL,
    CHECK (cantidadInicial > 0),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

-- =========================
-- TABLA INVENTARIO
-- =========================
CREATE TABLE Inventario (
    idInventario INT AUTO_INCREMENT PRIMARY KEY,
    idLote INT NOT NULL,
    cantidadDisponible INT NOT NULL,
    CHECK (cantidadDisponible >= 0),
    FOREIGN KEY (idLote) REFERENCES Lote(idLote)
);

-- =========================
-- TABLA VENTA
-- =========================
CREATE TABLE Venta (
    idVenta INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    fechaVenta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total FLOAT NOT NULL DEFAULT 0,
    CHECK (total >= 0),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

-- =========================
-- TABLA DETALLE VENTA
-- =========================
CREATE TABLE DetalleVenta (
    idDetalle INT AUTO_INCREMENT PRIMARY KEY,
    idVenta INT NOT NULL,
    idProducto INT NOT NULL,
    idLote INT NOT NULL,
    cantidad INT NOT NULL,
    precioUnitario FLOAT NOT NULL,
    subtotal FLOAT NOT NULL,
    CHECK (cantidad > 0),
    CHECK (precioUnitario >= 0),
    CHECK (subtotal >= 0),
    FOREIGN KEY (idVenta) REFERENCES Venta(idVenta),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto),
    FOREIGN KEY (idLote) REFERENCES Lote(idLote)
);

-- =========================
-- TABLA DEVOLUCION
-- =========================
CREATE TABLE Devolucion (
    idDevolucion INT AUTO_INCREMENT PRIMARY KEY,
    idVenta INT NOT NULL,
    fechaDevolucion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(255),
    FOREIGN KEY (idVenta) REFERENCES Venta(idVenta)
);

-- =========================
-- TABLA DETALLE DEVOLUCION
-- =========================
CREATE TABLE DetalleDevolucion (
    idDetalleDev INT AUTO_INCREMENT PRIMARY KEY,
    idDevolucion INT NOT NULL,
    idProducto INT NOT NULL,
    idLote INT NOT NULL,
    cantidad INT NOT NULL,
    CHECK (cantidad > 0),
    FOREIGN KEY (idDevolucion) REFERENCES Devolucion(idDevolucion),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto),
    FOREIGN KEY (idLote) REFERENCES Lote(idLote)
);

-- =========================
-- TABLA REPORTE
-- =========================
CREATE TABLE Reporte (
    idReporte INT AUTO_INCREMENT PRIMARY KEY,
    tipoReporte VARCHAR(50) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL
);



insert into usuario(nombre, correo, contraseña, rol) values ('Mario', 'gerente@suplementos.com','123','administrador');
insert into usuario(nombre, correo, contraseña, rol) values ('Daniel', 'vendedor@suplementos.com','123','vendedor');
insert into usuario(nombre, correo, contraseña, rol) values ('Felipe', 'almacenista@suplementos.com','123','almacenista');
insert into usuario(nombre, correo, contraseña, rol) values ('Jose', 'almacenistaa@suplementos.com','123','almacenista');
select * from usuario;