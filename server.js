const express = require('express');
const path = require('path');
const app = express();

// BUG A: revisa la posicion de este middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// TODO 1: agrega el middleware para leer JSON del body

let items = [
  { id: 1, name: 'Teclado' },
  { id: 2, name: 'Mouse' }
];

function requireAuth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  // BUG B: falta una linea aqui
}

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === Number(req.params.id));
  // BUG C: revisa el status que se envia aqui abajo
  res.status(200).json(item);
});

// TODO 2: crea la ruta POST /api/items
// - Lee name del body
// - Genera un id nuevo
// - Agrega el item al arreglo items
// - Responde 201 con el item creado

app.patch('/api/items/:id', requireAuth, (req, res) => {
  const item = items.find(i => i.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'No encontrado' });
  }
  // TODO 3: si req.body.name existe, actualiza item.name
  // y responde 200 con el item actualizado
});

// BUG D: revisa como se construye esta ruta
app.use(express.static('./public'));

// TODO 4: agrega el middleware de manejo de errores (4 parametros)
// debe responder 500 con { error: 'Error interno del servidor' }
