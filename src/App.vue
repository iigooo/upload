<template>
    <div id="app">
        <el-container>
            <el-main>
                <el-button type="primary" @click="doUpload">上传文件</el-button>
            </el-main>
        </el-container>
        <el-dialog v-if="openFileDialog" :visible.sync="openFileDialog" :modal-append-to-body="true"
                   append-to-body :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
                   width="776px">
            <upload-file ref="upload" :data="attachmentFromData" :headers="headers" :onSuccess="handleSuccess"
                         :action="action"></upload-file>
            <span slot="footer" class="dialog-footer" style="padding-right:10px;"><el-button
                    @click="openFileDialog = false">关 闭</el-button><el-button type="primary"
                                                                              v-show="false">保 存</el-button></span>
        </el-dialog>
    </div>
</template>

<script>
    import app from "@/app";

    export default app;
</script>

<style lang="less">
    @import url(./assets/styles/public.less);
</style>
