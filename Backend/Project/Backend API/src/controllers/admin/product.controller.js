const { generateUniqueSlug } = require("../../config/slugGenerater");
var slugify = require('slugify');
const materialModel = require("../../models/Material");
const colorModel = require("../../models/Color");
const subSubCategoryModel = require("../../models/SubSubCategory");
const productModel = require("../../models/Product");

exports.viewMaterials = async(request, response) => {

    const andCondition = [
        {
            deleted_at : null, 
        }
    ];

    const orCondition = [{
        status : 1
    }];

    var sort = { _id : 'desc'}

    if(request.body){
        if(request.body.id){
            orCondition.push({ _id : request.body.id })
        }
    }

    var filter = { $and : andCondition }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    materialModel.find(filter)
    .select("name")
    .sort(sort)
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record Fetched !',
                _error : '',
                _data : result
            }

            response.send(data)
        } else {
            const data = {
                _status : false,
                _message : 'No Record Found !',
                _error : '',
                _data : []
            }

            response.send(data)
        }
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong !',
            _error : error,
            _data : []
        }

        response.send(data)
    })
}

exports.viewColors = async(request, response) => {

    const andCondition = [
        {
            deleted_at : null, 
        }
    ];

    const orCondition = [{
        status : 1
    }];

    var sort = { _id : 'desc'}

    if(request.body){
        if(request.body.id){
            orCondition.push({ _id : request.body.id })
        }
    }

    var filter = { $and : andCondition }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    colorModel.find(filter)
    .select("name")
    .sort(sort)
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record Fetched !',
                _error : '',
                _data : result
            }

            response.send(data)
        } else {
            const data = {
                _status : false,
                _message : 'No Record Found !',
                _error : '',
                _data : []
            }

            response.send(data)
        }
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong !',
            _error : error,
            _data : []
        }

        response.send(data)
    })
}

exports.viewSubSubCategories = async(request, response) => {

    const andCondition = [
        {
            deleted_at : null, 
        }
    ];

    const orCondition = [{
        status : 1
    }];

    var sort = { _id : 'desc'}

    if(request.body){
        if(request.body.id){
            orCondition.push({ _id : request.body.id })
        }

        if(request.body.parent_category_id){
            andCondition.push({ parent_category_id : request.body.parent_category_id })
        }

        if(request.body.sub_category_id){
            andCondition.push({ sub_category_id : request.body.sub_category_id })
        }
    }

    var filter = { $and : andCondition }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    subSubCategoryModel.find(filter)
    .select("name")
    .sort(sort)
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record Fetched !',
                _error : '',
                _data : result
            }

            response.send(data)
        } else {
            const data = {
                _status : false,
                _message : 'No Record Found !',
                _error : '',
                _data : []
            }

            response.send(data)
        }
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong !',
            _error : error,
            _data : []
        }

        response.send(data)
    })
}

exports.create = async(request, response) => {
    
    try {
        const dataSave = request.body;

        if(request.files){
            if(request.files.image){
                dataSave.image = request.files.image[0].filename;
            }

            var images = [];
            if(request.files.images){
                request.files.images.forEach((v) => {
                    images.push(v.filename);
                })
            }

            dataSave.images = images;
        }

        if(request.body.name){
            var slug = slugify(request.body.name, {
                lower: true,
                strict: true,
            })

            dataSave.slug = await generateUniqueSlug(productModel, slug);
        }

        productModel(dataSave).save()
        .then((result) => {
            const data = {
                _status : true,
                _message : 'Record Created !',
                _image_path : process.env.product_image_path,
                _error : '',
                _data : result
            }

            response.send(data)
        })
        .catch((error) => {
            var errors = {};
            for(var i in error.errors){
                errors[i] = error.errors[i].message;
            }

            const data = {
                _status : false,
                _message : 'Something went wrong !',
                _error : errors,
                _data : ''
            }

            response.send(data)
        })
    } catch (error) {
        const data = {
            _status : false,
            _message : 'Something went wrong !',
            _error : error,
            _data : ''
        }

        response.send(data)
    }
}

