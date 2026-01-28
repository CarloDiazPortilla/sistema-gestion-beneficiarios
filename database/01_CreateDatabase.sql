-- =============================================
-- Script: Creación de Base de Datos
-- =============================================

USE master;
GO

-- Eliminar la base de datos si existe (solo para desarrollo)
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'SistemaGestionBeneficiarios')
BEGIN
    ALTER DATABASE SistemaGestionBeneficiarios SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE SistemaGestionBeneficiarios;
END
GO

-- Crear la base de datos
CREATE DATABASE SistemaGestionBeneficiarios;
GO

USE SistemaGestionBeneficiarios;
GO

PRINT 'Base de datos SistemaGestionBeneficiarios creada exitosamente.';
GO
