const {options} = require('../dataBase/options/sqliteDB.js');
const knex = require('knex')(options);


const list = async () => {
  try {
    const mensajes = await knex('chat').select('*'); 
    return mensajes;  
  } catch (err) {
    throw new Error('No se pudo leer la Base de Datos', err)
  }  
}


const save = async (message) => {
  try {    
    knex('chat') 
    .insert(message) 
    .then(() => { 
    return ('Mensaje Enviado')})
    .catch((err) => {
      throw new Error('No se pudo leer la Base de Datos', err)
    })
  } catch (err) {
    throw new Error('No se pudo leer la Base de Datos', err)
  }   
}

module.exports = { list, save };