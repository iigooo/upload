<template>
    <div class="commonDialog" :style="dialogPadding">
        <div class="commonDialog-header">
            <div class="commonDialog-header-icon">
                <!--                <i :class="icon"></i><i :class="icon"></i>-->
                <span class="commonDialog-header-title" v-html="title"></span></div>
            <div class="commonDialog-header-close">
                <img style="height: 100%;width: 100%;" @click="cancel" v-if="showClose"
                     src="../../assets/images/openBox/tab-close.png">
                <!--                                <i class="el-icon-close" @click="cancel" v-if="showClose"></i>-->
            </div>
        </div>
        <div class="commonDialog-main" :style="contPadding">
            <div class="parent-dom" v-if="needScroll">
                <vue-scroll :ops="ops">
                    <slot></slot>
                </vue-scroll>
            </div>
            <slot v-else></slot>
        </div>
        <div class="commonDialog-footer" v-if="showFooter" :style="footerPadding">
            <el-button @click="cancel" v-show="showCancleButton">取消</el-button>
            <el-button type="primary" :loading="loading" @click="save">{{saveText}}</el-button>
            <el-button :loading="loading" :icon="v.icon"
                       :type="v.type?v.type:'primary'"
                       v-for="(v,i) in antherButton" :key="i"
                       @click="handleEmit(v.name)">
                {{v.text}}
            </el-button>
        </div>
    </div>
</template>

<script>
    import openBox from "./openBox";

    export default openBox;
</script>

<style scoped>
    .parent-dom {
        height: 100%;
        width: 100%;
    }

    .commonDialog {
        font-size: 14px;
        /*padding-bottom: 49px;*/
        /*position: absolute;*/
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .commonDialog-header {
        height: 48px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*border-bottom: 1px solid #dadade;*/
        background: rgba(228, 231, 238, 1);
    }

    .commonDialog-header-icon {
        height: 24px;
        text-align: center;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .commonDialog-header-icon i {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: #78dae7;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
    }

    .commonDialog-header-title {
        padding-left: 5px;
        font-size: 16px;
        color: rgba(43, 46, 51, 1);
    }

    .commonDialog-header-close {
        width: 16px;
        height: 16px;
        /*font-size: 18px;*/
        cursor: pointer;
        /*display: flex;*/
    }

    .commonDialog-header-close:hover {
        color: #cccccc;
    }


    .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
        -webkit-box-shadow: 0px 3px 7px 0px rgba(211, 211, 211, 0.35);
        box-shadow: 0px 1px 1px 0px rgba(211, 211, 211, 0.35);
    }

    .commonDialog-main {
        /*position: absolute;*/
        bottom: 50px;
        top: 48px;
        left: 0;
        right: 0;
    }

    .commonDialog-main .el-input--mini .el-input__inner {
        border: none;
        border-bottom: 1px solid #DCDFE6;
    }

    .commonDialog-footer {
        position: absolute;
        height: 48px;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 20px;
    }
</style>
