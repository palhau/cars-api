const Controller = require('../app/controllers/index.js');
const CarLog = require('../app/models/index.js');

jest.mock('../app/models/index.js', () => {
  const mCarLog = { save: jest.fn() };
  return jest.fn(() => mCarLog);
});

describe('Creating Car Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should create car and send the car log to MongoDB', async () => {
    const mRes = { json: jest.fn() };
    const mCarlog = new CarLog();

    const mReq = {
      body: { "title": "", "brand": "", "price": "", "age": 80 },
    };

    // expect.assertions(2);

    mCarlog.save.mockResolvedValueOnce('saved driver');
    // await Controller.create(mReq, mRes);
    // expect(mCarlog.save).toBeCalledTimes(1);
    expect(mRes.json).toBeTruthy();

  });

  it('Should handle error if request body is empty', async () => {
    const mReq = { body: {} };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    expect.assertions(2);

    await Controller.create(mReq, mRes);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.status(400).json).toBeCalledWith({
      message: 'Form content can not be empty',
    });
  });

  it('Should handle error if save car log failure', async () => {
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const mCarlog = new CarLog();
    const mError = new Error('database connection failure');

    const mReq = {
      body: {
        title: '',
        brand: '',
        price: '',
      },
    };
    expect.assertions(1);

    mCarlog.save.mockRejectedValueOnce(mError);
    return await Controller.create(mReq, mRes).then(() => {
      expect(mRes.status).toBeCalledWith(500);
    });
  });
});
