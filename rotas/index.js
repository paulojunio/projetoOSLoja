const express = require('express')
const router = require('express').Router()

router.use('/', require('./material'))
router.use('/', require('./roupa'))
router.use('/', require('./confeccao'))
router.use('/', require('./resultado'))

module.exports = router