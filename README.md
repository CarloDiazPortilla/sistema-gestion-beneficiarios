# Sistema de Gestión de Beneficiarios
Sistema web full-stack para la gestión de beneficiarios de programas sociales multi-país con validación automática de documentos de identidad.

El sistema valida automáticamente:

- Longitud exacta del documento según tipo
- Formato numérico o alfanumérico según corresponda
- Duplicidad de documentos
- Edad y fechas válidas

## Tecnologías
### Backend

- .NET 8.0
- ASP.NET Core Web API
- Dapper
- SQL Server 2019+
- Swagger/OpenAPI

### Frontend

- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- Zustand (State Management)
- React Hook Form
- Axios
- React Router DOM

## Requisitos Previos
Asegúrese de tener instalado lo siguiente:

- .NET 8.0 SDK
- Node.js 18+ y npm
- SQL Server 2019+
- SQL Server Management Studio (recomendado)
- Git

### Verificar instalaciones
```bash
dotnet --version
node --version    # Debe mostrar v18.x o superior
npm --version     # Debe mostrar 9.x o superior
```

## Instalación
```bash
git clone https://github.com/CarloDiazPortilla/sistema-gestion-beneficiarios.git
cd sistema-gestion-beneficiarios
```

## Configurar Base de Datos

Antes de ejecutar los scripts SQL, verifique que **NO exista** una base de datos llamada  
`SistemaGestionBeneficiarios` en su servidor SQL Server.

El script `01_CreateDatabase.sql` crea la base de datos desde cero y **puede sobrescribir o eliminar una base de datos existente con el mismo nombre**, lo que podría causar pérdida de información.

1. Abrir SSMS y conectarse a su servidor SQL Server
2. Navegar a la carpeta database/
3. Ejecutar los scripts en el siguiente orden:
- 01_CreateDatabase.sql
- 02_CreateTables.sql
- 03_SeedData.sql
- 04_StoredProcedures_DocumentoIdentidad.sql
- 05_StoredProcedures_Beneficiario.sql

Para cada script:
- Archivo → Abrir → Archivo
- Seleccionar el script
- Presionar F5 o hacer clic en "Ejecutar"

## Configurar Backend
Restaurar dependencias
```bash
cd backend/SistemaGestionBeneficiarios
dotnet restore
```
Configurar cadena de conexión
Editar "appsettings.json" y "appsettings.Development.json":
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SistemaGestionBeneficiarios;User Id=sa;Password=TU_PASSWORD_AQUI;TrustServerCertificate=True;"
  }
}
```
Importante: Reemplazar TU_PASSWORD_AQUI con su contraseña de SQL Server.

Si usa autenticación de Windows:
```bash
"Server=localhost;Database=SistemaGestionBeneficiarios;Integrated Security=True;TrustServerCertificate=True;"
```
O reemplazar el server "localhost" con su servidor.

## Configurar Frontend

Instalar dependencias
```bash
cd frontend
npm install
```

### Configurar variables de entorno

1. Renombrar ".env.example" a ".env"
2. Editar el archivo .env:
```
VITE_API_BASE_URL=https://localhost:7001/api
```

Si cambió los puertos del backend, ajuste la URL en consecuencia.

## Ejecución

### Iniciar Backend

Opción 1: Visual Studio
1. Abrir SistemaGestionBeneficiarios.sln en Visual Studio
2. Seleccionar el perfil "https" en el dropdown
3. Presionar F5 o hacer clic en el botón "Iniciar"
4. El navegador abrirá automáticamente Swagger en https://localhost:7001

Opción 2: Línea de Comandos
```bash
cd backend/SistemaGestionBeneficiarios
dotnet run
```

### Iniciar Frontend

```bash
cd frontend
npm run dev
```

El frontend estará disponible en: http://localhost:5173

## Solución de Problemas

Error: No se puede conectar a la base de datos

Solución:

- Verificar que SQL Server esté ejecutándose
- Revisar la cadena de conexión en appsettings.json
- Verificar usuario y contraseña
- Probar conexión con SSMS usando las mismas credenciales

Error: CORS

Solución:

- Verificar que el backend esté ejecutándose
- Revisar configuración CORS en appsettings.json
- Asegurarse de que el puerto del frontend esté en AllowedOrigins

Error: Certificado HTTPS no confiable

Problema: Al abrir el backend, el navegador muestra advertencia de certificado

Solución:
```bash
dotnet dev-certs https --trust
```
Seleccionar "Sí" cuando pregunte si confiar en el certificado.