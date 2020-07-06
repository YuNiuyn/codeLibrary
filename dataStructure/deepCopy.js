/**
 * 深拷贝
 */

// 数组
array_1 = [1,2,3,4];

function arrayDeepCopy(arr) {
  let cArr = []
  for(let i = 0; i < arr.length; i++){
    cArr.push(arr[i])
  }
  return cArr;
}
let arrary_2 = arrayDeepCopy(array_1);
let arrary_3 = array_1.slice(0);
let arrary_4 = array_1.concat();
let [...arrary_5] = array_1;
let arrary_6 = JSON.parse(JSON.stringify(array_1)); // 此方法在数据量较大时会有性能问题


// 对象

// 循环拷贝
let obj = {
  id:'0',
  name:'king',
  sex:'man'
}

function objDeepCopy(obj) {
  let cObj = {};
  for(var key in obj){
    cObj[key] = obj[key]
  }
  return cObj
}

let obj2 = objDeepCopy(obj);

// JSON.stringify
var obj1 = {
  x: 1, 
  y: {
    m: 1
  },
  a: undefined,
  b: function(a,b) {
      return a+b
    },
  c: Symbol("foo")
};
var obj3 = JSON.parse(JSON.stringify(obj1));
console.log(obj1) //{x: 1, y: {m: 1}, a: undefined, b: ƒ, c: Symbol(foo)}
console.log(obj3) //{x: 1, y: {m: 1}}
obj3.y.m = 2; //修改obj2.y.m
console.log(obj1) //{x: 1, y: {m: 1}, a: undefined, b: ƒ, c: Symbol(foo)}
console.log(obj3) //{x: 2, y: {m: 2}}

// es6
let obj4 = {
  id:'0',
  name:'king',
  sex:'man'
}
let {...obj5} = obj4
obj5.name = "king4"
console.log(obj4) //{id: "0", name: "king", sex: "man"}
console.log(obj5) //{id: "0", name: "king4", sex: "man"}



// Object.assign() 只能实现一维对象的深拷贝。
var obj6 = {x: 1, y: 2}, obj7 = Object.assign({}, obj1);