exports.view = async(request, response) => {
    
    var limit = 15;
    var skip = 0;
    var page = 1;

    const andCondition = [
        {
            deleted_at : null, 
        }
    ];

    const orCondition = [];

    var sort = { _id : 'desc'}

    if(request.body){
        if(request.body.limit){
            limit = request.body.limit;
        }

        if(request.body.page){
            page = request.body.page;
        }

        skip = (page - 1) * limit;

        if(request.body.name){
            var regex = new RegExp(request.body.name, 'i')
            andCondition.push({ name : regex })
        }

        if(request.body.parent_category_id){
            andCondition.push({ parent_category_id : request.body.parent_category_id })
        }

        if(request.body.sub_category_id){
            andCondition.push({ sub_category_id : request.body.sub_category_id })
        }
    }

    var filter = { $and : andCondition }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    var totalRecords = await productModel.find(filter).countDocuments();

    productModel.find(filter)
    // .select("name parent_category_id sub_category_id image status order")
    .sort(sort)
    .populate('parent_category_id', 'name')
    .populate('sub_category_id', 'parent_category_id name')
    .populate('sub_sub_category_id', 'parent_category_id sub_category_id name')
    .populate('color_ids', 'name')
    .populate('material_ids', 'name')
    .limit(limit).skip(skip)
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record Fetched !',
                _image_path : process.env.product_image_path,
                _paginate : {
                    current_page : page,
                    total_pages : Math.ceil(totalRecords/limit),
                    total_records : totalRecords
                },
                _error : '',
                _data : result
            }

            response.send(data)
        } else {
            const data = {
                _status : false,
                _message : 'No Record Found !',
                _error : '',
                _data : []
            }

            response.send(data)
        }
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong !',
            _error : error,
            _data : []
        }

        response.send(data)
    })
}

exports.details = async(request, response) => {
    productModel.findOne({
        _id : request.params.id,
        deleted_at : null
    })
    .populate('parent_category_id', 'name')
    .populate('sub_category_id', 'parent_category_id name')
    .populate('sub_sub_category_id', 'parent_category_id sub_category_id name')
    .populate('color_ids', 'name')
    .populate('material_ids', 'name')
    .then((result) => {
        if(result){
            const data = {
                _status : true,
                _message : 'Record Fetched !',
                _image_path : process.env.product_image_path,
                _error : '',
                _data : result
            }

            response.send(data)
        } else {
            const data = {
                _status : false,
                _message : 'No Record Found !',
                _error : '',
                _data : ''
            }

            response.send(data)
        }
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong !',
            _error : error,
            _data : []
        }

        response.send(data)
    })
}

exports.update = async(request, response) => {
    try {
        const dataSave = request.body;
        dataSave.updated_at = Date.now()

        if(request.files){
            if(request.files.image){
                dataSave.image = request.files.image[0].filename;
            }

            var images = [];
            if(request.files.images){
                request.files.images.forEach((v) => {
                    images.push(v.filename);
                })
            }

            dataSave.images = images;
        }

        var getData = await productModel.findById(request.params.id);

        if(request.body.name && getData.name != request.body.name){
            var slug = slugify(request.body.name, {
                lower: true,
                strict: true,
            })

            dataSave.slug = await generateUniqueSlug(productModel, slug);
        }

        productModel.findByIdAndUpdate(
            request.params.id,
            dataSave,
            { new: true, runValidators: true }
        )
        .then((result) => {
            const data = {
                _status : true,
                _message : 'Record Updated !',
                _error : '',
                _data : result
            }

            response.send(data)
        })
        .catch((error) => {

            var errors = {};
            for(var i in error.errors){
                errors[i] = error.errors[i].message;
            }

            const data = {
                _status : false,
                _message : 'Something went wrong !',
                _error : errors,
                _data : ''
            }

            response.send(data)
        })
    } catch (error) {
        const data = {
            _status : false,
            _message : 'Something went wrong !',
            _error : error,
            _data : ''
        }

        response.send(data)
    }
}

exports.changeStatus = async(request, response) => {

    productModel.updateMany(
        {
            _id : request.body.ids
        },
        [
            {
                $set : {
                    status : { $not: "$status" },
                    updated_at : Date.now()
                }
            }
        ],
        {
            updatePipeline: true
        }
    )
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Change Status succussfully.',
            _data : result
        }
        response.send(data);
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong.',
            _data : null,
            _error : error
        }
        response.send(data);
    })
}

exports.destroy = async(request, response) => {
    productModel.updateMany({
        _id : request.body.ids
    }, {
        $set : {
            deleted_at : Date.now()
        }
    })    
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record Deleted !',
            _error : '',
            _data : result
        }

        response.send(data)
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong !',
            _error : error,
            _data : ''
        }

        response.send(data)
    })
}