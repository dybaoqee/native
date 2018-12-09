/* eslint-disable no-console */
import detox from 'detox'
import detoxAdapter from 'detox/runners/jest/adapter'

import pkg from '../package.json'

jest.setTimeout(120000)
jasmine.getEnv().addReporter(detoxAdapter)

beforeAll(async function() {
  await detox.init(pkg.detox)
})

beforeEach(async function() {
  await detoxAdapter.beforeEach()
})

afterAll(async function() {
  await detoxAdapter.afterAll()
  await detox.cleanup()
})
