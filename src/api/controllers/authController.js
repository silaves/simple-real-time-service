import User from "../../models/User";
import {generateJWT} from "../../utils/authUtils";
import {Schemas, ValidationSchema} from "../middleware/validationSchema";

let  _authService = null;
let  _appConfig = null;

export class AuthController {

  constructor(authService, appConfig) {
    _authService = authService;
    _appConfig = appConfig;
  }

  async signUp (req, res) {
    const valid = await ValidationSchema(Schemas.userCreate, req.body);
    if (!valid) return res.status(400).json({message: "Invalid params"});

    const existEmail = await _authService.existEmail(req.body.email);
    if (existEmail) return res.status(400).json({message: "Email already exist"});

    try {
      const token = await _authService.signUp(req.body);
      return res.status(200).json({
        token: token
      });
    } catch (e) {
      console.log(e)
      return res.status(401).json({
        message: "Not authorized"
      });
    }
  }

  async signIn (req, res) {
    const valid = await ValidationSchema(Schemas.login, req.body);
    if (!valid) return res.status(400).json({message: "Invalid params"});

    const validCredentials = await _authService.signIn(req.body.email, req.body.password);
    if (!validCredentials){
      return res.status(401).json({message: "Not authorized"});
    }
    const user = await User.findOne({email: req.body.email});
    const jwtData = {
      data: user.toObject(),
      symmetricSecret: _appConfig.jwt.secret,
      algorithm: _appConfig.jwt.algorithm,
      issuer: _appConfig.jwt.issuer,
      audience: _appConfig.jwt.audience,
      expiration: _appConfig.jwt.expiration,
    };
    const token = await generateJWT(jwtData, user);
    return res.status(200).json({
      token: token
    });
  }
}
