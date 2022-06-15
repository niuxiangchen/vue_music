<template>
  <div class="wrap">
    <button @click="goBack()">返回</button>
    <audio :src="src" autoplay ref="audio"></audio>
    
    <div class="conWrap">
      <img class="img1" src="../assets/img/songImg1.png" alt="">
      <img class="img2" :src="obj.picUrl" v-if="obj.picUrl" @click="fn1()" alt="">
      <img class="img3" src="../assets/img/playIcon.png" v-if="flag" @click="fn2()" alt="">
      <img class="img4" src="../assets/img/songTop.png" alt="">
    </div>
    <p>歌名：{{obj.title}}</p>
    <p>歌手：{{obj.name}}</p>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    data(){
      return{
        // 用来存放音乐的播放地址，mp3存放的服务器地址
        src:"",
        // 用来存放音乐的详情信息
        obj:{
          // 用来存放音乐的图片
          picUrl:"",
          // 歌名
          title:"",
          // 歌手
          name:""
        },
        // 用来标识当前是显示还是隐藏
        flag:false
      }
    },
    methods:{
      // 返回上一页
      goBack(){
        // 返回
        this.$router.back()
      },
      // 点击图片，让歌曲暂停
      fn1(){
        // 1、让歌曲暂停
        this.$refs.audio.pause()
        // 2、让中间的icon图标显示
        this.flag = true
      },
      // 点击图标，让歌曲继续播放
      fn2(){
        // 1、让歌曲继续播放
        this.$refs.audio.play()
        // 2、让中间的icon图标隐藏
        this.flag = false
      }
    },
    mounted() {
      // 1、页面一进来拿传递过来的id值
      var id = this.$route.query.id
      // 2、根据id请求当前这条歌曲所对应的数据
      axios({
        url:"http://localhost:3000/song/url?id="+id
      }).then(res=>{
        this.src = res.data.data[0].url
      })
      // 3、根据id请求当前这条歌曲所对应的详情信息
      axios({
        url:"http://localhost:3000/song/detail?ids="+id
      }).then(res=>{
        // 给图片赋值
        this.obj.picUrl = res.data.songs[0].al.picUrl
        // 给歌名赋值
        this.obj.title = res.data.songs[0].al.name
        // 给歌手赋值
        this.obj.name = res.data.songs[0].ar[0].name
      })
    }
  }
</script>

<style scoped>
  .wrap{
    width: 100vw;
    height: 100vh;
    background: rgb(17,17,17);
  }
  .conWrap{
    width: 2.4rem;
    height: 2.4rem;
    margin: 0 auto;
    margin-top: 0.27rem;
    position: relative;
    margin-bottom: 0.2rem;
  }
  .img1{
    width: 2.4rem;
    height: 2.4rem;
  }
  .img2{
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    top: 0.4rem;
    left: 0.4rem;
    animation: my 10s linear infinite;
  }
  .img3{
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    top: 0.95rem;
    left: 0.95rem;
  }
  @keyframes my{
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  p{
    font-size: 0.22rem;
    line-height: 0.4rem;
    color: white;
    text-align: center;
  }
  .img4{
    height: 1.2rem;
    position: absolute;
    left: 1.2rem;
    top: -0.5rem;
  }
</style>