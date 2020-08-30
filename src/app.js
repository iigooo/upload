import uploadFile from '@/components/uploadFile/uploadFile.vue'
import openBox from "@/components/openBox/openBox.vue";

export default {
    name: 'App',
    data() {
        return {
            openFileDialog: false,
            attachmentFromData: {
                remark: "",
                name: "",
                attachPressId: ""
            },
            action: '/api/File/onPostUploadAsync',
        }
    },
    computed: {
        headers() {
            return {
                Accept: 'application/json',
            }
        },
    },
    components: {
        uploadFile,
        openBox
    },
    methods: {
        doUpload() {
            let _this = this;
            _this.openFileDialog = true;
        },
        handleSuccess(response) {
            console.log(response)
        },
    }
}
