import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {RegisterUserDto} from './dto/register-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiOperation({description:"To Register a new user with email",summary:"Register a new user"})
  create(@Body() registerData: RegisterUserDto) {
    return this.authService.register(registerData);
  }
  @Post('login')
  @ApiOperation({description:"Login with email",summary:"Endpoint to login with email and password"})
  login(@Body() loginData:LoginUserDto){
    return this.authService.login(loginData);
  }
}
