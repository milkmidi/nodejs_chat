<style lang="stylus">
.message-list-root
    padding-bottom 10px
</style>

<template lang="pug">
.message-list-root
    h1 Message

    .message-list
        MessageItem(v-for="item in messageList" ,:message-data="item")


    .row
        .col-12
            .form-inline
                form.form-group(@submit.prevent="submit")
                    input.form-control.col-9(v-model="input")
                    button.btn.btn-primary.col-3 Submit
</template>

<script>
import axios from 'axios';
import MessageItem from './MessageItem';
import { emit } from '../../js/clientIO';

export default{
    data() {
        return {
            input: '',
            currentChatId: '',
            messageList: [],
        };
    },
    watch: {
        messageList() {
            this.scrollBodyToBottom();
        },
    },
    mounted() {
        // this.switchChat('58d49f672f82c60f3046eb6b');
    },
    methods: {
        async submit() {
            console.log('submit');

            const data = {
                who: window.userObjectId,
                // name: window.userName,
                chat: this.currentChatId,
                message: this.input,
            };
            const res = await axios({
                method: 'POST',
                url: `api/message/${this.currentChatId}`,
                data,
            });
            this.input = '';
            data.created_date = Date.now();
            data.who = {
                name: window.userName,
            };
            this.messageList.push(data);
            emit(data);
            // console.log(res.data);
        },
        async switchChat(id) {
            console.log('switchChat', id);
            this.currentChatId = id;
            const res = await axios(`api/message/${id}`);
            this.messageList = res.data.result;
            // console.log(res.data.result);
        },
        scrollBodyToBottom() {
            this.$nextTick(() => {
                document.body.scrollTop = document.body.scrollHeight;
            });
        },
        newMessage(data) {
            if (data.chat === this.currentChatId) {
                this.messageList.push(data);
            }
        },
    },
    components: {
        MessageItem,
    },
};
</script>
