<template>
    <div id="case_list">
        <div id="header">
            <h1>病例总览</h1>
            
        </div>
        <div class="case_list-container" v-if="this.token != 0">
            <Disease_list />
            <Disease_selector />
            <div><el-button style="margin-left: 10%;margin-top:20px;" type="primary" size="small" v-on:click="navigate" v-if="this.$store.state.type == 'user'">进入模拟诊断</el-button></div>
        </div>
        <div v-else>
            <el-empty description="您暂未登录，无法查看病例信息"></el-empty>
        </div>
    </div>
</template>

<script>
import Disease_list from '@/component/Disease_list.vue';
import Disease_selector from '@/component/Disease_selector.vue';
import { NetLoader } from '@/net';
export default {
    name: "Case_list",
    data() {
        return {
            token: 0,
            loader: new NetLoader("test")
        };
    },
    methods: {
        navigate: function () {
            console.log(1)
            this.$router.replace('/home/disease_simulator')
        }
    },
    created() {
        this.token = window.sessionStorage.getItem("token")
    },
    components: { Disease_list,Disease_selector },
}
</script>

<style scoped lang="less">
#case_list {
    width: 100%;
    height: wrap-content;
    margin: 0;
    margin-left:2%;
}

#header {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>