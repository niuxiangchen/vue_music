<template>
  <div>
    <div class="head">
      <img class="headImg1" src="../assets/img/hotBack.jpg" alt="">
      <img class="headImg2" src="../assets/img/hotHeader.png" alt="">
      <p>更新日期：{{time}}</p>
    </div>
    <div class="list">
      <div v-for="(item,index) in list" :key="index" class="con">
        <div class="conLeft">
          <p :class="index<3?'acitve':''">{{String(index+1).padStart(2,"0")}}</p>
        </div>
        <div class="conRight" @click="goSong(item.id)">
          <div class="content">
            <p class="conTop">{{item.name}}</p>
            <p class="bottom">{{item.ar[0].name}} - {{item.al.name}}</p>
          </div>
          <img src="../assets/img/playIcon.png" alt="">  
        </div>        
      </div>
    </div>
    <p class="footer">查看完整榜单 ></p>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data(){
    return{
      time:"",
      list:[]
    }
  },
  methods:{
    changeTime(){
      var date = new Date()
      var y = date.getFullYear()
      var m = String(date.getMonth()+1).padStart(2,"0")
      var d = String(date.getDate()).padStart(2,"0")
      var h = String(date.getHours()).padStart(2,"0")
      var mi = String(date.getMinutes()).padStart(2,"0")
      var s = String(date.getSeconds()).padStart(2,"0")
      var str = y+"年"+m+"月"+d+"日  " +h+":"+mi+":"+s
      this.time = str
    },
    goSong(id){
      console.log(id);
      // 跳转到播放页，并携带者id值
      this.$router.push("/song?id="+id)
    }
  },
  mounted() {
    // 页面一进来就执行
    this.changeTime()
    // 页面一进来就开启定时器，虽然定时器中也执行了修改时间，但是刚开始会有1秒钟的空白
    setInterval(()=>{
      this.changeTime()
    },1000)
    // 页面一进来请求列表数据
    axios({
      url:"http://localhost:3000/top/list?idx=1"
    }).then(res=>{
      var list = res.data.playlist.tracks.splice(0,40)
      this.list = list
    })
  }
}
</script>

<style scoped>
.head{
  position: relative;
}
.headImg1{
  width: 100%;
}
.headImg2{
  width: 38%;
  position: absolute;
  top: 0.25rem;
  left: 0.2rem;
}
.head p{
  position: absolute;
  top: 1.05rem;
  left: 0.2rem;
  color: white;
}

.con{
  overflow: hidden;
}
.conLeft{
  float: left;
  width: 16%;
  font-size: 0.26rem;
  text-align: center;
  line-height: 0.5rem;
  color: #999;
}
.conRight{
  float: right;
  width: 84%;
  overflow: hidden;
  border-bottom: 1px solid #999;
  padding-bottom: 0.06rem;
  margin-bottom: 0.1rem;
}
.content{
  width: 80%;
}
.conTop{
  font-size: 0.24rem;
  line-height: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.bottom{
  font-size: 0.18rem;
  line-height: 0.2rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.conRight div{
  float: left;
}
.conRight img{
  float: right;
  margin-right: 0.1rem;
}
.acitve{
  color: rgb(212,60,51);
}
.footer{
  text-align: center;
  color: #999;
  font-size: 0.2rem;
  line-height: 0.3rem;
}
</style>