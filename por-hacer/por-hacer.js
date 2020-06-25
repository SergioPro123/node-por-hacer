const fs = require('fs');

let listadoPorHacer = [];

const guardarDBJson = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(`dbJson/data.json`, data, (err) => {
        if (err)
            throw new Error('No se pudo grabar')
    });
};

const cargarDBJson = () => {
    try {
        listadoPorHacer = require('../dbJson/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }
};
const crear = (descripcion) => {

    cargarDBJson();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDBJson();
    return porHacer;

};

const getListado = () => {
    cargarDBJson();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = false) => {
    cargarDBJson();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDBJson();
        return true;
    }
    return false
}

const borrar = (descripcion) => {
    cargarDBJson();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer.splice(index, index + 1)
        guardarDBJson();
        return true;
    }
    return false
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};