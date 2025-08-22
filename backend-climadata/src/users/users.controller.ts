import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

    constructor( readonly user: UsersService ) {}

    @UseGuards(JwtAuthGuard)
    @Get('currentuser')
    getProfile(@Req() req: Request) {
        return this.user.getProfile(req)
    }
}
