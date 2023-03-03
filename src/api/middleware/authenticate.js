import {verifyJWT} from "../../utils/authUtils";

export const authorize = (appConfig) => async (req, res, next) => {
  try {
    let jwt = req.headers.authorization;
    if (!jwt) {
      return res.status(401).json({ message: 'Invalid token ' });
    }

    if (jwt.toLowerCase().startsWith('bearer')) {
      jwt = jwt.slice('bearer'.length).trim();
    }

    const jwtData = {
      symmetricSecret: appConfig.jwt.secret,
      issuer: appConfig.jwt.issuer,
      audience: appConfig.jwt.audience
    };

    const validateToken = await verifyJWT(jwtData, jwt);

    if (validateToken.valid) {
      next();
    } else {
      res.status(401).json({ message: 'Invalid Token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to authenticate user' });
  }
};