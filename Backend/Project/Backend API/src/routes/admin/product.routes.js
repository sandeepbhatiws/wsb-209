const express = require('express');
const { viewParentCategories } = require('../../controllers/admin/subCategory.controller');
const { viewSubCategories } = require('../../controllers/admin/subSubCategory.controller');
const { viewSubSubCategories, viewColors, viewMaterials, create, view, update, details, changeStatus, destroy } = require('../../controllers/admin/product.controller');
const multer  = require('multer')
var upload = multer({ dest: 'uploads/products' })
var path = require('path');

const route = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const imageExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix+imageExtension)
  }
})

var upload = multer({ storage: storage })
const uploadMiddleware = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }])

module.exports = server  => {

  route.post('/materials', upload.none(), viewMaterials)

  route.post('/colors', upload.none(), viewColors)

  route.post('/parent-categories', upload.none(), viewParentCategories)

  route.post('/sub-categories', upload.none(), viewSubCategories)

  route.post('/sub-sub-categories', upload.none(), viewSubSubCategories)

  route.post('/create', uploadMiddleware, create)

  route.post('/view', upload.none(), view)

  route.put('/update/:id', uploadMiddleware, update)

  route.post('/details/:id', upload.none(), details)

  route.put('/change-status', upload.none(), changeStatus)

  route.put('/delete', upload.none(), destroy)

  server.use('/api/admin/products', route);
}