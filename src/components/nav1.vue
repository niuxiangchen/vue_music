<template>
  <div>
    <div class="head">
      <img class="headImg1" src="../assets/img/hotBack.jpg" alt="">
      <img class="headImg2" src="../assets/img/hotHeader.png" alt="">
      <p>更新日期：{{time}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data(){
    return{
      time:""
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
      console.log(res.data.privileges);
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
</style>