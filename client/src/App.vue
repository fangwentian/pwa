<template>
    <div id="page">
        <notice/>
        <headerTop/>
        <div class="g-ct">
            <aside class="g-sd" id="partner-leftside">
                <sideNav/>
            </aside>
            <content class="g-bd hidden" id="maincnt">
                <div class="g-bd_title">
                    <i class="leftBar"></i>
                    {{pageTitle}}
                </div>
                <el-card id="maincnt_content">
                    <router-view/>
                </el-card>
            </content>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import headerTop from './components/layout/headerTop.vue';
import sideNav from './components/layout/sideNav.vue';

export default {
    name: 'App',
    components: {
        headerTop,
        sideNav
    },
    computed: {
        ...mapState({
            pageTitle: state => state.routeMeta.pageTitle
        })
    },
    data() {
        return {
            isExtend: true,
            frameworkData: {
                pages: window._syncData && window._syncData.pages || [],
                pageName: window._syncData && window._syncData.pageName || 'index-index'
            }
        }
    },
    methods: {
        
    }
};
</script>

<style lang="less">
#page {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100%;
}
.g-sd {
    transition: margin-left .4s ease;
}

.g-ct {
    display: flex;
    width: 100%;
    min-height: calc(100vh - 48px);
    min-width: 1px;
    flex: 1;
}
.g-sd {
    position: relative;
    z-index: 2;
    color: #fff;
    width: 216px;
    background-color: rgb(84, 92, 100);
    border-right: solid 1px #e6e6e6;
    &.col-sm-2 {
        padding: 0px;
    }
    .sidebar {
        width: @side-width;
        transition: all 0.3s ease;
    }
    .j-toggle {
        position: absolute;
        right: -11px;
        top: 50%;
        transform: translateY(-100%);
        margin-top: @top-height;
        width: 12px;
        padding: 30px 0;
        cursor: pointer;
        background: #d2d6da;
        text-align: center;

        &:hover {
            background: @kaola-green;
        }
        i {
            font-size: 14px;
            font-weight: bold;
        }
    }
    .j-toggle.fold {
        left: 0;
        .icon{
            background-position: 0 -25px;
        }
    }
}
.g-bd {
    flex: 1;
    overflow: auto;
    padding: 0 16px 200px;
    transition: all 0.4s ease;
    position: relative;
    background: @body-bg;
}

.g-bd_title {
    display: flex;
    align-items: center;
    height: 48px;
    font-size: 16px;
    line-height: 48px;
    font-weight: bold;
    .leftBar {
        display: inline-block;
        height: 16px;
        width: 4px;
        margin-right: 8px;
        margin-top: -2px;
        background: @kaola-green;
    }
}
.g-bd_content {
    .m-card {
        margin-top: 0;
    }
    margin-bottom: 200px;
}
</style>

<style>
.el-menu {
    border-right: none;
}
</style>
