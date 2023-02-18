const Eventos = require("../models/Eventos");
events = {};

events.getEventos = async (req, res) => {
  try {
    const events = await Eventos.find().populate("user", "name");
    return res.status(200).json({
      events,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al obtener los eventos",
    });
  }
};

events.crearEventos = async (req, res) => {
  const body = req.body;
  const event = new Eventos(body);
  try {
    event.user = req.uid; //lo pasabamos desde el middleware del token
    const eventoSaved = await event.save();
    return res.status(201).json({
      message: "Evento creado",
      uid: eventoSaved.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al crear el evento",
    });
  }
};

events.actualizarEventos = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const uid = req.uid;
  try {
    let event = await Eventos.findById(id);
    if (!event) {
      return res.status(404).json({
        message: "Evento no encontrado",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        message: "No puede editar este evento",
      });
    }

    const eventUpdated = await Eventos.findByIdAndUpdate(id, body, {
      new: true,
    });

    return res.status(200).json({
      message: "Evento actualizado",
      eventUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al actualizar el evento",
    });
  }
};

events.borrarEventos = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    let event = await Eventos.findById(id);
    if (!event) {
      return res.status(404).json({
        message: "Evento no encontrado",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        message: "No puede eliminar este evento",
      });
    }

    await Eventos.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Evento eliminado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al eliminar el evento",
    });
  }
};

module.exports = events;
