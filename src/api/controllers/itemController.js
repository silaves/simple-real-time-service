import Item from "../../models/Item";

let  _itemService = null;

export class ItemController {

  constructor(itemService) {
    _itemService = itemService;
  }

  async create (req, res) {
    const user = await _itemService.create(req.body);

    return res.status(200).json(user);
  }

  async get (req, res) {
    if (req.params.id) {
      const item = await _itemService.getById(req.params.id);
      if (!item) return res.status(404).json({message: "Not found"});
      return res.status(200).json(item);
    }
    const items = await _itemService.getAll();
    return res.status(200).json(items);
  }

  async update (req, res) {
    const item = await Item.findById(req.params.id).activeOne();
    if (!item) return res.status(404).json({message: "Not found"});

    const response = await _itemService.update(req.params.id, req.body);
    return res.status(200).json(response);
  }

  async delete (req, res) {
    try {
      console.log('delete')
      const item = await _itemService.delete(req.params.id);
      return res.status(200).json({message: "successful"});
    } catch (e) {
      return res.status(404).json({message: "Not found"});
    }
  }
}
