<template>
  <div>
    <div class="inpBox">
      <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="msg" @input="changeINP">
    </div>
    <div class="A" v-if="flag==0">
      <p class="con1P1">热门搜索</p>
      <span v-for="(item,index) in list1" :key="index" @click="clickHot(item.first)">{{item.first}}</span>
    </div>
    <div class="B" v-if="flag==1">
      <i @click="searchQuery()">搜索“{{msg}}”</i>
      <p v-for="(item,index) in list2" :key="index" @click="search(item.keyword)">
        <img src="../assets/img/search.svg" alt="">
        <span>{{item.keyword}}</span>
      </p>
    </div>
    <div class="C" v-if="flag==2">
      <div class="Ccon" v-for="(item,index) in list3" :key="index" @click="goSong(item.id)">
        <div class="CconLeft">
          <p class="oP1">{{item.name}}</p>
          <div class="oDiv1">
            <img src="../assets/img/indexSQ.png" alt="">
            <p>{{item.artists[0].name}}-{{item.name}}</p>
          </div>
        </div>
        <div class="CconRight">
          <img src="../assets/img/playIcon.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data(){
    return{
      // flag就是一个标识符，用来标识当前应该哪个模块展示出来。如果为0则热门搜素展示，如果为1则联想列表展示，如果为2则具体歌单展示。
      flag:0,
      // 用来渲染热门搜索
      list1:[],
      // msg是用来标识输入框的内容
      msg:"",
      // 用来渲染联想列表
      list2:[],
      // 用来渲染具体歌单
      list3:[]
    }
  },
  methods:{
    changeINP(){
      // 只要当输入框的内容发生变化了，我们就一定会走当前这个函数。
      if(this.msg.length>0){
        // 说明有内容，有内容就要展示联想列表
        this.flag = 1
        // 渲染联想列表的数据
        axios({
          url:"http://localhost:3000/search/suggest?keywords=" + this.msg + "&type=mobile"
        }).then(res=>{
          console.log(res.data.result.allMatch)
          this.list2 = res.data.result.allMatch
        })
      }else{
        // 说明没有内容，没有内容就要展示热门搜索
        this.flag = 0
      }
    },
    // 点击了联想列表
    search(keywords){
      console.log(keywords);
      axios({
        url:"http://localhost:3000/search?keywords=" + keywords
      }).then(res=>{
        console.log(res);
        console.log(res.data.result.songs);
        // 1、让具体歌单页面展示出来
        this.flag = 2
        // 2、给具体歌单赋值，未来在页面中v-for循环渲染就行了
        this.list3 = res.data.result.songs
        // 3、给输入框也赋值
        this.msg = keywords
      })
    },
    // 点击热门搜索的列表
    clickHot(keywords){
      axios({
        url:"http://localhost:3000/search?keywords=" + keywords
      }).then(res=>{
        // 1、给输入框赋值
        this.msg = keywords
        // 2、让具体歌单页面展示出来
        this.flag = 2
        // 3、给具体歌单赋值，未来在页面中v-for循环渲染就行了
        this.list3 = res.data.result.songs
      })
    },
    // 点击模糊搜索结果的第一条
    searchQuery(){
      axios({
        url:"http://localhost:3000/search?keywords=" + this.msg
      }).then(res=>{
        // 1、让具体歌单页面展示出来
        this.flag = 2
        // 2、给具体歌单赋值，未来在页面中v-for循环渲染就行了
        this.list3 = res.data.result.songs
      })
    },
    // 跳转到播放页
    goSong(id){
      console.log(id);
      // 跳转到播放页
      this.$router.push("/song?id="+id)
    }
  },
  mounted(){
    // 页面一进来就请求热门搜索的列表数据
    axios({
      url:"http://localhost:3000/search/hot"
    }).then(res=>{
      this.list1 = res.data.result.hots
    })
  }
}
</script>

<style scoped>
/* 输入框部分 */
.inpBox{
  border-bottom: 1px solid #999;
}
.inpBox input{
  width: 90%;
  margin: 0.1rem auto;
  display: block;
  font-size: 0.18rem;
  line-height: 0.4rem;
  border-radius: 0.2rem;
  border: none;
  background: rgb(235,235,235);
  padding: 0 0.1rem;
  outline: none;
  box-sizing: border-box;
}
/* 第一个模块(热门搜索)的样式 */
.A{
  width: 90%;
  margin: 0 auto;
}
.con1P1{
  color: #666;
  font-size: 0.18rem;
  line-height: 0.4rem;
}
.A span{
  font-size: 0.22rem;
  line-height: 0.36rem;
  border-radius: 0.18rem;
  border: 1px solid #999;
  display: inline-block;
  padding: 0 0.1rem;
  margin: 0.05rem;
}
/* 第二个模块(联想列表)的样式 */
.B i{
  width: 98%;
  display: block;
  font-size: 0.2rem;
  line-height: 0.5rem;
  color: rgb(80,125,175);
  border-bottom: 1px solid #999;
  margin-left: 2%;
}
.B p{
  overflow: hidden;
}
.B img{
  width: 0.2rem;
  height: 0.2rem;
  float: left;
  margin-top: 0.17rem;
  margin-left: 0.05rem;
}
.B span{
  display: block;
  width: 92%;
  font-size: 0.2rem;
  line-height: 0.5rem;
  border-bottom: 1px solid #999;
  float: right;
}

/* 第三个模块（具体歌单）的样式 */
.Ccon{
  overflow: hidden;
  height: 0.5rem;
  margin: 2px 0;
  padding: 0.06rem 0;
  border-bottom: 1px solid #999;
}
.Ccon .CconLeft{
  width: 80%;
  margin-left: 0.08rem;
  float: left;
}
.Ccon .CconRight{
  float: right;
  margin-right: 0.08rem;
}
.CconRight img{
  height: 0.4rem;
  margin-top: 0.05rem;
}
.oP1{
  font-size: 0.22rem;
  line-height: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.oDiv1 img{
  float: left;
  margin-top: 2px;
}
.oDiv1 p{
  display: inline-block;
  font-size: 0.18rem;
  line-height: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-left: 30px;
}
</style>