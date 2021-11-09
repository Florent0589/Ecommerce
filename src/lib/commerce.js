import Commerce from '@chec/commerce.js'

const publicKey = process.env["REACT_APP_CHEC_PUBLIC_KEY"];
export const commerce = new Commerce(publicKey, true);
