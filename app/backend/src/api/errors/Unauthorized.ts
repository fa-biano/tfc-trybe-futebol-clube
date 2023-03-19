import HttpException from './HttpException';

class Unauthorized extends HttpException {
  private static status = 401;

  constructor(message?: string) {
    super(Unauthorized.status, message || 'UNAUTHORIZED');
  }
}

export default Unauthorized;
