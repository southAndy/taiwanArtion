## getting started
store 就是你這個application內state(我理解為data)的容器
1. 更新state,會即時更新
2. state要透過mutation修改

### basic
存取vuex資料方法:
1. 元件呼叫
   - 取得state的值:`this.$store.state.`
   - 觸發mutations的方法:在vuex內 `store.commit()`
   - 在commponent內取得`store`的data,透過`this.$store`
2. vuex呼叫
   - 


## module
1. `mutation`,`getters` 第一個參數接收模組內部的state
```js

```
2. `actions`參數

```js

```


### Namespacing
預設`action`,`mutations`,`getters`是註冊在vuex內的全域,所以當不同模組有相同`mutation`時,會產生衝突

**解決方法**: `namespaced:true`,
1. `mutations`/`actions`:需要加上路徑`commit(”module/mutationss“)`
2. `getters`:路徑則為`getters["module/getters"]`



### 運用在元件的情節
如同全域一般:
1. state:`...mapState({})`
2. getters:`...mapGetters([])`
3. action:`...mapActions([])`

但是記得模組的使用,要加上路徑...所以..
1. 一般
```js

```
2. 

