import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface Evento {
  id: number;
  nombre: string;
  categoria: string;
  fecha: string;
  hora: string;
  lugar: string;
  descripcion: string;
  color: string;
  icono: string;
  imagen: string;
}

interface InscripcionEvento {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  evento: string;
  fecha: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  vistaActual: 'inicio' | 'inscripciones' = 'inicio';
  eventoSeleccionado = '';
  mensajeExito = '';
  mensajeError = '';
  private siguienteId = 1;

  readonly eventos: Evento[] = [
    {
      id: 1, nombre: 'Innovación y tecnología', categoria: 'TECNOLOGÍA',
      fecha: '24 OCT 2026', hora: '09:00 a. m.', lugar: 'Auditorio principal',
      descripcion: 'Descubre tendencias, herramientas y nuevas formas de resolver desafíos.',
      color: 'lila', icono: '✦', imagen: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85'
    },
    {
      id: 2, nombre: 'Diseño y creatividad digital', categoria: 'CREATIVIDAD',
      fecha: '29 OCT 2026', hora: '10:30 a. m.', lugar: 'Sala de innovación',
      descripcion: 'Explora ideas visuales y crea experiencias digitales que conectan.',
      color: 'rosa', icono: '✿', imagen: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85'
    },
    {
      id: 3, nombre: 'Emprendimiento juvenil', categoria: 'EMPRENDIMIENTO',
      fecha: '05 NOV 2026', hora: '08:30 a. m.', lugar: 'Aula de conferencias',
      descripcion: 'Convierte tus ideas en proyectos con propósito y valor.',
      color: 'naranja', icono: '↗', imagen: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85'
    },
    {
      id: 4, nombre: 'Desarrollo web con Angular', categoria: 'DESARROLLO',
      fecha: '12 NOV 2026', hora: '09:30 a. m.', lugar: 'Laboratorio digital',
      descripcion: 'Conoce los fundamentos para construir aplicaciones web modernas.',
      color: 'azul', icono: '</>', imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85'
    },
    {
      id: 5, nombre: 'Ciberseguridad para todos', categoria: 'SEGURIDAD',
      fecha: '19 NOV 2026', hora: '11:00 a. m.', lugar: 'Auditorio principal',
      descripcion: 'Aprende buenas prácticas para proteger tu información en línea.',
      color: 'verde', icono: '⌑', imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=85'
    },
    {
      id: 6, nombre: 'Comunicación y liderazgo', categoria: 'HABILIDADES',
      fecha: '26 NOV 2026', hora: '03:00 p. m.', lugar: 'Sala de innovación',
      descripcion: 'Fortalece tus habilidades para colaborar, comunicar y liderar.',
      color: 'violeta', icono: '◎', imagen: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85'
    }
  ];

  readonly formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
    evento: ['', Validators.required]
  });

  inscripciones: InscripcionEvento[] = [];
  chatAbierto = false;
  chatTexto = '';
  chatMensajes: { autor: 'bot' | 'usuario'; texto: string }[] = [
    { autor: 'bot', texto: '¡Hola! 👋 Soy el asistente de Inscribe. ¿En qué puedo ayudarte?' }
  ];

  constructor(private readonly fb: FormBuilder) {}

  alternarChat(): void {
    this.chatAbierto = !this.chatAbierto;
  }

  enviarChat(): void {
    const texto = this.chatTexto.trim();
    if (!texto) return;
    this.chatMensajes.push({ autor: 'usuario', texto });
    this.chatTexto = '';
    const consulta = texto.toLocaleLowerCase('es');
    let respuesta = 'Puedo ayudarte a explorar los eventos, completar una inscripción o revisar la lista de participantes. ¿Qué necesitas hacer?';
    if (consulta.includes('evento') || consulta.includes('fecha') || consulta.includes('horario')) {
      respuesta = `Tenemos ${this.eventos.length} eventos disponibles: ${this.eventos.map(e => e.nombre).join(', ')}. Revisa sus fechas y horarios en las tarjetas del catálogo.`;
    } else if (consulta.includes('inscri') || consulta.includes('registr')) {
      respuesta = 'Para inscribirte, pulsa “Inscribirme” en la tarjeta del evento y completa tu nombre, correo, teléfono y evento. El botón se habilitará cuando los datos sean válidos.';
    } else if (consulta.includes('eliminar') || consulta.includes('lista')) {
      respuesta = 'Abre “Inscripciones” en el menú lateral para consultar los registros y eliminar una inscripción.';
    } else if (consulta.includes('hola') || consulta.includes('ayuda')) {
      respuesta = '¡Claro! Puedes preguntarme por los eventos, cómo inscribirte o cómo revisar y eliminar registros.';
    }
    this.chatMensajes.push({ autor: 'bot', texto: respuesta });
  }

  get campos() {
    return this.formulario.controls;
  }

  abrirInscripcion(nombreEvento = ''): void {
    this.vistaActual = 'inicio';
    this.eventoSeleccionado = nombreEvento;
    this.formulario.patchValue({ evento: nombreEvento });
    this.mensajeExito = '';
    this.mensajeError = '';
    setTimeout(() => document.getElementById('formulario-inscripcion')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }

  mostrarInscripciones(): void {
    this.vistaActual = 'inscripciones';
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  mostrarInicio(): void {
    this.vistaActual = 'inicio';
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  registrarInscripcion(): void {
    this.mensajeExito = '';
    this.mensajeError = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.mensajeError = 'Revisa los campos señalados antes de registrar tu inscripción.';
      return;
    }

    const valores = this.formulario.getRawValue();
    const nuevaInscripcion: InscripcionEvento = {
      id: this.siguienteId++,
      nombre: valores.nombre!.trim(),
      correo: valores.correo!.trim(),
      telefono: valores.telefono!,
      evento: valores.evento!,
      fecha: new Date().toLocaleDateString('es-PE', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      })
    };

    this.inscripciones = [nuevaInscripcion, ...this.inscripciones];
    this.mensajeExito = `¡Inscripción confirmada! ${nuevaInscripcion.nombre} ha sido registrado/a correctamente.`;
    this.formulario.reset({ nombre: '', correo: '', telefono: '', evento: '' });
    this.eventoSeleccionado = '';
    console.info('Inscripción registrada:', nuevaInscripcion);
  }

  eliminarInscripcion(id: number): void {
    const inscripcion = this.inscripciones.find(item => item.id === id);
    this.inscripciones = this.inscripciones.filter(item => item.id !== id);
    this.mensajeExito = inscripcion ? `Se eliminó la inscripción de ${inscripcion.nombre}.` : '';
  }

  limpiarAvisos(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}