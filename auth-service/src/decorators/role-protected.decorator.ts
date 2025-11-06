/* eslint-disable */            // desactiva todo el archivo
/* eslint-disable regla-x */    // archivo completo para una regla

import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces';

export const META_ROLES = 'roles';


export const RoleProtected = (...args: ValidRoles[] ) => {


    return SetMetadata( META_ROLES , args);
}