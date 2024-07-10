const express = require('express')
const bcrypt = require('bcrypt')
const userSchema = require('../models/UserSchema')
require('dotenv').config()
const router = express.Router()
module.exports = router
