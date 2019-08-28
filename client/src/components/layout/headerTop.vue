<template>
    <header class="g-hdtop">
        <a href="\" class="link">
            <span>Demo</span>
        </a>
        <span class="userinfo">
            <span class="userName">
                {{userName}}
                <i class="el-icon-arrow-down"></i>
            </span>
        </span>
    </header>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        name: 'headerTop',
        data() {
            return {
                userName: '小考拉'
            }
        },
        created() {
            
        },
        methods: {

        }
    })
</script>

<style lang="less" scoped>
.link {
    text-decoration: none;
    font-size: 20px;
}
.g-hdtop {
    display: flex;
    align-items: center;
    height: @top-height;
    width: 100%;
    color: @kaola-white-65;
    font-size: 14px;
    background: #222; 
    box-shadow: 0 2px 4px 0 rgba(176,191,196,0.50);
    padding: 0 24px 0 16px;
    line-height: 22px;

    >a {
        color: @kaola-white;
        display: flex;
        align-items: center;
        flex: 1;
    }
    .logo {
        width: 148px;
    }
    .title {
        color: #fff;
        font-size: @font-size-title;
        line-height: @line-height-title;
        font-weight: bold;
    }
    .message {
        margin-right: 24px;
        a {
            color: @kaola-white-65;
        }
    }
    .message:hover a{
        color: #fff;
    }
    .userinfo {
        position: relative;
        cursor: pointer;
        white-space: nowrap;
        padding-right: 40px;
        .userName:hover {
            color: #fff;
        }
        .arrow {
            position: relative;
            top: 2px;
        }
    }
    .userinfo-expand {
        position: absolute;
        right: 0;
        top: 20px;
        visibility: hidden;
        opacity: 0;
        z-index: 1111;
        transition: all 0.3s ease;
        box-shadow: 0 4px 4px rgba(0,0,0,0.06);
        >li {
            width: 96px;
            height: 40px;
            background: #fff;
            border: 1px solid rgba(0,0,0,0.09);
            text-align: center;
            line-height: 40px;
            color: rgba(0,0,0,0.65);
        }
        >li:hover {
            background: #f2fffc;
        }
        a {
            display: inline-block;
            width: 100%;
            height: 100%;
            color: rgba(0,0,0,0.65);
        }
    }
    .userinfo-expand.visible {
        visibility: visible;
        top: 36px;
        opacity: 1;
    }
}
.u-header-badge {
    display: inline;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    padding: .2em .6em .3em;
    font-size: 11px;
    line-height: 1;
    background: #f86b6b;
    color: #fff;
    border-radius: 1000px;
}
</style>