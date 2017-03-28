/* eslint-env node, mocha */

/* eslint no-underscore-dangele:off */

// const mongoose = require('mongoose');
const AccountModel = require('../app/model/AccountModel.js');
const ChatModel = require('../app/model/ChatModel.js');
const MessageModel = require('../app/model/MessageModel.js');

require('../app/config/database.js')();

/*
describe('AccountModel', () => {
 it('save', (done) => {
    const account = new AccountModel({
      name: 'test',
    });
    account.save().then((res) => {
      console.log(res);
      done();
    });
  });

  it('find', (done) => {
    AccountModel.find().then((res) => {
      console.log(res);
      done();
    });
  });
});*/


describe('ChatModel', () => {
  /* it('save', (done) => {
    const chat = new ChatModel({
      name: 'test_chat',
    });
    chat.save().then((res) => {
      console.log(res);
      done();
    });
  });*/

  /* it('find', (done) => {
    ChatModel.find().then((res) => {
      console.log(res);
      done();
    });
  });*/
});

describe('MessageModel', () => {
    it('save', (done) => {
        (async function () {
            const account = await AccountModel.findOne();
            console.log(account._id);

            const chat = await ChatModel.findOne();
            console.log(chat._id);

            const msg = new MessageModel({
                who: account,
                message: 'test1234',
                chat,
            });
            const result = await msg.save();
            console.log(result);

            /*
            chat.messages.push(msg);
            await chat.save();*/
            done();
        }());
    });
});
