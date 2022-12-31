const express = require('express');
const mongoose= require('mongoose');

const FormateurSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },


});

const Formateurs = mongoose.model('Formateur',FormateurSchema );

module.exports = Formateurs;

