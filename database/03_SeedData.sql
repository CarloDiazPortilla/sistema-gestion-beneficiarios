-- =============================================
-- Script: Seed Data
-- =============================================

USE SistemaGestionBeneficiarios;
GO

-- =============================================
-- Insertar Documentos de Identidad
-- =============================================
PRINT 'Insertando tipos de documentos de identidad...';

-- Perú
INSERT INTO [dbo].[DocumentoIdentidad] ([Nombre], [Abreviatura], [Pais], [Longitud], [SoloNumeros], [Activo])
VALUES 
    ('Documento Nacional de Identidad', 'DNI', 'Perú', 8, 1, 1),
    ('Carnet de Extranjería', 'CE', 'Perú', 12, 0, 1),
    ('Pasaporte', 'PAS', 'Perú', 12, 0, 1);

-- Colombia
INSERT INTO [dbo].[DocumentoIdentidad] ([Nombre], [Abreviatura], [Pais], [Longitud], [SoloNumeros], [Activo])
VALUES 
    ('Cédula de Ciudadanía', 'CC', 'Colombia', 10, 1, 1),
    ('Cédula de Extranjería', 'CE', 'Colombia', 7, 1, 1),
    ('Pasaporte', 'PAS', 'Colombia', 10, 0, 1);

-- Chile
INSERT INTO [dbo].[DocumentoIdentidad] ([Nombre], [Abreviatura], [Pais], [Longitud], [SoloNumeros], [Activo])
VALUES 
    ('Rol Único Nacional', 'RUN', 'Chile', 9, 0, 1),
    ('Rol Único Tributario', 'RUT', 'Chile', 9, 0, 1),
    ('Pasaporte', 'PAS', 'Chile', 9, 0, 1);

-- Argentina
INSERT INTO [dbo].[DocumentoIdentidad] ([Nombre], [Abreviatura], [Pais], [Longitud], [SoloNumeros], [Activo])
VALUES 
    ('Documento Nacional de Identidad', 'DNI', 'Argentina', 8, 1, 1),
    ('Libreta Cívica', 'LC', 'Argentina', 8, 1, 1),
    ('Pasaporte', 'PAS', 'Argentina', 9, 0, 1);

-- México
INSERT INTO [dbo].[DocumentoIdentidad] ([Nombre], [Abreviatura], [Pais], [Longitud], [SoloNumeros], [Activo])
VALUES 
    ('Clave Única de Registro de Población', 'CURP', 'México', 18, 0, 1),
    ('Pasaporte', 'PAS', 'México', 10, 0, 1);

PRINT 'Tipos de documentos insertados correctamente.';
GO

-- =============================================
-- Insertar Beneficiarios de Ejemplo
-- =============================================
PRINT 'Insertando beneficiarios de ejemplo...';

-- Beneficiarios de Perú
INSERT INTO [dbo].[Beneficiario] ([Nombres], [Apellidos], [DocumentoIdentidadId], [NumeroDocumento], [FechaNacimiento], [Sexo])
VALUES 
    ('María Elena', 'García López', 1, '72345678', '1985-03-15', 'F'),
    ('Carlos Alberto', 'Rodríguez Sánchez', 1, '71234567', '1990-07-22', 'M'),
    ('Ana Lucía', 'Fernández Torres', 1, '70987654', '1988-11-30', 'F');

-- Beneficiarios de Colombia
INSERT INTO [dbo].[Beneficiario] ([Nombres], [Apellidos], [DocumentoIdentidadId], [NumeroDocumento], [FechaNacimiento], [Sexo])
VALUES 
    ('Jorge Andrés', 'Martínez Díaz', 4, '1234567890', '1982-05-10', 'M'),
    ('Diana Carolina', 'López Ramírez', 4, '0987654321', '1995-09-18', 'F');

-- Beneficiarios de Chile
INSERT INTO [dbo].[Beneficiario] ([Nombres], [Apellidos], [DocumentoIdentidadId], [NumeroDocumento], [FechaNacimiento], [Sexo])
VALUES 
    ('Pedro Antonio', 'González Silva', 7, '12345678-9', '1987-12-05', 'M'),
    ('Valentina Sofía', 'Morales Castro', 7, '98765432-1', '1992-04-20', 'F');

-- Beneficiarios de Argentina
INSERT INTO [dbo].[Beneficiario] ([Nombres], [Apellidos], [DocumentoIdentidadId], [NumeroDocumento], [FechaNacimiento], [Sexo])
VALUES 
    ('Martín Sebastián', 'Pérez Gómez', 10, '35123456', '1989-08-14', 'M'),
    ('Luciana Belén', 'Hernández Ruiz', 10, '36789012', '1993-02-28', 'F');

PRINT 'Beneficiarios de ejemplo insertados correctamente.';
GO

-- =============================================
-- Verificar los datos insertados
-- =============================================
PRINT '';
PRINT '===== RESUMEN DE DATOS INSERTADOS =====';
PRINT '';

DECLARE @TotalDocumentos INT;
DECLARE @TotalBeneficiarios INT;

SELECT @TotalDocumentos = COUNT(*) FROM [dbo].[DocumentoIdentidad];
SELECT @TotalBeneficiarios = COUNT(*) FROM [dbo].[Beneficiario];

PRINT 'Total de tipos de documentos: ' + CAST(@TotalDocumentos AS VARCHAR(10));
PRINT 'Total de beneficiarios: ' + CAST(@TotalBeneficiarios AS VARCHAR(10));
PRINT '';
PRINT 'Datos de ejemplo insertados exitosamente.';
GO
