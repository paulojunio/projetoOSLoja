const express = require('express')
const router = require('express').Router()

router.get('/material' , (req, res) => {
    res.json({
        titulo: 'Meu primeiro post'
    })
}) 

module.exports = router