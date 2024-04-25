// funcion controladora por que realizar una accion o una peticion

const user = require("../models/user");
const userModel = require("../models/user"); // carrpeta donde estan los modelos user y base de datos.

const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json(users);
};

// obtener un solo usuario

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

// crear usuarios

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.create({
      name,
      email,
      password: await userModel.encryptPassword(password),
    });
    res.status(200).json({ message: "Usuario creado", user });
  } catch (error) {
    res.status(404).json({ message: "Error al crear un usuario" });
  }
};

// Ruta para actualizar un usuario PATCH (c/u elementos) Tarea Clase 90

const userPatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email} = req.body;
    const user = await userModel.findByIdAndUpdate(id, {
      name,
      email
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario  no encontrado" });
    }
    res.status(200).json({ message: "Usuario actualizado exitosamente", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ruta para actualizar un producto PUT (total de elementos) Practicando

const userPut = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await userModel.findByIdAndUpdate(id, {
      name,
      email,
      password: await userModel.encryptPassword(password),
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario actualizado exitosamente", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ruta para eliminar un producto Tarea Clase 90

const userDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await userModel.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente", deleteUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getUsers, getUser, userPatch, userPut, userDelete, createUser };