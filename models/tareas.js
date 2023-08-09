const Tarea = require("./tarea");

class Tareas {
    _listado = {}

    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        })
        return listado
    }

    constructor() {
        this._listado = {}
    }

    cargarTareasFromArray(tareas = []) {
        for (const tarea of tareas) {
            this._listado[tarea.id] = tarea
        }
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto() {
        console.log()
        this.listadoArr.forEach((tarea, i) => {
            const estado = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red
            console.log(`${`${i + 1}.`.green} ${tarea.desc} :: ${estado}`)
        })
    }

    listarPendientesCompletadas(completadas = true) {
        console.log()
        return this.listadoArr.filter(t => completadas ? t.completadoEn : !t.completadoEn).forEach((tarea, i) => {
            const estado = tarea.completadoEn ? tarea.completadoEn.toString().green : 'Pendiente'.red
            console.log(`${`${i + 1}.`.green} ${tarea.desc} :: ${estado}`)
        })
    }

    toggleCompletadas(ids = []) {
        for (let tarea of this.listadoArr) {
            this._listado[tarea.id].completadoEn = ids.includes(tarea.id) ? new Date().toISOString() : null
        }
    }
}

module.exports = Tareas