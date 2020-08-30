export default {
    name: "openBox",
    props: {
        //标题
        title: String,
        //图标
        icon: String,
        showFooter: {
            type: Boolean,
            default: function () {
                return true;
            }
        },
        /*2020/4/28 添加 close图标是否展示*/
        showClose: {
            type: Boolean,
            default: function () {
                return true;
            }
        },
        /**
         * 元素结构 {text:'',icon:'',type:'',name:''}
         */
        antherButton: {
            type: Array, default: function () {
                return []
            }
        },
        contPadding: {
            type: Object,
            default: function () {
                return {'padding': '24px 48px', bottom: '50px'}
            }
        },
        dialogPadding: {
            type: Object,
            default: function () {
                return {'padding-bottom': '49px'}
            }
        },
        /*2020.07.13添加，自定义底部button的padding*/
        footerPadding: {
            type: Object,
            default: function () {
                return {'padding': '0 20px'}
            }
        },
        /**
         * 保存按钮 默认是保存
         */
        saveText: {type: String, default: '保存'},
        loading: {type: Boolean, default: false},
        needScroll: {
            type: Boolean,
            default: true
        },
        showCancleButton: {
            type: Boolean,
            default: true
        }
    },
    data() {
        let _this = this;
        let ops = _this.$ops;
        ops.bar.keepShow = true;
        ops.rail.keepShow = true;
        return {
            ops: ops
        }
    },
    mounted() {
        let _this = this;
        _this.$nextTick(() => {
        })
    },
    computed: {},
    methods: {
        save() {
            let _this = this;
            _this.$emit('save');
        },
        cancel() {
            let _this = this;
            _this.$emit('close-box');
        },
        /**
         * 自定义函数拓展
         * @param emitName
         */
        handleEmit(emitName) {
            let _this = this;
            _this.$emit('call', emitName);
        },
    },
    watch: {},
}
