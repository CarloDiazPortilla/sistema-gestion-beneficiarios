-- =============================================
-- Script: Creación de Tablas
-- =============================================

USE SistemaGestionBeneficiarios;
GO

-- =============================================
-- Tabla: DocumentoIdentidad
-- Descripción: Almacena los tipos de documentos de identidad por país
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DocumentoIdentidad]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[DocumentoIdentidad] (
        [Id] INT IDENTITY(1,1) NOT NULL,
        [Nombre] VARCHAR(50) NOT NULL,
        [Abreviatura] VARCHAR(10) NOT NULL,
        [Pais] VARCHAR(50) NOT NULL,
        [Longitud] INT NOT NULL,
        [SoloNumeros] BIT NOT NULL DEFAULT 1,
        [Activo] BIT NOT NULL DEFAULT 1,
        [FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
        [FechaModificacion] DATETIME NULL,
        
        CONSTRAINT [PK_DocumentoIdentidad] PRIMARY KEY CLUSTERED ([Id] ASC),
        CONSTRAINT [UQ_DocumentoIdentidad_Abreviatura_Pais] UNIQUE ([Abreviatura], [Pais])
    );

    PRINT 'Tabla DocumentoIdentidad creada exitosamente.';
END
ELSE
BEGIN
    PRINT 'La tabla DocumentoIdentidad ya existe.';
END
GO

-- =============================================
-- Tabla: Beneficiario
-- Descripción: Almacena la información de los beneficiarios
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Beneficiario]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Beneficiario] (
        [Id] INT IDENTITY(1,1) NOT NULL,
        [Nombres] VARCHAR(100) NOT NULL,
        [Apellidos] VARCHAR(100) NOT NULL,
        [DocumentoIdentidadId] INT NOT NULL,
        [NumeroDocumento] VARCHAR(20) NOT NULL,
        [FechaNacimiento] DATE NOT NULL,
        [Sexo] CHAR(1) NOT NULL,
        [FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
        [FechaModificacion] DATETIME NULL,
        
        CONSTRAINT [PK_Beneficiario] PRIMARY KEY CLUSTERED ([Id] ASC),
        CONSTRAINT [FK_Beneficiario_DocumentoIdentidad] FOREIGN KEY ([DocumentoIdentidadId])
            REFERENCES [dbo].[DocumentoIdentidad] ([Id]),
        CONSTRAINT [UQ_Beneficiario_Documento] UNIQUE ([DocumentoIdentidadId], [NumeroDocumento]),
        CONSTRAINT [CK_Beneficiario_Sexo] CHECK ([Sexo] IN ('M', 'F'))
    );

    -- Índices para mejorar el rendimiento
    CREATE NONCLUSTERED INDEX [IX_Beneficiario_DocumentoIdentidadId] 
        ON [dbo].[Beneficiario] ([DocumentoIdentidadId]);

    CREATE NONCLUSTERED INDEX [IX_Beneficiario_NumeroDocumento] 
        ON [dbo].[Beneficiario] ([NumeroDocumento]);

    PRINT 'Tabla Beneficiario creada exitosamente.';
END
ELSE
BEGIN
    PRINT 'La tabla Beneficiario ya existe.';
END
GO

PRINT 'Todas las tablas han sido creadas correctamente.';
GO
