/**
 *
 * vue 插件拓展
 * create by Mozi Zhang 2019-08-12
 *
 * */

import apiService from "./apiService";
import $ from "axios";


let baseVue = {};
baseVue.install = function (Vue) {
    Vue.prototype._$ = $;

    Vue.prototype.$http = new apiService();

    Vue.prototype.$ops = {
        vuescroll: {
            mode: 'native',
            sizeStrategy: 'percent',
            detectResize: true,
            wheelScrollDuration: 0,
            wheelDirectionReverse: false
        },
        scrollPanel: {
            initialScrollY: false,
            initialScrollX: false,
            scrollingX: true,
            scrollingY: true,
            speed: 300,
            easing: 'easeInQuad',
            verticalNativeBarPos: 'right'
        },
        rail: {
            background: '#01a99a',
            opacity: 0,
            size: '6px',
            specifyBorderRadius: false,
            gutterOfEnds: null,
            gutterOfSide: '2px',
            keepShow: false,
            border: 'none'
        },
        bar: {
            showDelay: 500,
            onlyShowBarOnScroll: true,
            keepShow: false,
            background: '#c1c1c1',
            opacity: 1,
            hoverStyle: false,
            specifyBorderRadius: false,
            minSize: false,
            size: '6px',
            disable: false,
        },
        scrollButton: {
            enable: false,
            background: 'rgb(3, 185, 118)',
            opacity: 1,
            step: 180,
            mousedownStep: 30
        }
    };

    /**
     * 被动提示--错误信息提示
     * @param message 提示信息
     */
    Vue.prototype.$cMessage = function (message) {
        Vue.prototype.$confirm(message, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'error'
        }).then(() => {
        }).catch(() => {
            // eslint-disable-next-line no-console
            console.log('取消删除');
        });
    }


    /**
     * 主动操作提示--选择提示
     * @param message 提示信息
     * @param done 操作回调函数
     */
    Vue.prototype.$sureAlert = function (message, done) {
        Vue.prototype.$confirm(message, '提示', {
            // dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showCancelButton: true,
            type: 'warning'
            // cancelButtonClass: 'cancelButtonClass',
            // confirmButtonClass: 'confirmButtonClass primary'
        }).then(() => {
            done && done();
        }).catch(() => {
            // eslint-disable-next-line no-console
            console.log('取消操作');
        });
    }

    /**
     * 主动操作提示--删除提示
     * @param message 提示信息
     * @param done 操作回调函数
     */
    Vue.prototype.$deleteAlert = function (message, done) {
        Vue.prototype.$confirm(message, '提示', {
            // dangerouslyUseHTMLString: false,
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            showCancelButton: true,
            // cancelButtonClass: 'cancelButtonClass',
            confirmButtonClass: 'confirmButtonClass-2',
            type: 'warning'
        }).then(() => {
            done && done();
        }).catch(() => {
            // eslint-disable-next-line no-console
            console.log('取消删除');
        });
    }

    /**
     * 主动操作提示--收藏成功提示信息
     * @param message 提示信息
     */
    Vue.prototype.$infoAlert = function (message) {
        Vue.prototype.$confirm(message, '提示', {
            // dangerouslyUseHTMLString: false,
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'success'
        }).then(() => {
        }).catch(() => {
            // eslint-disable-next-line no-console
            console.log('取消删除');
        });
    }
}
export default baseVue;
