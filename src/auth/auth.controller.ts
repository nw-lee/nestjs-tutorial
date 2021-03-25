import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AccessToken } from './access-token';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialsDto,
  ): Promise<AccessToken> {
    return this.authService.signIn(authCredentialDto);
  }
}
