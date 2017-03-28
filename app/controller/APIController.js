const express = require('express');

const router = express.Router();
// const config = require('../config');
// const moment = require('moment');
const ChatModel = require('../model/ChatModel.js');
const MessageModel = require('../model/MessageModel.js');


module.exports = function (app) {
    console.log('APIControll.js');

    // var db = mongoose.connection;

    function dateFormat() {
        const d = new Date();
        return `${d.getFullYear()}/${d.getMonth()}`;
    }
    router.use((req, res, next) => {
        // console.log(req.method, req.originalUrl, moment().format('YYYY/MM/DD hh:mm:ss'));
        next();
    });

    router.route('/')
        .get((req, res) => {
            res.json({ status: 'ok', message: 'welcome to github.medialand.tw rest api!!' });
        })
        .post((req, res) => {
            const value = req.body.value;
            res.json({ status: 'ok', message: 'post', value: value || '' });
        });

    router.route('/chat')
        .get(async (req, res) => {
            const result = await ChatModel.find();
            res.json({ status: 'ok', result });
        })
        .post(async (req, res) => {
            const name = req.body.name;
            const data = { name, createUser: req.session.objectId };
            const result = new ChatModel(data).save();
            res.json({ status: 'ok', result });
        });

    router.route('/message/:id')
        .get(async (req, res) => {
            const chatId = req.params.id;
            // console.log(chatId);
            const result = await MessageModel.findWithRef({ chat: chatId });
            res.json({ status: 'ok', result });
        })
        .post(async (req, res) => {
            const who = req.body.who;
            const chat = req.body.chat;
            const message = req.body.message;
            const data = {
                who, chat, message,
            };
            console.log(chat);

            const result = await new MessageModel(data).save();
            res.json({ status: 'ok', result });
        });


    app.use('/api', router);
};
