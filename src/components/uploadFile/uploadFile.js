export default {
    name: "uploadFile",
    props: {
        data: {
            type: Object
        },
        onSuccess: {
            type: Function
        },
        headers: {
            type: Object
        },
        tag: {
            type: String,
            default: 'DC'
        },
        action: {
            type: String,
            default: () => {
                return ''
            }
        }
    },
    data() {
        const _this = this;
        return {
            fileList: [],
            uploadFiles: [],
            uploadSuccess: false,
            fileAction: '/api/File/onPostUploadAsync',
            showButton: this.value,
            successFile: 0,
            httpRequestList: [],
            ops: _this.$ops,
            tempIndex: 0
        };
    },
    methods: {
        clickUpload() {
            this.$refs.file.dispatchEvent(new MouseEvent("click"));
        },
        handleStart(files) {
            let _this = this;
            files.uid = Date.now() + this.tempIndex++;
            let file = {
                name: files.name,
                size: _this.handleSize(files.size),
                percentage: 0,
                files: files,
                status: "ready"
            };

            if (!file.size) {
                _this.$cMessage.error('文件大小超出512M');
                return
            }
            _this.uploadFiles.push(file);
        },
        handleSuccess(res, file) {
            let _this = this;
            file.status = "success";
            file.percentage = "上传完成";
            _this.onSuccess(res);
        },
        handleFail(file) {
            file.status = "fail";
            file.percentage = "上传失败";
        },
        uploadProgress(progressEvent, file) {
            file.status = "uploading";
            file.percentage = (progressEvent.loaded / progressEvent.total).toFixed(2) * 100 + "%";
            if (file.percentage === '100%') {
                file.percentage = 99 + '%'
            }
        },
        afresh(file) {
            let _this = this;
            _this.upload(file);
        },
        //选择文件
        getFile(evt) {
            let _this = this;
            for (let index = 0; index < evt.target.files.length; index++) {
                _this.handleStart(evt.target.files[index]);
            }
            _this.submit();
        },
        submit() {
            let _this = this;
            this.uploadFiles.filter(file => file.status === "ready").map(item => _this.upload(item));
        },

        //上传
        upload(file) {
            let _this = this;
            if (_this.action) {
                _this.fileAction = _this.action;
            }
            //大于1M 才分包上传
            if (file.files.size > 1048576) {
                let start = 0, end = 1048576;
                let blob = file.files.slice(start, end);
                blob.name = file.files.name;
                blob.lastModified = file.files.lastModified;
                blob.lastModifiedDate = file.files.lastModifiedDate;
                blob.uid = file.files.uid;
                blob.webkitRelativePath = file.files.webkitRelativePath;
                while (start < file.files.size) {
                    let form = new FormData();
                    form.append("file", blob);
                    _this.execUpload(file, form)
                    start += 1048576;
                    end += 1048576;
                }
            } else {
                let form = new FormData();
                form.append("file", file.files);
                _this.execUpload(file, form)
            }
        },
        //执行上传请求
        execUpload(file, form) {
            let _this = this;
            let cancelToken = _this._$.CancelToken;
            _this._$.post(_this.fileAction, form, {
                timeout: 0,
                headers: _this.headers,
                onUploadProgress: function (progressEvent) {
                    _this.uploadProgress(progressEvent, file);
                },
                cancelToken: new cancelToken(function executor(c) {
                    _this.httpRequestList.push(c);
                })
            }).then(data => {
                    if (data.data.errorCode === 200) {
                        _this.handleSuccess(data.data, file);
                    } else {
                        _this.handleFail(file);
                    }
                }, err => {
                    console.log(err)
                    _this.handleFail(file);
                }
            );
        },
        //3中状态：等待，上传中，已完成，
        uploadDel(index) {
            let _this = this;
            _this.uploadFiles.splice(index, 1);
            _this.fileList.splice(index, 1);
        },
        uploadStop(index) {
            let _this = this;
            this.httpRequestList[index]();
            _this.uploadFiles[index].status = "fail";
            _this.uploadFiles[index].percentage = "上传失败";
        },
        enterDrop(e) {
            let _this = this;
            e.stopPropagation();
            e.preventDefault(); //必填字段
            console.log(e.dataTransfer.files);
            for (let index = 0; index < e.dataTransfer.files.length; index++) {
                _this.handleStart(e.dataTransfer.files[index]);
            }
            _this.submit();
        },
        handleSize(size) {
            let fileSizeByte = size;
            if (fileSizeByte > 536870912) return false
            if (fileSizeByte < 1048576)
                return (fileSizeByte / 1024).toFixed(2) + "KB";
            else if (fileSizeByte == 1048576) return "1MB";
            else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
                return (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
        }
    },
    watch: {},
    mounted() {
        console.log(this.headers);
        let drag = document.getElementById("drag");
        drag.addEventListener("drop", this.enterDrop, false);
        drag.addEventListener("dragleave", function (e) {
            e.stopPropagation();
            e.preventDefault();
        });
        drag.addEventListener("dragenter", function (e) {
            e.stopPropagation();
            e.preventDefault();
        });
        drag.addEventListener("dragover", function (e) {
            e.stopPropagation();
            e.preventDefault();
        });
    }
};
