-- =============================================
-- Script: Stored Procedures - DocumentoIdentidad
-- =============================================

USE SistemaGestionBeneficiarios;
GO

-- =============================================
-- SP: Listar Documentos de Identidad Activos
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_ListarDocumentosIdentidadActivos]') AND type in (N'P', N'PC'))
    DROP PROCEDURE [dbo].[SP_ListarDocumentosIdentidadActivos];
GO

CREATE PROCEDURE [dbo].[SP_ListarDocumentosIdentidadActivos]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT 
            [Id],
            [Nombre],
            [Abreviatura],
            [Pais],
            [Longitud],
            [SoloNumeros],
            [Activo],
            [FechaCreacion],
            [FechaModificacion]
        FROM [dbo].[DocumentoIdentidad]
        WHERE [Activo] = 1
        ORDER BY [Pais], [Nombre];
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

-- =============================================
-- SP: Obtener Documento de Identidad por ID
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_ObtenerDocumentoIdentidadPorId]') AND type in (N'P', N'PC'))
    DROP PROCEDURE [dbo].[SP_ObtenerDocumentoIdentidadPorId];
GO

CREATE PROCEDURE [dbo].[SP_ObtenerDocumentoIdentidadPorId]
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT 
            [Id],
            [Nombre],
            [Abreviatura],
            [Pais],
            [Longitud],
            [SoloNumeros],
            [Activo],
            [FechaCreacion],
            [FechaModificacion]
        FROM [dbo].[DocumentoIdentidad]
        WHERE [Id] = @Id;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

-- =============================================
-- SP: Listar Todos los Documentos de Identidad
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_ListarTodosDocumentosIdentidad]') AND type in (N'P', N'PC'))
    DROP PROCEDURE [dbo].[SP_ListarTodosDocumentosIdentidad];
GO

CREATE PROCEDURE [dbo].[SP_ListarTodosDocumentosIdentidad]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        SELECT 
            [Id],
            [Nombre],
            [Abreviatura],
            [Pais],
            [Longitud],
            [SoloNumeros],
            [Activo],
            [FechaCreacion],
            [FechaModificacion]
        FROM [dbo].[DocumentoIdentidad]
        ORDER BY [Pais], [Nombre];
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

PRINT 'Stored Procedures de DocumentoIdentidad creados exitosamente.';
GO
