<template>
  <div>
    <!-- 推荐歌单部分 -->
    <div class="gedan">
      <h4>推荐歌单</h4>
      <div class="gedanWrap">
        <div class="gedanDiv1" v-for="(item,index) in list" :key="index">
          <img class="tuijianImg" :src="item.picUrl" alt="">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐部分(新歌速递) -->
    <div class="zuixin">
      <h4>最新音乐</h4>
      <div>
        <div class="zuixinWrap" v-for="(item,index) in list1" :key="index">
          <div class="zuixinLeft">
            <p class="zuixinP1">{{item.name}}</p>
            <p class="zuixinP2">
              <img src="../assets/img/indexSQ.png" alt="">
              {{item.artists[0].name}}
              <span v-if="item.alias[0]">-{{item.alias[0]}}</span>
              <span v-else>-{{item.name}}</span>
            </p>
          </div>
          <div class="zuixinRight">
            <img src="../assets/img/playIcon.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 尾部展示部分 -->
    <div class="foot">
      <img class="footLogo" src="../assets/img/footLogo.png" alt="">
      <p class="footP1">打开APP，发现更多好音乐></p>
      <p class="footP2">网易云公司版权所有©1997-2021  杭州乐读科技有限公司运营</p>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  // 存放数据的
  data(){
    return{
      // 用来渲染推荐歌单的数据
      list:[],
      // 用来渲染最新音乐的数据
      list1:[]
    }
  },
  // 生命周期，页面一进来
  mounted(){
    // 1、页面一进来请求推荐歌单的接口数据
    axios({
      url:"http://localhost:3000/personalized?limit=6"
    }).then(res=>{
      // 给list赋值，list有了数据我们就能渲染页面了
      this.list = res.data.result
    })

    // 2、页面一进来请求新歌速递的接口数据
    axios({
      url:"http://localhost:3000/top/song?type=0"
    }).then(res=>{
      // var arr = res.data.data.filter((item,index)=>{
      //   return index < 10
      // })

      var arr = res.data.data.splice(0,10)
      // 给list1赋值，list1有了数据我们就能渲染页面了
      this.list1 = arr
    })
  }
}
</script>

<style scoped>
.gedan h4{
  border-left: 2px solid rgb(212,60,51);
  padding-left: 0.1rem;
  font-size: 0.2rem;
  line-height: 0.3rem;
  margin: 0.1rem 0;
}
.gedanWrap{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.gedanDiv1{
  width: 1.2rem;
  margin: 0.06rem 0;
}
.tuijianImg{
  width: 100%;
}
.gedanDiv1 p{
  font-size: 0.16rem;
  line-height: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.zuixin h4{
  border-left: 2px solid rgb(212,60,51);
  padding-left: 0.1rem;
  font-size: 0.2rem;
  line-height: 0.3rem;
  margin: 0.1rem 0;
}

.zuixinWrap{
  width: 94%;
  margin: 0 auto;
  border-bottom: 1px solid #999;
  overflow: hidden;
  margin-bottom: 10px;
}
.zuixinLeft{
  width: 85%;
  float: left;
}
.zuixinRight{
  float: right;
}
.zuixinP1{
  font-size: 0.2rem;
  line-height: 0.28rem;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.zuixinP2{
  font-size: 0.16rem;
  line-height: 0.24rem;
  color: #999;
    overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.zuixinRight img{
  margin-top: 1px;
}


.foot{
  text-align: center;
  background-image: url("../assets/img/footBack.png");
  background-size:contain;
}
.footBack{
  width: 100%;
}
.footLogo{
  width: 60%;
  margin: 0 auto;
  margin-top: 17%;
  margin-bottom: 10px;
}
.footP1{
  display: inline-block;
  color: rgb(212,60,51);
  font-size: 0.18rem;
  border: 1px solid rgb(212,60,51);
  line-height: 0.34rem;
  padding: 0 0.24rem;
  border-radius: 0.17rem;
}
.footP2{
  font-size: 0.12rem;
  color: #999;
  margin-top: 0.1rem;
  padding-bottom: 0.2rem;
}
</style>