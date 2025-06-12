const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Attendance = require('../models/Attendance');
const Log = require('../models/Log')

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {});

    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.error.mockRestore();
});

beforeEach(async () => {
    await Attendance.deleteMany({});
    await Log.deleteMany({});
});


describe('Attendance API', () => {
    it('should insert a new attendance record', async () => {
        const response = await request(app)
        .post('/attendance')
        .send({
            action: 'insert', 
            data: {
                uin: 'A12345678',
                classId: 'CS411',
                takenBy: 'TestUser',
                date: '20240101'
            }
        });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
    });

    it('should edit an existing attendance record', async () => {
        // insert a data first
        const inserted = await Attendance.create({
            uin: 'A12345678',
            classId: 'CS411',
            date: '20240101',
            takenBy: 'TestUser',
        });

        const res = await request(app)
        .post('/attendance')
        .send({
            action: 'edit',
            data: {
                uin: 'A12345678',
                classId: 'CS411',
                date: '20250101',
                takenBy: 'TestUser'
            }
        });

        const logs = await Log.find({});
        // expect(logs.length).toBe(1);
        expect(logs[0].action).toBe('edit');
        expect(logs[0].previousRecord.date).toBe('20240101');
        expect(logs[0].newRecord.date).toBe('20250101');
    }); 

    it('should return error when editing non-existing record', async() => {
        const res = await request(app)
        .post('/attendance')
        .send({
            action: 'edit',
            data: {
                uin: 'nonexistent',
                classId: 'CS411',
                date: '20250131',
                takenBy: 'Me'
            }
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Original attendance record not found');
    });


    it('should return 400 for invalid action', async () => {
        const response = await request(app)
        .post('/attendance')
        .send({
            action: 'delete',
            data: {}
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});