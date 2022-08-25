export interface AuthenticationResponse {
  AuthenticationResult: AuthenticationResult;
  ChallengeParameters: ChallengeParameters;
}

export interface AuthenticationResult {
  AccessToken: string;
  ExpiresIn: number;
  IdToken: string;
  RefreshToken: string;
  TokenType: string;
}

export interface ChallengeParameters {}

export default class CognitoService {
  private static readonly cognitoUrl =
    'https://cognito-idp.ap-northeast-1.amazonaws.com/';

  private static readonly clientID = '4rom2oa41ljg645kt6vspgnl0d';

  public static async signIn(
    userName: String,
    password: String
  ): Promise<AuthenticationResponse | null> {
    console.log('SignIn:', { userName, password });
    return fetch(this.cognitoUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-amz-json-1.1',
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
      },
      body: JSON.stringify({
        AuthParameters: {
          USERNAME: userName,
          PASSWORD: password,
        },
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.clientID,
      }),
    })
      .then((resp) => {
        console.log({ resp });
        return resp.json();
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  }
}
