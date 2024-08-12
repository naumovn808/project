const express = require('express')
const productSchema = require('../models/ProductSchema')
require('dotenv').config()
const router = express.Router()

// unfiltered products
router.get('/', async (req, res) => {
	try {
		const products = await productSchema.find({}).limit(12)
		res.status(200).send({ message: products })
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: error })
	}
})
// show more

router.get('/more', async (req, res) => {
	try {
		const amount = req.params.amount
		const products = await productSchema.find({}).limit(amount + 12)
		res.status(200).send({ message: products })
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: error })
	}
})

// filter products
router.post('/filter', async (req, res) => {
	try {
		const filters = req.body
		if (filters.chosens) {
			const chosenProductId = await userSchema.findOne(
				{ _id: req.user.id },
				{ chosen }
			)
		}
		const FindParameter = Object.keys(filters).forEach(key => {
			if (filters[key] != 'chosens') filters[key] = { $in: filters[key] }
		})
		const filteredProducts = await productSchema
			.find(FindParameter)
			.limit(12)
			.lean()
		res.status(200).send({ message: filteredProducts })
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: error })
	}
})
module.exports = router
