const express = require('express');
const mongoose= require('mongoose');

const EntrepriseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event'
        }
    ]

});

const Entreprises = mongoose.model('entreprise',EntrepriseSchema );

module.exports = Entreprises;

