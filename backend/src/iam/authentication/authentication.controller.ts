import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { AuthType } from './enum/auth-type.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
// import { Response } from 'express';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly authService: AuthenticationService
    ){}

    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto){
        return this.authService.signUp(signUpDto);
    }


    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    async signIn( @Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    // below is for store the token under the cookie tabs

    // @HttpCode(HttpStatus.OK)
    // @Post('sign-in')
    // async signIn(
    //     @Res({ passthrough: true }) response: Response, 
    //     @Body() signInDto: SignInDto
    //     ) {
    //     const accessToken = await this.authService.signIn(signInDto);
    //     response.cookie('accessToken', accessToken, {
    //         secure: true,
    //         httpOnly: true,
    //         sameSite: true,
    //     });
    // }

    @HttpCode(HttpStatus.OK)
    @Post('refresh-tokens')
    async refreshTokens( @Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshTokens(refreshTokenDto);
    }
}
