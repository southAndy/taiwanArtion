# 重新認識vue-router


## option API version
### router的基本架構
```javaScript
//透過vueRouter.createRouter()創建router實例
const router = vueRouter.createRouter({
    //瀏覽器的模式選擇
    history:vueRouter.createWebHistory(),
    //設定路由
    routes:[
        //每個路由都是以物件的形式
        {
            path:
            name:
            component:
            //直接引入: component:Name / 懶人引入:()=>import("")(當觸及此連結才會載入元件)
        }
    ]
})

const app =Vue.createApp({});
//透過use來與vue實例連結
app.use(router)
```
完成連結後！現在可以透過`this.$route`來讀取當前router物件！

`router-link`:功能類似`<a>`，不需重整頁面。

`router-view`:顯示已連結的元件路由內容

### 動態對應router
1. `params`


### nest routes
當你的網站架構更加複雜時，就會需要使用這個功能
```javaScript
routes = [{
    path:"sample",
    name:"Sample",
    component:Sample,

    //若需要新增cihld-router
    children:[
        {
            path:"children-sample",
            name:"ChildrenSample,
            component:ChildrenSample,
        }
    ]
}]
```
**attention:** 若是使用`to="path"`的方法,路徑需要寫完整!
ex:to="/sample/chidren-sample"

reference:

1. [lai的教學文](https://medium.com/unalai/%E8%AA%8D%E8%AD%98-vue-router-%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1-nested-routes-8168f5395941)
2. 