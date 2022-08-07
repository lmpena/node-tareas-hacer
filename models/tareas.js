
/**
* _listado
* {'uuid-123712-123123-2': {id:12, desc:'asasas', compleradoEn:91912}},
* {'uuid-123712-123123-2': {id:12, desc:'asasas', compleradoEn:91912}},
* {'uuid-123712-123123-2': {id:12, desc:'asasas', compleradoEn:91912}},
*/

import { Tarea } from "./tarea.js";

export class Tareas {

    _listado = {};

    get listadoArr () {

        const listado=[];

        Object.keys(this._listado).forEach( key => {
            // console.log(key);
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor () {
        this._listado={};
    }


    cargarTareasFromArray ( tareas = [] ) {
        tareas.forEach( (tarea) => {
            this._listado[tarea.id]=tarea;
        });
    }

    crearTarea ( desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id]=tarea;
    }

    borrarTarea( id = '' ) {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    toggleCompletadas ( ids = []) {
        ids.forEach(id=> {
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn=new Date().toISOString();
            }
        });
        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn=null;

            }
        })
    }


    listadoCompleto() {
        this.listadoArr.forEach( (tarea,i) => {

            const idx = `${i+1}`.green;
            const { desc, completadoEn} = tarea;

            const estado = (completadoEn) 
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            console.log( `${ idx } ${ desc } :: ${ estado }` );
        })
    }

    listadoPendientesCompletadas( completadas = true) {

        let listado = [];
        if(completadas) {
            listado=this.listadoArr.filter ( (tarea)  => { if (tarea.completadoEn != null) return tarea });
        } else {
            listado=this.listadoArr.filter ( (tarea)  => { if (tarea.completadoEn == null) return tarea });
        }
        listado.forEach( (tarea,i) => {

            const idx = `${i+1}`.green;
            const { desc, completadoEn} = tarea;

            const estado = (completadoEn) 
                            ? completadoEn.green
                            : 'Pendiente'.red;

                    console.log( `${ idx } ${ desc } :: ${ estado }` );
        })
    }
}