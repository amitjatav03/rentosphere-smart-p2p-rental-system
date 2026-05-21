const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const {

    createRental,

    getRenterRentals,

    getLenderRentals,

    getSingleRental,

    acceptRental,

    rejectRental,

    payRental,

    completeRental,

    getLenderSummary

} = require('../controllers/rental.controller');

// ================= CREATE =================

router.post('/', auth, createRental);

// ================= GET =================

router.get('/me', auth, getRenterRentals);

router.get('/lender', auth, getLenderRentals);

router.get('/lender/summary', auth, getLenderSummary);

router.get('/:id', auth, getSingleRental);

// ================= ACTIONS =================

router.patch('/:id/accept', auth, acceptRental);

router.patch('/:id/reject', auth, rejectRental);

router.patch('/:id/pay', auth, payRental);

router.patch('/:id/complete', auth, completeRental);

module.exports = router;