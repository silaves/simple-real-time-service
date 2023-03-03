let  service = null;

export class ClientController {

  constructor(clientService) {
    service = clientService;
  }

  async create (req, res) {
    const user = await service.create(req.body);

    return res.status(200).json(user);
  }

  async get (req, res) {
    const users = await service.getAll();

    return res.status(200).json(users);
  }

  async update (req, res) {
    return res.status(200).json({
      message: "update client"
    });
  }

  async delete (req, res) {
    return res.status(200).json({
      message: "delete client"
    });
  }
}
