import { expect } from 'chai';
import { describe, it } from 'mocha';
import { run } from '@syncano/test';
import 'dotenv/config';

describe('install', () => {
  const meta = {
    token: process.env.CLI_ACCOUNT_KEY
  };
  const args = {
    PAYPAL_CLIENT_ID: 'client_id',
    PAYPAL_CLIENT_SECRET: 'client_secret',
    PAYPAL_MODE: 'sandbox'
  };

  it('should return unauthorized error if admin token not sent with request', async () => {
    const res = await run('install', { args, meta: undefined });
    expect(res.code).to.equal(403);
  });

  it('should return message "Validation error(s)" if required parameter empty', async () => {
    const argsValidation = { ...args, PAYPAL_CLIENT_ID: '' };
    const { data, code } = await run('install', { args: argsValidation, meta });
    expect(code).to.equal(400);
    expect(data).to.have.property('message');
    expect(data.message).to.equal('Validation error(s)');
  });

  it('should install PayPal config if valid credentials sent by admin', async () => {
    const { data, code } = await run('install', { args, meta });
    expect(code).to.equal(200);
    expect(data).to.have.property('message');
    expect(data.message).to.equal('Installed successfully');
  });
});
