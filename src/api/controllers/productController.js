import User from "../../models/User";
import Product from "../../models/Product";

let _productService = null;

export class ProductController {

  constructor(productService) {
    _productService = productService;
  }

  async create (req, res) {
    const relationsValid = await _productService.checkProductData(req.body);
    if (!relationsValid) {
      return res.status(400).json({message: "Invalid fields"});
    }
    const product = await _productService.create(req.body);
    return res.status(200).json(product);
  }

  async get (req, res) {
    if (req.params.id) {
      const product = await _productService.getById(req.params.id);
      if (!product) return res.status(404).json({message: "Not found"});
      return res.status(200).json(product);
    }
    const products = await _productService.getAll();
    return res.status(200).json(products);
  }

  async update (req, res) {
    const product = await Product.findById(req.params.id).activeOne();
    if (!product) return res.status(404).json({message: "Not found"});

    const relationsValid = await _productService.checkProductData(req.body);
    if (!relationsValid) {
      return res.status(400).json({message: "Invalid fields"});
    }

    const response = await _productService.update(req.params.id, req.body);
    return res.status(200).json(response);
  }

  async delete (req, res) {
    try {
      const product = await _productService.delete(req.params.id);
      return res.status(200).json({message: "successful"});
    } catch (e) {
      return res.status(404).json({message: "Not found"});
    }
  }
}
