/* eslint-disable */            // desactiva todo el archivo
/* eslint-disable regla-x */    // archivo completo para una regla

import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user  = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });

      const savedUser = await this.userRepository.save( user )
      const plainUser = { ...savedUser };
      delete (plainUser as Partial<typeof plainUser>).password;

      return {
        ...plainUser,
        token: this.getJwtToken({ 
          id: plainUser.id,
          email: plainUser.email,
          roles: plainUser.roles,
          fullName: plainUser.fullName
        })
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login( loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, roles: true, fullName: true }
    });

    if ( !user )
      throw new UnauthorizedException('Credentials are not valid');

    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid');

    return {
      ...user,
      token: this.getJwtToken({ 
        id: user.id,
        email: user.email,
        roles: user.roles,
        fullName: user.fullName
      })
    };
  }

  async findById( id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async checkAuthStatus( user: User ) {
    return {
      ...user,
      token: this.getJwtToken({ 
        id: user.id,
        email: user.email,
        roles: user.roles,
        fullName: user.fullName
      })
    };
  }

  private getJwtToken( payload: JwtPayload) {
    const token = this.jwtService.sign( payload );
    return token;
  }

  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }
}
