<style lang="stylus" src="../css/app.styl"></style>

<template lang="pug">
#app
    .container-fluid
        .row
            .col-3
                ChatList(@switchChat='switchChat')
            .col-9
                MessageList(ref='messageList')
</template>

<script>
import ChatList from './component/ChatList';
import MessageList from './component/MessageList';
import { addListener } from '../js/clientIO.js';

export default {
    methods: {
        switchChat(id) {
            // console.log(id);
            this.$refs.messageList.switchChat(id);
            // console.log();
        },
        clientIDMessageHandler(data) {
            this.$refs.messageList.newMessage(data);
            // console.log(data);
        },
    },
    mounted() {
        addListener(this.clientIDMessageHandler);
    },
    components: {
        ChatList,
        MessageList,
    },
};
</script>
