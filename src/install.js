import Server from 'syncano-server';
import validateRequired from './utils/helpers';

export default async (ctx) => {
  const server = Server(ctx);
  const { response, data } = server;
  try {
    if (!ctx.meta.admin) {
      return response.json({ message: 'You are not authorised for this action' }, 403);
    }
    const { PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = ctx.args;
    validateRequired({ PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET });

    const paypalConfig = await data.paypal_config.firstOrCreate({}, {});
    await data.paypal_config.update(paypalConfig.id,
      { PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET });

    return response.json({ message: 'Installed successfully' }, 200);
  } catch (err) {
    const { customMessage, details, status, message } = err;
    if (customMessage) {
      return response.json({ message: customMessage, details }, 400);
    }
    if (status) {
      return response.json({ message }, status);
    }
    return response.json({ message: 'Error installing PayPal config' }, 400);
  }
};
