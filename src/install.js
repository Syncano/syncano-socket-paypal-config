import Syncano from '@syncano/core';
import validateRequired from './utils/helpers';

export default async (ctx) => {
  const server = new Syncano(ctx);
  const { response, data } = server;

  try {
    const { PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = ctx.args;
    validateRequired({ PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET });

    const paypalId = await data.paypal_config.firstOrCreate({}, {});
    await data.paypal_config.update(paypalId.id,
      { PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET });
    return response.json({ message: 'Installed successfully' }, 200);
  } catch ({ status, ...errorDetails }) {
    return response.json(errorDetails, status || 400);
  }
};
