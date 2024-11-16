const express = require('express');
const partnerRouter = express.Router();
const Partner = require('../models/partner');

partnerRouter.route('/')
.get((req, res, next) => {
    Partner.find()
    .then(partners => res.status(200).json(partners))
    .catch(err => next(err));
})
.post((req, res) => {
    Partner.create(req.body)
    .then(partner => res.status(200).json(partner))
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})
.delete((req, res) => {
    Partner.deleteMany()
    .then(response => res.status(200).json(response))
    .catch(err => next(err));
});

partnerRouter.route('/:partnerId')
.get((req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => res.status(200).json(partner))
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST not supported');
})
.put((req, res) => {
    Partner.findByIdAndUpdate(req.params.partnerId, req.body, { new: true })
    .then(partner => res.status(200).json(partner))
    .catch(err => next(err));
})
.delete((req, res) => {
    Partner.findByIdAndDelete(req.params.partnerId)
    .then(partner => res.status(200).json(partner))
    .catch(err => next(err));
});

module.exports = partnerRouter;