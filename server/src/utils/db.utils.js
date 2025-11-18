
const createDoc = async (Model, data) => {
  const doc = await Model.create(data);
  return doc;
};

const findById = async (Model, id, populate = '') => {
  const doc = await Model.findById(id).populate(populate);
  return doc;
};

const findOne = async (Model, query, populate = '', select = '') => {
  const doc = await Model.findOne(query).select(select).populate(populate);
  return doc;
};

const findAll = async (Model, query = {}, populate = '') => {
  const docs = await Model.find(query).populate(populate);
  return docs;
};

const updateById = async (Model, id, updateData, options = { new: true, runValidators: true }) => {
  const updatedDoc = await Model.findByIdAndUpdate(id, updateData, options);
  return updatedDoc;
};

const deleteById = async (Model, id) => {
  const deletedDoc = await Model.findByIdAndDelete(id);
  return deletedDoc;
};

module.exports = {
  createDoc,
  findById,
  findOne,
  findAll,
  updateById,
  deleteById
}