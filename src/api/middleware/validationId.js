import mongoose from 'mongoose'

export const ValidationId = (req, res, next) => {
  if (req.params.id) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({'message': 'Not found'});
    }
  }
  return next();
}