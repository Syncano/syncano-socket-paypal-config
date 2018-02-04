import { assert } from 'chai';
import { run } from 'syncano-test';
import 'dotenv/config';

describe('install', () => {
  const meta = {
    admin: { id: 1, email: 'testEmail@gmail.com' }
  };
  const args = {
    PAYPAL_CLIENT_ID: 'client_id',
    PAYPAL_CLIENT_SECRET: 'client_secret',
    PAYPAL_MODE: 'sandbox'
  };

  it('should return unauthorized error if admin token not sent with request', (done) => {
    run('install', { args })
      .then((res) => {
        assert.propertyVal(res, 'code', 403);
        assert.propertyVal(res.data, 'message', 'You are not authorised for this action');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return message "Validation error(s)" if required parameter empty', (done) => {
    const argsValidation = { ...args, PAYPAL_CLIENT_ID: '' };
    run('install', { args: argsValidation, meta })
      .then((res) => {
        assert.propertyVal(res, 'code', 400);
        assert.propertyVal(res.data, 'message', 'Validation error(s)');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should install PayPal config successfully if valid credentials sent by admin', (done) => {
    run('install', { args, meta })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data, 'message', 'Installed successfully');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
