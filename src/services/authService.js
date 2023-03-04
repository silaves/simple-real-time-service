import Profile from "../models/Profile";
import User from "../models/User";
import {comparePassword,makePassword,generateJWT} from "../utils/authUtils";

let _appConfig = null;

export class AuthService {

  constructor (appConfig) {
    _appConfig = appConfig;
  }

  async signIn (email, password) {
    return await this.verifyPassword(email, password);
  }

  async signUp (userData) {
    const {profile} = userData;

    try {
      const prof = await Profile.create({
        ...userData,
        password: makePassword(profile.password)
      });
      const user = await User.create({
        ...userData,
        profile: prof._id
      });

      const jwtData = {
        data: user.toObject(),
        symmetricSecret: _appConfig.jwt.secret,
        algorithm: _appConfig.jwt.algorithm,
        issuer: _appConfig.jwt.issuer,
        audience: _appConfig.jwt.audience,
        expiration: _appConfig.jwt.expiration,
      };
      return await generateJWT(jwtData);
    } catch (e) {
      throw new Error(`Failed to SignUp user due to: ${e}`);
    }
  }

  async verifyPassword (email, password) {
    try {
      const user = await User.findOne({email: email}).populate('profile');
      if (!user) return false;

      return comparePassword(password, user.profile.password);
    } catch (e) {
     return false;
    }
  }

  async existEmail (email) {
    const user = await User.findOne({email: email});

    return !!user;
  }

}
