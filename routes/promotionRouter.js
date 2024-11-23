const express = require('express');
const promotionRouter = express.Router();
const Promotion = require('../models/promotion');
const authenticate = require('../authenticate');

promotionRouter.route('/')
.get((req, res, next) => {
    Promotion.find()
    .then(promotions => res.status(200).json(promotions))
    .catch(err => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Promotion.create(req.body)
    .then(promotion => res.status(200).json(promotion))
    .catch(err => next(err));
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Promotion.deleteMany()
    .then(response => res.status(200).json(response))
    .catch(err => next(err));
});

promotionRouter.route('/:promotionId')
.get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => res.status(200).json(promotion))
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('POST not supported');
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, req.body, { new: true })
    .then(promotion => res.status(200).json(promotion))
    .catch(err => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
    .then(promotion => res.status(200).json(promotion))
    .catch(err => next(err));
});

module.exports = promotionRouter;