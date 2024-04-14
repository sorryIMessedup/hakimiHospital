<template>
  <div class="hospital_roomdetail-container">
    <div class="hospital_room-header">
        <el-page-header @back="goBack" content="平面导览主页">
        </el-page-header>
    </div>
    <div class="hospital_room-detail">
      <div class="hospital_room-leftDetail">
        <RoomSvg
          backgroundColor="#7fb9ba"
          :height="300"
          :width="300"
          @click="changeScene"
          >前台大厅</RoomSvg
        >
        <RoomSvg
          :height="200"
          :width="200"
          :x="300"
          :y="0"
          backgroundColor="#659cc3"
          @click="changeScene"
          >手术室</RoomSvg
        >
        <RoomSvg
          :height="250"
          :width="250"
          :x="300"
          :y="200"
          backgroundColor="#ccdad4"
          @click="changeScene"
          >诊室</RoomSvg
        >
        <RoomSvg
          :height="150"
          :width="150"
          :x="500"
          :y="0"
          backgroundColor="#c7eafe"
          @click="changeScene"
          >病例剖析室</RoomSvg
        >
        <RoomSvg
          :height="50"
          :width="50"
          :x="500"
          :y="150"
          backgroundColor="#cdc1b4"
          @click="changeScene"
          >免疫室</RoomSvg
        >
        <RoomSvg
          :height="100"
          :width="100"
          :x="550"
          :y="150"
          backgroundColor="#31c8ca"
          @click="changeScene"
          >药房</RoomSvg
        >
        <RoomSvg
          :height="100"
          :width="100"
          :x="550"
          :y="250"
          backgroundColor="#3d74ce"
          @click="changeScene"
          >手术准备室</RoomSvg
        >
        <RoomSvg
          :height="100"
          :width="100"
          :x="550"
          :y="350"
          backgroundColor="#aff0ff"
          @click="changeScene"
          >住院部</RoomSvg
        >
        <RoomSvg
          :height="50"
          :width="100"
          :x="200"
          :y="400"
          backgroundColor="#b7c6c8"
          @click="changeScene"
          >档案室</RoomSvg
        >
        <RoomSvg
          :height="100"
          :width="100"
          :x="0"
          :y="300"
          backgroundColor="#d3dde5"
          @click="changeScene"
          >化验室</RoomSvg
        >
        <RoomSvg
          :height="100"
          :width="100"
          :x="100"
          :y="300"
          backgroundColor="#86b5ee"
          @click="changeScene"
          >影像室</RoomSvg
        >
        <RoomSvg
          :height="100"
          :width="100"
          :x="200"
          :y="300"
          backgroundColor="#deb900"
          @click="changeScene"
          >处置室</RoomSvg
        >
        <RoomSvg
          :height="50"
          :width="200"
          :x="0"
          :y="400"
          backgroundColor="#d0c9c4"
          @click="changeScene"
          >专科检查室</RoomSvg
        >
      </div>
      <div class="hospital_room-rightDetail">
        <div class="hospital_room-generalInfo">
          <div class="hospital_room-name">
            <span>科室名称: </span>{{ $route.query.room }}
          </div>
          <div class="hospital_room-image">
            <img :src="roomDetail.image" alt="" />
          </div>
          <div class="hospital_room-introduction">
            <p>{{ roomDetail.desc }}</p>
          </div>
        </div>
        <div class="hospital_room-detailInfo">
          <div v-for="(obj, index) in roomObjs" :key="index" class="detail">
            <div class="title">{{ obj.title }}</div>
            <div class="item" v-for="(item, index) in obj.arr" :key="index">
              <span class="item-image">
                <img :src="item.image" alt="" />
              </span>
              <span class="item-name">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { rooms } from "./data";
import RoomSvg from "@/component/RoomSvg.vue";
export default {
  name: "RoomDetail",
  components: {
    RoomSvg,
  },
  data() {
    return {
      roomDetail: null,
      roomObjs: [],
    };
  },
  methods: {
    changeScene(scene) {
      this.$router.push(`/detail?room=${scene}`);
    },
    goBack() {
        this.$router.push("/home")
    }
  },
  beforeUpdate() {
    let room = this.$route.query.room;
    this.roomDetail = rooms[room];
    this.roomObjs = [];
    for (let key in this.roomDetail) {
      if (Array.isArray(this.roomDetail[key])) {
        let obj = {
          title: key,
          arr: this.roomDetail[key],
        };
        this.roomObjs.push(obj);
      }
    }
  },

  created() {
    let room = this.$route.query.room;
    this.roomDetail = rooms[room];
    for (let key in this.roomDetail) {
      if (Array.isArray(this.roomDetail[key])) {
        let obj = {
          title: key,
          arr: this.roomDetail[key],
        };
        this.roomObjs.push(obj);
      }
    }
  },
};
</script>

<style lang="less" scoped>
.hospital_room-header {
    height: 60px;
    display: flex;
    align-items: center;
	background-color: #fff;
    border-bottom: 1px solid rgb(220, 220, 220);
}
.hospital_room-detail {
  display: flex;
  padding: 10px 20px;
  flex-direction: row;
  .hospital_room-leftDetail {
    flex-basis: 50%;
    height: 400px;
    position: relative;
  }
  .hospital_room-rightDetail {
    flex: 1;
    margin-left: 20px;
    padding: 10px 10px 0 0;
    .hospital_room-generalInfo {
      width: 100%;
      background: #ebeef5;
      border-radius: 10px;
      padding: 10px;
      box-sizing: border-box;
      .hospital_room-introduction {
        p {
          text-indent: 2em;
        }
      }
      * {
        margin-bottom: 10px;
      }
      img {
        width: 100%;
        height: 300px;
      }
    }
    .hospital_room-detailInfo {
      width: 100%;
      .detail {
        width: 100%;
        padding: 10px;
        background: #ebeef5;
        border-radius: 10px;
        margin-top: 10px;
        box-sizing: border-box;
        .title {
          margin-bottom: 10px;
          border-bottom: 1px solid #dcdfe6;
          padding: 10px;
        }
        .item {
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
          &:hover {
            background: #fff;
          }
          .item-image {
            vertical-align: text-top;
            margin-right: 20px;
            display: inline-block;
            img {
              width: 80px;
              height: 60px;
            }
          }
        }
      }
    }
  }
}
</style>