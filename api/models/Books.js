const express = require("express");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: false,
    },
    tag: {
        type: String,
        required:false,
    },
    chapters:  [{
        chapter_number : Number,
        chapter_title: String,
        description : String,
        
    }],
    bookimg: {
        type: String,
        default: "https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg",
    },
    chapterdetails:
    {
        type: Boolean,
        default:false,
    },
});

const Books = mongoose.model("Books", BookSchema)

module.exports = Books;
