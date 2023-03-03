import Category from "../../models/Category";

let  _categoryService = null;

export class CategoryController {

  constructor(categoryService) {
    _categoryService = categoryService;
  }

  async create (req, res) {
    const category = await _categoryService.create(req.body);

    return res.status(200).json(category);
  }

  async get (req, res) {
    if (req.params.id) {
      const category = await _categoryService.getById(req.params.id);
      if (!category) return res.status(404).json({message: "Not found"});
      return res.status(200).json(category);
    }
    const categorys = await _categoryService.getAll();
    return res.status(200).json(categorys);
  }

  async update (req, res) {
    const category = await Category.findById(req.params.id).activeOne();
    if (!category) return res.status(404).json({message: "Not found"});

    const response = await _categoryService.update(req.params.id, req.body);
    return res.status(200).json(response);
  }

  async delete (req, res) {
    try {
      const category = await _categoryService.delete(req.params.id);
      return res.status(200).json({message: "successful"});
    } catch (e) {
      return res.status(404).json({message: "Not found"});
    }
  }
}
