/* eslint-disable */            // desactiva todo el archivo
/* eslint-disable regla-x */    // archivo completo para una regla

import { Controller, Get, Post, Body, UseGuards, Req, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from './interfaces';
import { UserRoleGuard } from './guards/user-role.guards';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern('register')
  createUser(@Payload() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @MessagePattern('login')
  loginUser(@Payload() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }


  @MessagePattern('all')
  async getAllUsers() {
    return this.authService.findAll();
  }

  @MessagePattern('/:id')
  getUserById(@Payload() id: string) {
    return this.authService.findById(id);
  }

  @MessagePattern(':id')
  updateUser(
    @Payload('id') id: string,
    @Payload('updateUserDto') updateUserDto: UpdateUserDto
  ) {
    return this.authService.update(id, updateUserDto);
  }



  @MessagePattern('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user);
  }






  @MessagePattern('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,

    @RawHeaders() rawHeaders: string[],
  ) {


    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      userEmail,
      rawHeaders,
    }
  }

  // @SetMetadata('roles', ['andrei','networkAdmins'])

  @MessagePattern('private2')
  @RoleProtected(ValidRoles.andrei, ValidRoles.networkAdmins)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }
}
