const Joi = require('joi')
const { join } = require('redis/lib/commands')
const validatorSchema = Joi.object({
    Name: Joi.string().required(),
    Email: Joi.string().required(),
    Address: Joi.string().required(),
    Password: Joi.string().required(),
    Img: Joi.string().required()
})

function validatorUserSchema(req, res, next) {
    try {
        let validate = validatorSchema.validate(req.body)
        if (validate.error) {
            res.send(validate.error)
        }
        else {
            next()
        }
    }
    catch (err) {
        return err
    }
}

const validatorLoginSchema = Joi.object({
    Email: Joi.string().required(),
    Password: Joi.string().required(),
    DeviceId: Joi.string().required(),
    DeviceToken: Joi.string().required()   

})
function validatorUserLoginSchema(req, res, next) {
    try {
        let validate = validatorLoginSchema.validate(req.body)
        if (validate.error) {
            res.send(validate.error)
        }
        else {
            next()
        }
    }
    catch (err) {
        return err
    }
}
const AdminSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    RoleAdmin: Joi.string().required(),
    Id1: Joi.string().required(),
})

function validatorAdminSchema(req, res, next) {
    try {
        let validate = AdminSchema.validate(req.body)
        if (validate.error) {
            res.send(validate.error)
        }
        else {
            next()
        }
    }
    catch (err) {
        return err
    }
}
const adminLoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()

})
function validatorAdminLoginSchema(req, res, next) {
    try {
        let validate = adminLoginSchema.validate(req.body)
        if (validate.error) {
            res.send(validate.error)
        }
        else {
            next()
        }
    }
    catch (err) {
        return err
    }
}

module.exports = { validatorUserLoginSchema, validatorUserSchema, validatorAdminSchema, validatorAdminLoginSchema }
