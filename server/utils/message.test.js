const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'Justin';
    let text = 'Hi';
    
    let message = generateMessage(from, text);
    expect(message).toMatchObject({from, text});
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate accurate location message', () => {
    let from = 'Admin';
    let lat = 15
    let long = 19;
    let url = 'https://www.google.com/maps?q=15,19';
    let locationMessage = generateLocationMessage(from, lat, long);
    expect(typeof locationMessage.createdAt).toBe('number');
    expect(locationMessage).toMatchObject({from ,url});
  });
});