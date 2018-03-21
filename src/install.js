import Syncano from '@syncano/core';
import validateRequired from './utils/helpers';

export default async (ctx) => {
  const server = new Syncano(ctx);
  const { response, data } = server;

  try {
    const { PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = ctx.args;
    validateRequired({ PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET });

    const checkInstallation = await data.paypal_config.first();
    if (checkInstallation) {
      await data.paypal_config.update(checkInstallation.id,
        { PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET });
    } else {
      await data.paypal_config.create({ PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET });
    }
    return response.json({ message: 'Installed successfully' }, 200);
  } catch ({ details, status, message }) {
    if (details) {
      return response.json({ message, details }, 400);
    }
    if (status) {
      return response.json({ message }, status);
    }
    return response.json({ message: 'Error installing PayPal config' }, 400);
  }
};
