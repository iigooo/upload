<template>
    <div id="app">
        <el-container v-loading="loading">
            <el-main>
                <!--                <el-button type="primary" @click="doUpload">上传文件</el-button>-->
                <div class="wrapper full clear">
                    <label>姓名:{{user.userName}}</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>职务:{{user.duty}}</label>
                    <el-input placeholder="请输入用户名称" v-model="filterText" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
                    </el-input>
                    <div class="padding_24 float_left half">
                        <div class="font_size_24">16版本数据结果</div>
                        <div class="font_size_20">角色</div>
                        <el-table :data="role16" highlight-current-row
                                  :cell-style="{height:'32px',fontSize:'12px'}"
                                  :header-cell-style="{height:'32px',background: '#F2F6FC',fontSize:'12px',color: '#8A8F99'}">
                            <el-table-column prop="id" label="Id" width="300"></el-table-column>
                            <el-table-column prop="name" label="名称" width="350"></el-table-column>
                            <el-table-column prop="status" label="状态"></el-table-column>
                        </el-table>
                        <div class="font_size_20">菜单</div>
                        <el-table :data="menu16" highlight-current-row
                                  :cell-style="{height:'32px',fontSize:'12px'}"
                                  :header-cell-style="{height:'32px',background: '#F2F6FC',fontSize:'12px',color: '#8A8F99'}">
                            <el-table-column prop="id" label="Id" width="300"></el-table-column>
                            <el-table-column prop="name" label="名称" width="350"></el-table-column>
                            <el-table-column prop="status" label="状态"></el-table-column>
                        </el-table>
                    </div>
                    <div class="padding_24 float_left half">
                        <div class="font_size_24">20版本数据结果</div>
                        <div class="font_size_20">角色</div>
                        <el-table :data="role20" highlight-current-row
                                  :cell-style="{height:'32px',fontSize:'12px'}"
                                  :header-cell-style="{height:'32px',background: '#F2F6FC',fontSize:'12px',color: '#8A8F99'}">
                            <el-table-column prop="id" label="Id" width="300"></el-table-column>
                            <el-table-column prop="name" label="名称" width="350"></el-table-column>
                            <el-table-column prop="status" label="状态"></el-table-column>
                        </el-table>
                        <div class="font_size_20">菜单</div>
                        <el-table :data="menu20" highlight-current-row
                                  :cell-style="{height:'32px',fontSize:'12px'}"
                                  :header-cell-style="{height:'32px',background: '#F2F6FC',fontSize:'12px',color: '#8A8F99'}">
                            <el-table-column prop="id" label="Id" width="300"></el-table-column>
                            <el-table-column prop="name" label="名称" width="350"></el-table-column>
                            <el-table-column prop="status" label="状态"></el-table-column>
                        </el-table>
                    </div>
                </div>
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
    @import url(./assets/styles/app.less);
</style>
