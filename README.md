# Sistema de Inscripción a Eventos

Aplicación académica desarrollada con Angular, TypeScript y formularios reactivos. No utiliza backend ni base de datos; los registros se mantienen en memoria mientras la aplicación está abierta.

## Requisitos
- Node.js y npm instalados.

## Ejecutar
1. Descomprime el ZIP.
2. Abre la carpeta `Sistema-Inscripcion-Eventos` en Visual Studio Code.
3. Abre una terminal dentro de esa carpeta.
4. Ejecuta:
   ```bash
   npm install
   npm start
   ```
5. Angular abrirá la aplicación en `http://localhost:4200`.

## Funcionalidades
- Formulario reactivo con `ReactiveFormsModule`, `FormBuilder`, `FormGroup` y `Validators`.
- Campos obligatorios y validaciones en castellano.
- `formGroup` y `formControlName` para enlazar HTML con TypeScript.
- `markAllAsTouched()` para mostrar errores al intentar registrar.
- Botón de registro deshabilitado mientras el formulario sea inválido.
- Mensaje de confirmación al registrar correctamente.
- Tabla de inscripciones y acción para eliminar.
- `reset()` para limpiar el formulario y restaurar valores iniciales.
- Diseño adaptable, tonos morados, fotografías de eventos y animaciones CSS.
- Catálogo visual de seis eventos con imágenes.
- Asistente de chat interactivo con respuestas sobre eventos, inscripción y gestión de registros.

## Campos y reglas
- Nombre completo: obligatorio, mínimo 3 caracteres.
- Correo electrónico: obligatorio y con formato válido.
- Teléfono: obligatorio y debe contener 9 dígitos.
- Evento: obligatorio, selección de una lista de eventos.
- Fecha de inscripción: se registra automáticamente en la tabla.

> Nota: como se indicó en clase, esta versión no incluye edición, backend ni base de datos.

Las fotografías se cargan desde Unsplash, por lo que se necesita conexión a internet para verlas. El resto de la aplicación funciona localmente.
