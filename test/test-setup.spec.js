/**
 * Created by thareau on 30/05/17.
 */
const sinon = require('sinon')
const chai = require('chai')
import 'babel-polyfill'


beforeEach(function () {
	this.sandbox = sinon.sandbox.create()
})

afterEach(function () {
	this.sandbox.restore()
})
