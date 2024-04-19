<template>
    <div id="basic_structure">

        <el-row>
            <el-col v-for="section in section_list" :key="section" style="align-items: center;">
                <el-card class="box-card" shadow="hover" v-on:click.native="show_detail(section)"><h1>{{ section }}</h1></el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "Test_management",
    data() {
        return {
            section_list:["试题管理", "试卷管理", "考试管理"]
        }
    },
    methods: {
        show_detail: function (name) {
            let s = ""
            switch (name) {
                case "试题管理": s = "/question_management"; break;
                case "试卷管理": s = "/paper_management"; break;
                case "考试管理": s = "/exam_management"; break;
            }
            this.$router.push({
                path: "/admin" + s
            })
        }
    }
}
</script>

<style lang="less" scoped>
#basic_structure{
    width:100%;
    align-items: center;
    height: calc(100vh - 120px);
.box-card{
    text-align: center;
    width:600px;
    margin: auto;
    margin-top:30px;
}
}
</style>