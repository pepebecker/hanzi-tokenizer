'use strict'

const mdbg = require('mdbg')

const tokenizer = async (text, opts = {}) => {
	const list = []
	let index = 0
	while (index < text.length) {
		let count = text.length - index
		let wordFound = false
		while (count >= 0) {
			const word = text.substr(index, count)
			try {
				const entry = await mdbg.getByHanzi(word)
				index += count - 1
				if (list.length === 0 || typeof list[list.length - 1] === 'string' || !opts.spaces) {
					list.push(entry)
				} else {
					list.push(' ', entry)
				}
				wordFound = true
				break
			} catch (err) {
				if (err.type !== 'NotFoundError') console.error(err)
			}
			count--
		}
		if (!wordFound && opts.everything) {
			if (typeof list[list.length - 1] === 'string') {
				list[list.length - 1] += text[index]
			} else {
				list.push(text[index])
			}
		}
		index++
	}
	return list
}

module.exports = tokenizer
module.exports.init = mdbg.init
