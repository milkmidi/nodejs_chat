<style lang="stylus">
.inner
    position fixed
    top 0
    left 0
    ul
        li
            a
                cursor pointer
</style>

<template lang="pug">
.chat-list-root
    .inner
        ul
            li(v-for="item in chatList")
                a(@click="switchChat(item)") {{item.name}}
        label 新增
        input.form-control(v-model="input")
        button.btn.btn-primary(@click="addChat") Add
</template>

<script>
import axios from 'axios';

export default{
    data() {
        return {
            input: '',
            chatList: [],
        };
    },
    methods: {
        async addChat() {
            const data = {
                name: this.input,
            };
            const res = await axios({ method: 'post', url: '/api/chat', data });
            // console.log(this.input);
            this.reloadChatList();
            this.input = '';
        },
        async reloadChatList() {
            const res = await axios('/api/chat');
            this.chatList = res.data.result;
            return new Promise(resolve => resolve());
            // console.log(res.data.result);
        },
        switchChat(item) {
            this.$emit('switchChat', item._id);
            // console.log(item._id);
        },
    },
    async mounted() {
        await this.reloadChatList();
        this.switchChat(this.chatList[0]);
        // console.log(this.chatList);
    },
};
</script>
