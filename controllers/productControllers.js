const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");
const { Product, validate } = require("../models/product");

module.exports.createProduct = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(err);
    if (err) return res.status(400).send("Something went wrong!");
    const { error } = validate(
      _.pick(fields, ["name", "description", "price", "category", "quantity"])
    );
    if (error) return res.status(400).send(error.details[0].message);

    const product = new Product(fields);

    if (files.photo) {
      // <input type="file" name="photo" />
      fs.readFile(files.photo.path, (err, data) => {
        if (err) return res.status(400).send("Problem in file data!");
        product.photo.data = data;
        product.photo.contentType = files.photo.type;
        product.save((err, result) => {
          if (err) res.status(500).send("Internal Server error!");
          else
            return res.status(201).send({
              message: "Product Created Successfully!",
              data: _.pick(result, [
                "name",
                "description",
                "price",
                "category",
                "quantity",
              ]),
            });
        });
      });
    } else {
      return res.status(400).send("No image provided!");
    }
  });
};

// Query Parameter
// api/product?order=desc&sortBy=name&limit=10
module.exports.getProducts = async (req, res) => {
  console.log(req.query);
  let order = req.query.order === "desc" ? -1 : 1;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const products = await Product.find()
    .select({ photo: 0 })
    .sort({ [sortBy]: order })
    .limit(limit)
    .populate("category", "name");
  return res.status(200).send(products);
};

module.exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId)
    .select({ photo: 0 })
    .populate("category", "name");

  if (!product) return res.status(404).send("Not Found");
  else return res.status(200).send(product);
};

module.exports.getPhoto = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId).select({
    photo: 1,
    _id: 0,
  });
  res.set("Content-Type", product.photo.contentType);

  return res.status(200).send(product.photo.data);
};

module.exports.updateProductById = async (req, res) => {
  //Get Product by Id
  //Collect from data
  //Update Provide Form Fields
  //Update Photo(If required)

  const productId = req.params.id;
  const product = await Product.findById(productId);

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).send("Something wrong!!");

    const updatedFields = _.pick(fields, [
      "name",
      "description",
      "price",
      "category",
      "quantity",
    ]);
    _.assignIn(product, updatedFields);

    if (files.photo) {
      fs.readFile(files.photo.path, (err, data) => {
        if (err) return res.status(400).send("Something wrong!!");
        product.photo.data = data;
        product.photo.contentType = files.photo.type;

        product.save((err, result) => {
          if (err) return res.status(500).send("Something Failed!!!");
          else
            return res.status(200).send({
              message: "Product Updated Successfully!!!",
            });
        });
      });
    } else {
      product.save((err, result) => {
        if (err) return res.status(500).send("Something Failed!!!");
        else
          return res.status(200).send({
            message: "Product Updated Successfully!!!",
          });
      });
    }
  });
};

module.exports.filterProducts=async(req,res)=>{
    let order=req.body.order==='desc'?-1:1;
    let sortBy=req.body.sortBy?req.body.sortBy:'_id';
    let limit=req.body.limit?parseInt(req.body.limit):10;
    let skip=parseInt(req.body.skip);

    const products=await Product.find()
    .select({photo:0})
    .populate('category','name')
    .sort({[sortBy]:order})
    .skip(skip)
    .limit(limit);

    return res.status(200).send(products);
}
