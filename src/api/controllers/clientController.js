export class ClientController {

  constructor(clientService) {
    this.clientService = clientService;
  }

  async create (req, res) {
    return res.status(200).json({
      message: "create client"
    });
  }

  async get (req, res) {
    return res.status(200).json({
      message: "get client"
    });
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
