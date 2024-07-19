import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-auth.dto';  

@Injectable()
export class AuthService {
  constructor(private readonly dataservice:DatabaseService,private readonly jwtservice:JwtService)
  {}
  async login(loginData:LoginUserDto){ 
    const {email,password} = loginData; 
    const user = await this.dataservice.user.findFirst({
      where:{
        email:email
      }
    })  
    if(!user){
      throw new NotFoundException("User not found")
    }    
    const validatePassword = await bcrypt.compare(password,user.password);  
    if(!validatePassword){
      throw new NotFoundException("Invalid Password")
    } 
    return {
      token:this.jwtservice.sign({email})
    }
  }
  async register(registerData: RegisterUserDto) {
   const user = await this.dataservice.user.findFirst({
    where:{
      email:registerData.email
    }
   }) 
   if(user){
    throw new BadGatewayException("User already exists")
   } 
   registerData.password = await bcrypt.hash(registerData.password,10);
   const res=await this.dataservice.user.create({ data: registerData });  
   return res;
  }

}