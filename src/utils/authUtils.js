import * as jose from "jose";
import bcrypt from "bcrypt";

export const generateJWT = async (jwtData) => {
  const {
    data,
    symmetricSecret,
    algorithm,
    issuer,
    audience,
    expiration,
  } = jwtData;
  const secretToken = new TextEncoder().encode(symmetricSecret);

  return await new jose.SignJWT(data)
    .setProtectedHeader({alg: algorithm})
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(expiration)
    .sign(secretToken);
}

export const verifyJWT = async (jwtData, token) => {
  const {
    symmetricSecret,
    issuer,
    audience,
  } = jwtData;
  const secret = new TextEncoder().encode(symmetricSecret);

  try {
    const { payload } = await jose.jwtVerify(token, secret, {
      issuer: issuer,
      audience: audience,
    });

    return {valid: true, payload: payload};
  } catch (e) {
    return {valid: false, e};
  }
}

export const makePassword = (password) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export const comparePassword = (password, password2) => {
  const pass = bcrypt.compareSync(password, password2.replace(/^\$2y/, "$2a"));
  return !!pass;
}