/* eslint-disable */            // desactiva todo el archivo
/* eslint-disable regla-x */    // archivo completo para una regla

export interface JwtPayload {
    id: string;
    email: string;
    roles: string[];
    fullName: string;

    // TODO: añadir todo lo que quieran grabar.
}