const express = require('express')
const router = express.Router()

const connection = require('../config/db')
const {body, validationResult} = require('express-validator')

router.get('/', function(req,res){
    connection.query('SELECT * FROM post order by id desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message:'Data posts :',
                data: rows
            })
        }
    })
})

router.post('/store', [
    body('tittle').notEmpty(),
    body('user_id').notEmpty(),
    body('body').notEmpty(),
    body('slug').notEmpty(),
    body('photos').notEmpty(),
    body('category_id').notEmpty(),
    body('excerpt').notEmpty(),
], (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let Data = {
        tittle: req.body.tittle,
        user_id: req.body.user_id,
        body: req.body.body,
        slug: req.body.slug,
        photos: req.body.photos,
        category_id: req.body.category_id,
        excerpt: req.body.excerpt,
    }
    connection.query('insert into post set ? ', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error : err
            })
        } else {
            return res.status(201).json({
                status: true,
                message:'Post Create',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function(req,res) {
    let id= req.params.id
    connection.query(`select * from post where id = ${id}`, function(err,rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server error',
                error: err,
            })
        }
        if(rows.length <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message:'data post :',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id',[
    body('tittle').notEmpty(),
    body('user_id').notEmpty(),
    body('body').notEmpty(),
    body('slug').notEmpty(),
    body('photos').notEmpty(),
    body('category_id').notEmpty(),
    body('excerpt').notEmpty(),
], (req,res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let id = req.params.id
    let data = {
        tittle: req.body.tittle,
        user_id: req.body.user_id,
        body: req.body.body,
        slug: req.body.slug,
        photos: req.body.photos,
        category_id: req.body.category_id,
        excerpt: req.body.excerpt,
    }
    connection.query(`update post set ? where id = ${id}`, data, function(err,rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server error',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'update',
                data:rows[0]
            })
        }
    })
})

router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id
    connection.query(`delete from post where id = ${id}`, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server error'
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data di hapus'
            })
        }
    })
})

module.exports = router