
import { existsSync, readFileSync, writeFileSync } from 'fs';

const archivo = './db/data.json';

export const guardarDB = ( data ) => {
    writeFileSync (archivo, JSON.stringify(data)); 
}

export const leerDB = () => {
    if(!existsSync(archivo)) {
        return null;
    }

    const info = readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse( info );

    console.log(data);

    return data;
}