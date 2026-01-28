-- =============================================
-- Script: Stored Procedures - Beneficiario (CRUD)
-- =============================================

USE SistemaGestionBeneficiarios;
GO

-- =============================================
-- SP: Listar Beneficiarios
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_ListarBeneficiarios]') AND type in (N'P', N'PC'))
    DROP PROCEDURE [dbo].[SP_ListarBeneficiarios];
GO

CREATE PROCEDURE [dbo].[SP_ListarBeneficiarios]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT 
            b.[Id],
            b.[Nombres],
            b.[Apellidos],
            b.[DocumentoIdentidadId],
            b.[NumeroDocumento],
            b.[FechaNacimiento],
            b.[Sexo],
            b.[FechaCreacion],
            b.[FechaModificacion],
            -- Información del documento
            di.[Nombre] AS DocumentoNombre,
            di.[Abreviatura] AS DocumentoAbreviatura,
            di.[Pais] AS DocumentoPais,
            di.[Longitud] AS DocumentoLongitud,
            di.[SoloNumeros] AS DocumentoSoloNumeros
        FROM [dbo].[Beneficiario] b
        INNER JOIN [dbo].[DocumentoIdentidad] di ON b.[DocumentoIdentidadId] = di.[Id]
        ORDER BY b.[Apellidos], b.[Nombres];
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

-- =============================================
-- SP: Obtener Beneficiario por ID
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_ObtenerBeneficiarioPorId]') AND type in (N'P', N'PC'))
    DROP PROCEDURE [dbo].[SP_ObtenerBeneficiarioPorId];
GO

CREATE PROCEDURE [dbo].[SP_ObtenerBeneficiarioPorId]
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT 
            b.[Id],
            b.[Nombres],
            b.[Apellidos],
            b.[DocumentoIdentidadId],
            b.[NumeroDocumento],
            b.[FechaNacimiento],
            b.[Sexo],
            b.[FechaCreacion],
            b.[FechaModificacion],
            -- Información del documento
            di.[Nombre] AS DocumentoNombre,
            di.[Abreviatura] AS DocumentoAbreviatura,
            di.[Pais] AS DocumentoPais,
            di.[Longitud] AS DocumentoLongitud,
            di.[SoloNumeros] AS DocumentoSoloNumeros
        FROM [dbo].[Beneficiario] b
        INNER JOIN [dbo].[DocumentoIdentidad] di ON b.[DocumentoIdentidadId] = di.[Id]
        WHERE b.[Id] = @Id;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

-- =============================================
-- SP: Crear Beneficiario
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_CrearBeneficiario]') AND type in (N'P', N'PC'))
    DROP PROCEDURE [dbo].[SP_CrearBeneficiario];
GO

CREATE PROCEDURE [dbo].[SP_CrearBeneficiario]
    @Nombres VARCHAR(100),
    @Apellidos VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento VARCHAR(20),
    @FechaNacimiento DATE,
    @Sexo CHAR(1),
    @NuevoId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Validar que el documento de identidad exista y esté activo
        IF NOT EXISTS (SELECT 1 FROM [dbo].[DocumentoIdentidad] WHERE [Id] = @DocumentoIdentidadId AND [Activo] = 1)
        BEGIN
            RAISERROR('El tipo de documento de identidad no existe o no está activo.', 16, 1);
            RETURN;
        END
        
        -- Validar que no exista un beneficiario con el mismo documento
        IF EXISTS (SELECT 1 FROM [dbo].[Beneficiario] 
                   WHERE [DocumentoIdentidadId] = @DocumentoIdentidadId 
                   AND [NumeroDocumento] = @NumeroDocumento)
        BEGIN
            RAISERROR('Ya existe un beneficiario con este número de documento.', 16, 1);
            RETURN;
        END
        
        -- Insertar el beneficiario
        INSERT INTO [dbo].[Beneficiario] 
        (
            [Nombres],
            [Apellidos],
            [DocumentoIdentidadId],
            [NumeroDocumento],
            [FechaNacimiento],
            [Sexo]
        )
        VALUES 
        (
            @Nombres,
            @Apellidos,
            @DocumentoIdentidadId,
            @NumeroDocumento,
            @FechaNacimiento,
            @Sexo
        );
        
        -- Obtener el ID generado
        SET @NuevoId = SCOPE_IDENTITY();
        
        COMMIT TRANSACTION;
        
        -- Retornar el beneficiario creado
        EXEC [dbo].[SP_ObtenerBeneficiarioPorId] @NuevoId;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- =============================================
-- SP: Actualizar Beneficiario
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_ActualizarBeneficiario]') AND type in (N'P', N'PC'))
    DROP PROCEDURE [dbo].[SP_ActualizarBeneficiario];
GO

CREATE PROCEDURE [dbo].[SP_ActualizarBeneficiario]
    @Id INT,
    @Nombres VARCHAR(100),
    @Apellidos VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento VARCHAR(20),
    @FechaNacimiento DATE,
    @Sexo CHAR(1)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Validar que el beneficiario exista
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Beneficiario] WHERE [Id] = @Id)
        BEGIN
            RAISERROR('El beneficiario no existe.', 16, 1);
            RETURN;
        END
        
        -- Validar que el documento de identidad exista y esté activo
        IF NOT EXISTS (SELECT 1 FROM [dbo].[DocumentoIdentidad] WHERE [Id] = @DocumentoIdentidadId AND [Activo] = 1)
        BEGIN
            RAISERROR('El tipo de documento de identidad no existe o no está activo.', 16, 1);
            RETURN;
        END
        
        -- Validar que no exista otro beneficiario con el mismo documento
        IF EXISTS (SELECT 1 FROM [dbo].[Beneficiario] 
                   WHERE [DocumentoIdentidadId] = @DocumentoIdentidadId 
                   AND [NumeroDocumento] = @NumeroDocumento
                   AND [Id] <> @Id)
        BEGIN
            RAISERROR('Ya existe otro beneficiario con este número de documento.', 16, 1);
            RETURN;
        END
        
        -- Actualizar el beneficiario
        UPDATE [dbo].[Beneficiario]
        SET 
            [Nombres] = @Nombres,
            [Apellidos] = @Apellidos,
            [DocumentoIdentidadId] = @DocumentoIdentidadId,
            [NumeroDocumento] = @NumeroDocumento,
            [FechaNacimiento] = @FechaNacimiento,
            [Sexo] = @Sexo,
            [FechaModificacion] = GETDATE()
        WHERE [Id] = @Id;
        
        COMMIT TRANSACTION;
        
        -- Retornar el beneficiario actualizado
        EXEC [dbo].[SP_ObtenerBeneficiarioPorId] @Id;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- =============================================
-- SP: Eliminar Beneficiario
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_EliminarBeneficiario]') AND type in (N'P', N'PC'))
    DROP PROCEDURE [dbo].[SP_EliminarBeneficiario];
GO

CREATE PROCEDURE [dbo].[SP_EliminarBeneficiario]
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Validar que el beneficiario exista
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Beneficiario] WHERE [Id] = @Id)
        BEGIN
            RAISERROR('El beneficiario no existe.', 16, 1);
            RETURN;
        END
        
        -- Eliminar el beneficiario
        DELETE FROM [dbo].[Beneficiario]
        WHERE [Id] = @Id;
        
        COMMIT TRANSACTION;
        
        SELECT 1 AS Eliminado;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

PRINT 'Stored Procedures de Beneficiario (CRUD) creados exitosamente.';
GO
