<template>
    <div class="role_progress-container">
        <div class="role_progress-progress">
            <el-steps :active="active" finish-status="success">
                <el-step v-for="(item,index) in progress" :key="index" :title="item.name"></el-step>
            </el-steps>
            <el-button class="choose" type="primary" @click="enterNext" v-if="progress.length > 0">
                <template>
                    <span v-if="active === progress.length">重新开始</span>
                    <span v-else>下一步</span>
                </template>
            </el-button>
        </div>
        <div class="role_progress-detail" v-if="active < progress.length">
            <div>示例图:</div>
            <div class="role_progress-image" v-if="picUrl !== null">
                <img :src= picUrl alt="">
            </div>
            <div>具体步骤:</div>
          <div class="role_progress-desc">
            <span v-for="(item,index) in progress[active].info" :key="index">{{ item }}</span>
          </div>

        </div>
    </div>  
</template>

<script>
    import {NetLoader} from "@/net";

    export default {
        name: "RoleProgress",
        props: {
            progress: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                loader: new NetLoader("test"),
                active: 0,
                image : null,
                picUrl : ""
            }
        },
        methods: {
            enterNext() {
                this.active = (this.active + 1)%(this.progress.length + 1);
                this.getImage()
            },
          getImage() {
            const id = this.progress[this.active].avatar;
            this.picUrl = "files/findFileById?id="+id

          }


        },
      created() {
          this.getImage()
           console.log("url是"+ this.picUrl)
      },
      watch: {
            progress() {
                this.active = 0;
            }
        }
    }
</script>

<style lang="less" scoped>
.role_progress-container {
    padding:  10px;
    width:   1000px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    .role_progress-progress {
        width: 100%;
        border-bottom: 1px solid #dcdfe6;
        padding: 20px;
    }
    .choose {
        margin-top: 20px;
        margin-left: 50%;
        transform: translateX(-50%);
    }

    .role_progress-detail {
        width: 100%;
        padding: 10px;
        margin-top: 30px;
        // overflow-y: scroll;

        .role_progress-image {
            img {
                width: 320px;
                height: auto;
                border-radius: 10px;
            }
        }
    }
}
</style>