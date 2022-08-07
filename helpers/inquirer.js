import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name:  `${'1.'.green }  Crear tarea`
            },
            {
                value: '2',
                name:  `${'2.'.green }  Listar tareas`
            },
            {
                value: '3',
                name:  `${'3.'.green }  Listar tareas completadas`
            },
            {
                value: '4',
                name:  `${'4.'.green }  Listar tareas pendientes`
            },
            {
                value: '5',
                name:  `${'5.'.green }  Completar tarea(s)`
            },
            {
                value: '6',
                name:  `${'6.'.green }  Borar tarea`
            },
            {
                value: '0',
                name:  `${'7.'.green }  Salir'`
            },
        ]
    }

];

export const inquirerMenu = async () => {
    console.clear()
    console.log('=========================================='.green);
    console.log('Seleccione una opcion'.white)
    console.log('==========================================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

export const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presiones ${ 'enter'.green } para continuar`
        }
    ]

    console.log('\n')
    await inquirer.prompt(question);
}

export const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate ( value ) {
                if(value.length === 0) {
                    return 'Por favor , ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;

}



export const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map( (tarea, i)  => {

        const idx = `${ i + 1 }.`.green ;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`        
        }
    });

    choices.unshift({
        value:'0',
        name: '0.'.green +' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);

    return id;
}

export const mostrarListadoCheckList = async (tareas = []) => {

    const choices = tareas.map( (tarea, i)  => {

        const idx = `${ i + 1 }.`.green ;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }` ,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    choices.unshift({
        value:'0',
        name: '0.'.green +' Cancelar'
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(preguntas);

    return ids;
}

export const confirmar = async (message) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);

    return ok;

}