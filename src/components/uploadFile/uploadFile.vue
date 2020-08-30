<template>
    <div id="upload" class="upload">
        <input type="file" name id ref="file" @change="getFile" multiple style="display:none;"/>
        <header class="upload__header">
            <el-button type="info" plain @click="clickUpload"
                       style="height: 32px;padding: 0 16px; background: #35AB47;color: #FFF;">
                <div style="display: flex;align-items: center;">
                    <img src="../../assets/images/uploadFile/uploadButton.png" alt height="16px" width="16px"/><span
                        style="margin-left:8px">添加文件</span>
                </div>
            </el-button>
        </header>
        <div class="table">
            <div class="table__header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" style="width:100%" class="table__header">
                    <thead>
                    <tr>
                        <th colspan="2" rowspan="1">
                            <div class="cell">文件名</div>
                        </th>
                        <th colspan="1" rowspan="1">
                            <div class="cell">大小</div>
                        </th>
                        <th colspan="1" rowspan="1">
                            <div class="cell">状态</div>
                        </th>
                        <th colspan="1" rowspan="1">
                            <div class="cell">操作</div>
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="table__body-wrapper">
                <vue-scroll :ops="ops">
                    <table cellspacing="0" cellpadding="0" border="0" class="table__body">
                        <tbody>
                        <tr v-for="(item,index) in uploadFiles" :key="index" class="progress__number">
                            <td rowspan="1" colspan="2">
                                <div class="cell" style="color:#2B2E33;font-weight:400;">{{item.name}}</div>
                            </td>
                            <td colspan="1" rowspan="1" style="color:#8A8F99">
                                <div class="cell">{{item.size}}</div>
                            </td>
                            <td colspan="1" rowspan="1"
                                :class="{successColor:item.status == 'success',failColor:item.status == 'fail',uploading:item.status == 'uploading'}">
                                <div class="cell">{{item.percentage}}</div>
                            </td>
                            <td colspan="1" rowspan="1">
                                <div class="cell">
                                    <a class="action" style="color:#67C23A;" v-if="item.status === 'fail'"
                                       @click="afresh(item)">重新上传</a>
                                    <a class="action" style="color:#3B7CFF;" @click.stop="uploadStop(index)"
                                       v-if="item.status === 'uploading'">取消</a>
                                    <a class="action" style="color:#F56C6C;" @click.stop="uploadDel(index)"
                                       v-if="item.finish">删除</a>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </vue-scroll>
            </div>
        </div>
        <div class="upload__noDate" v-if="!uploadFiles.length">
            <div class="upload__button" id="drag" @click="clickUpload" draggable="false">
                <div class="upload__images" draggable="false">
                    <img src="../../assets/images/uploadFile/no_img.png" alt/>
                    <span class="upload__tips">单击空白处或将文件拖曳到此处上传</span>
                    <span class="upload__size">附件大小不超过512M</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import uploadFile from "./uploadFile";

    export default uploadFile;
</script>

<style lang="less">
    @import url(../../assets/styles/uploadFile/uploadFile.less);
</style>
