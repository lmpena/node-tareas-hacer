
import colors from 'colors';
import { guardarDB, leerDB } from './db/guardarArchivo.js';

import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } from './helpers/inquirer.js';
import { Tarea } from './models/tarea.js';
import { Tareas } from './models/tareas.js';



console.clear();

const main = async() => {
    
    let opt = '';

    const tareas = new Tareas();

    const tareasDB=leerDB();

    if (tareasDB) {
        // Cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    
    do {

        opt = await inquirerMenu();
        // console.log({opt})

        switch (opt) {
            case '1': // crear tarea
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
            break;

            case '2': // listado completo
                tareas.listadoCompleto();
            break;
            
            case '3': // listar completadas
                tareas.listadoPendientesCompletadas(true);
            break;
            
            case '4': // listar pendientes
                tareas.listadoPendientesCompletadas(false);
            break;

            case '5': // completado | pendiente
                const ids= await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;  

            case '6': // Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if(ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada.')
                    }
                    console.log({ok}) 
                }

            break;

            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

}

main();