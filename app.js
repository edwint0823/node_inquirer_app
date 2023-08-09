require('colors')
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer')
const {guardarDB, leerDB} = require("./helpers/guardarArchivo");
const Tareas = require("./models/tareas");
const main = async () => {
    let opt = ''
    const tareas = new Tareas()
    const tareasDB = leerDB()
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)
    }
    do {
        opt = await inquirerMenu()
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción de tarea')
                tareas.crearTarea(desc)
                break
            case '2':
                tareas.listadoCompleto()
                break
            case '3':
                tareas.listarPendientesCompletadas(true)
                break
            case '4':
                tareas.listarPendientesCompletadas(false)
                break
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if (id !== '0') {
                    const borrar = await confirmar('¿Esta seguro de borrar?')
                    if (borrar) {
                        await tareas.borrarTarea(id)
                        console.log('tarea borrada')
                    }
                }
                break
        }
        guardarDB(tareas.listadoArr)
        await pausa()
    } while (opt !== '0')
}


main()