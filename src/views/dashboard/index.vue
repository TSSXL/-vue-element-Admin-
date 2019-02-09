<template>
  <div class="dashboard-container">
    <div class="left">
      <img src="./pencile.png" alt="铅笔">
    </div>
    <div class="meTop">
      <h1>姓名</h1>
      <h1>汤胜</h1>
      <span><img src="./me.png" alt=""></span>
    </div>
    <div class="meFoot">
     <span>
       <p>基本信息</p>
       <hr>
       <p>出生年月:1997/09/22</p>
         <p>联系电话:1997/09/22</p>
         <p>电子邮箱:627603421@qq.com</p>
         <p>联系地址:浙江省宁波市鄞州区</p>
     </span>
      <span style="margin-top: 20px;">
       <p>教育背景</p>
       <hr>
       <p>2016/9---2019/6</p>
         <p>温州职业技术学院</p>
         <p>专业:软件开发</p>
         <p>主修课程:数学，大学英语，计算机</p>
     </span>
    </div>
    <div class="message">
      <div style="height:30px;width:100%;background-color:#94CDDB;text-align: center;letter-spacing: 5px;line-height: 30px;">
        项目经验
      </div>
      <ul>
        <li>汽车销售商城的管理端。技术：使用 <span>vue-element-Admin</span>快速构建的后台，用<span>vuex,vue-router</span>开发下项目，和后台进行对接从开始的<span>restfulApi</span>转型到后来的<span>graphql。(graphql</span>的优点就是前端根据所需拿数据，后端更新会及时同步，不至于造成后端更新但是数据模型未更新)</li>
        <li>类似手机短信接发的管理端。技术：同上。 </li>
      </ul>
      <div style="height:30px;width:100%;background-color:#94CDDB;text-align: center;letter-spacing: 5px;line-height: 30px;">
        获奖情况
      </div>
      <ul>
        <li>国家三等奖学金</li>
        <li>大学英语四级</li>
      </ul>
      <div style="height:30px;width:100%;background-color:#94CDDB;text-align: center;letter-spacing: 5px;line-height: 30px;">
        自我评价
      </div>
      <ul>
        <li>执行力很强，属于我的任务不会拖拉。</li>
        <li>对前端开发很有兴趣</li>
        <li>认同互联网这个行业，并觉得从事互联网行业是个明智的选择</li>
      </ul>
      <div>
        <el-button type="primary"  style="position: absolute;margin: 5% 20%;background-color: #5A5858" @click="btn">点我查看</el-button>
        <el-button type="primary"  style="margin: 5%  54%;background-color: #5A5858" @click="showMap">了解地区</el-button>
      </div>

    </div>
    <div class="right">
      <img src="./banner.jpg" alt="">
    </div>
    <div class="banner">
      <img src="./timg.jpg" alt="">
    </div>
    <el-tooltip content="数据是通过mock模拟出来的哦！！！" placement="top" style="margin-top: -30px;">
    <el-dialog
      title="详情页"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" disabled></el-input>
        </el-form-item>
        <el-form-item label="大学时间">
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            disabled>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学历">
          <el-radio-group v-model="form.xl">
            <el-radio label="大专" ></el-radio>
            <el-radio label="本科" disabled></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="爱好">
          <el-input  v-model="form.like" disabled></el-input>
        </el-form-item>
        <el-form-item label="github">
          <el-input v-model="form.github" disabled></el-input>
        </el-form-item>
        <el-button @click="dialogVisible = false" style="margin-left: 35%;">取 消</el-button>
          <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
      </el-form>
    </el-dialog>
    </el-tooltip>
    <el-dialog
      class="dialog"
      title="地图"
      :visible.sync="dialogVisibleTwo"
      width="50%"
      :before-close="handleClose">
      <div class="amap-wrapper">
        <el-amap class="amap-box" :zoom="zoom" :center="center" :plugin="plugin"  :vid="'amap-vue'">
          <el-amap-marker v-for="(marker, index) in markers" key="index" :position="marker.position"  :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
        </el-amap>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getList} from "../../api/table";

export default {
  name: 'Dashboard',
data(){
    return{
      zoom:10,
      plugin: [{
        pName: 'ToolBar',
        events: {
          init(instance) {
            console.log(instance);
          }
        }
      }],
      markers: [
        {
          position:  [121.553188, 29.873972],
          visible: true,
          draggable: true,
          template: '<span>1</span>',
        }
      ],
      center:  [121.553188, 29.873972],
      dialogVisibleTwo:false,
      dialogVisible:false,
      value7:[new Date(2016, 8, 1), new Date(2019,5, 1)],
      form: {
        name: '',
        age: '',
        xl: [],
        like: '',
        github:''
      }
    }
},
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created(){
   this._getList();
   console.log(this.$store.getters)
  },
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    btn(){
      this.dialogVisible=true;
    },
    showMap(){
    this.dialogVisibleTwo=true;
    },
    _getList(){
      getList().then((ops)=>{
      this.form=ops.data[0];
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $leftColor:#5E5E5E;
  $myTopColor:#95CBDD;
  $myFootColor:#5A5858;
  $rightColor:#444346;
  $color:#94CDDB;
  .amap-wrapper {
    width: 100%;
    height:465px;
  }
  .dashboard-container{
    margin-top: 5px;
    .el-dialog__body{
      padding: 10px;
    }
    .left{
    width:12%;
    height:585px;
    background-color: $leftColor;
    position: absolute;
    img{
      margin-left: 50%;
      margin-top: 312px;
    }
  }
    .meTop{
      height:260px;
      width:13%;
      background-color: $myTopColor;
      position: absolute;
      margin-left: 13.5%;
      z-index: 1;
      h1{
        text-indent: 50px;
        color:white;
        font-weight: normal;
      }
      span{
        display: inline-block;
        height:160px;
        width:150px;
        border-radius: 50%;
        margin-left: 2px;
        margin-top: -15px;
    background-color: $myTopColor;
        img{
          border-radius: 50%;
        }
      }
    }
    .meFoot{
      height:480px;
      width:16%;
      background-color: $myFootColor;
      margin-left: 12%;
      margin-top: 142px;
      position: absolute;
      z-index: 0;
      span{
        display: inline-block;
        height:120px;
        width:98%;
        margin-left: 1%;
        margin-top: 72%;
        p{
          color:white;
          margin-top: 0px;
          text-align: left;
          margin-left: 15px;
        }
        p:not(:first-child)
        {
          font-size: 12px;
        }
        hr{
          margin-top: -5px;
        }
      }

    }
    .message{
      height:585px;
      width:30%;
      background-color: white;
      position: absolute;
      margin-left: 28%;
    ul li{
      letter-spacing: 4px;
      color: black;
      span{
        color:red;
      }
    }
    }
    .right{
      height:585px;
      width:10%;
      background-color: $rightColor;
      position: absolute;
      margin-left: 58.1%;
      img{
        width:100%;
        height:580px;
      }
    }
    .banner{
      height:585px;
      width:32%;
      position: absolute;
      margin-left: 68%;
      img{
        height:579px;
        width:420px;
      }
    }
    .el-input.is-disabled .el-input__inner{
      background-color: white;
    }
  }
</style>
