/* eslint-disable no-console */
import detox from 'detox'
import detoxAdapter from 'detox/runners/jest/adapter'

import pkg from '../package.json'

jest.setTimeout(160000)
jasmine.getEnv().addReporter(detoxAdapter)

beforeAll(() => detox.init(pkg.detox))

beforeEach(() => detoxAdapter.beforeEach())

afterAll(() => detoxAdapter.afterAll())

afterAll(() => detox.cleanup())
