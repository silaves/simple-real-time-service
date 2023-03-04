import User from "../../models/User";

let _clientService = null;
let _authService = null;

export class ClientController {

  constructor(clientService, authService) {
    _clientService = clientService;
    _authService = authService;
  }

  async create (req, res) {
    const existEmail = await _authService.existEmail(req.body.email);
    if (existEmail) return res.status(400).json({message: "Invalid params", email: "Email already exists"});

    const user = await _clientService.create(req.body);
    return res.status(200).json(user);
  }

  async get (req, res) {
    if (req.params.id) {
      const user = await _clientService.getById(req.params.id);
      if (!user) return res.status(404).json({message: "Not found"});
      return res.status(200).json(user);
    }
    const users = await _clientService.getAll();
    return res.status(200).json(users);
  }

  async update (req, res) {
    const user = await User.findById(req.params.id).activeOne();
    if (!user) return res.status(404).json({message: "Not found"});

    const response = await _clientService.update(req.params.id, req.body);
    return res.status(200).json(response);
  }

  async delete (req, res) {
    try {
      const user = await _clientService.delete(req.params.id);
      return res.status(200).json({message: "successful"});
    } catch (e) {
      return res.status(404).json({message: "Not found"});
    }
  }
}
