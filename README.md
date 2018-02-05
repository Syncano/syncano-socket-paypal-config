# paypal-config

[![CircleCI](https://circleci.com/gh/Syncano/syncano-socket-paypal-config.svg?style=svg)](https://circleci.com/gh/Syncano/syncano-socket-paypal-config)

`version:` **0.0.1**

PayPal configuration on Syncano

To install, run:

```
syncano-cli add paypal-config
```

## Classes

### `paypal_config` schema

| Name | Type | Filtering | Ordering
| ---- | ---- | --------- | --------
| PAYPAL_CLIENT_ID | string | false | false
| PAYPAL_CLIENT_SECRET | string | false | false
| PAYPAL_MODE | string | false | false

## Endpoints

### install

Install AWS config.

#### Parameters

| name | type | description
| ---- | ---- | -----------
| PAYPAL_CLIENT_ID | string | PayPal app Client ID
| PAYPAL_CLIENT_SECRET | string | PayPal app secret
| PAYPAL_MODE | string | Configuration mode, which is 'sandbox' for testing or 'live' for production



#### Response

mimetype: `application/json`

##### Successfully installed `200`

```
{
  "message": "Installed successfully"
}
```

##### Unauthorize `403`

```
{
  "message": "You are not authorised for this action"
}
```

##### Installation failure `400`

```
{
  "message": "Error installing PayPal config"
}
```
