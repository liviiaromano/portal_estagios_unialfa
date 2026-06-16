import "dotenv/config";

export default {
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      "naopassaprangm",

    expiresIn:
      process.env.JWT_EXPIRES_IN ||
      "1d",
  },
};