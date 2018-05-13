'use strict'

const getTokens = require('../index')

describe('Get Tokens', () => {
	it('should convert characters to marked pinyin', () => {
		return getTokens('我的猫喜欢喝牛奶')
		.then(tokens => {
			tokens.map(token => token.traditional)
				.join(' ').should.equal('我 的 貓 喜歡 喝 牛奶')
		})
	})
})
