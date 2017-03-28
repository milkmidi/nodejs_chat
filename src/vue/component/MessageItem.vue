<style lang="stylus" scoped>
.message-item-root
    border 1px solid #e3e3e3
    border-radius 10px
    margin 10px 0
    padding 10px
.name
    font-size 14px
.message-text
    padding 10px
    background-color #c3c3c3
    border-radius 3px
    margin 6px 0 0
    display inline-block
.message-date
    display inline-block
    margin-left 10px
    font-size 11px
</style>

<template lang="pug">
.message-item-root
    .top
        span.name {{parseName(messageData.who)}}
        .message-date {{messageData.created_date}}
    .message-text {{messageData.message}}
</template>


<script>
export default{
    props: ['messageData'],
    data() {
        return {

        };
    },
    methods: {
        parseName(value) {
            if (value) {
                return value.name;
            }
            return '';
        },
        /*parseDate( date ){
            var d = new Date(date);
            // return d.getMonth()+1
        }*/
    },
    mounted() {

    },
};
</script>
