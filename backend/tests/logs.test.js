const requestLogs = require('supertest');
const appLogs = require('../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Log = require('../models/Log');
const { insertAttendance } = require('../services/attendanceService');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Log.deleteMany({});
    await Log.create({
        action: 'insert',
        previousRecord: null,
        newRecord: { uin: 'A12345678', classId: 'CS101' },
        updatedBy: 'TestUser',
        updatedAt: new Date()
    })
});

describe('Logs API', () => {
    it('should get logs list', async () => {
        const response = await requestLogs(appLogs).get('/logs');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('action', 'insert');
    });
});