import { IIdUser } from 'src/models/IUser';
import { Token } from '../../src/servicesApplication/token';

describe('Token', () => {
  let token: Token;
  beforeEach(() => {
    token = new Token();
  });

  it('should generate token', () => {
    const generatedToken = token.generate({ id: 'frase secreta' });
    expect(generatedToken).toEqual(expect.any(String));
    expect(generatedToken).toEqual(expect.stringContaining('Bearer '));
  });

  it('should verify token', () => {
    const generatedToken = token.generate({ id: 'frase secreta' });
    const [, stringToken] = generatedToken.split(' ');
    const verified = token.verify(stringToken);
    console.log((verified as IIdUser).id);

    expect(verified).toEqual(expect.objectContaining({ id: 'frase secreta' }));
  });

  it('should decoded token', () => {
    const generatedToken = token.generate({ id: 'frase secreta' });
    const [, stringToken] = generatedToken.split(' ');
    const verified = token.decode(stringToken);
    console.log((verified as IIdUser).id);

    expect(verified).toEqual(expect.objectContaining({ id: 'frase secreta' }));
  });
});
