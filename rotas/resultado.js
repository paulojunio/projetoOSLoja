const express = require('express')
const router = require('express').Router()

router.get('/resultado' , (req, res) => {
    res.json({
        titulo: 'Meu primeiro post'
    })
}) 

module.exports = router