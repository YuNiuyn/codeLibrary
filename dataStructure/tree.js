/**
 * Tree 树
 * 高度：叶节点 -> 根节点，0开始
 * 深度：根节点 -> 叶节点，0开始
 * 层数：根节点 -> 叶节点，1开始
 */

/**
 * 二叉树
 * 
 * 完全二叉树：叶子节点都在最底下两层，最后一层叶子节都靠左排列，并且除了最后一层，其他层的节点个数都要达到最大
 */

 /**
 * Heap 堆 - 完全二叉树
 * 堆中每一个节点的值都必须大于等于（或小于等于）其子树中每个节点的值。
 * 大顶堆：每个节点的值都大于等于子树中每个节点值的堆
 * 小顶堆：每个节点的值都小于等于子树中每个节点值的堆
 */


/** 红黑树
 * 根节点是黑色的。
 * 每个叶子节点都是黑色的空节点（NIL），也就是说，叶子节点不存储数据。
 * 任何相邻的节点都不能同时为红色，也就是说，红色节点是被黑色节点隔开的。
 * 每个节点，从该节点到达其可达叶子节点的所有路径，都包含相同数目的黑色节点。
 */

/** 存储
 * 1. 链式存储
 * 每个节点由 3 个字段，其中一个存储数据，另外两个是指向左右子节点的指针。
 * 只要拎住根节点，就可以通过左右子节点的指针，把整棵树都串起来。
 * 这种存储方式比较常用，大部分二叉树代码都是通过这种方式实现的。
 * 
 * 2. 顺序存储
 * 用数组来存储，对于完全二叉树，如果节点 X 存储在数组中的下标为 i ，那么它的左子节点的存储下标为 2 * i ，右子节点的下标为 2 * i + 1，反过来，下标 i / 2 位置存储的就是该节点的父节点。
 * 注意，根节点存储在下标为 1 的位置。完全二叉树用数组来存储是最省内存的方式。
 */


/** 二叉树的遍历
 * 
 * 前序遍历（根 => 左 => 右）
 * 中序遍历（左 => 根 => 右）
 * 后序遍历（左 => 右 => 根）
 * 
 * 时间复杂度：3 种遍历方式中，每个节点最多会被访问 2 次，跟节点的个数 n 成正比，所以时间复杂度是 O(n)。
 * 相对较小的值保存在左节点中，较大的值保存在右节点中。
 * 
 * 方法：
 * insert(key)：向树中插入一个新的键。
 * search(key)：在树中查找一个键，如果节点存在，则返回 true；如果不存在，则返回 false。
 * min：返回树中最小的值/键。
 * max：返回树中最大的值/键。
 * remove(key)：从树中移除某个键。
 * 
 * 遍历：
 * preOrderTraverse：通过先序遍历方式遍历所有节点。
 * inOrderTraverse：通过中序遍历方式遍历所有节点。
 * postOrderTraverse：通过后序遍历方式遍历所有节点。
 * 
 */


 // 二叉搜索树类
function BinarySearchTree() {
  // 用于实例化节点的类
  var Node = function(key){
      this.key = key; // 节点的健值
      this.left = null; // 指向左节点的指针
      this.right = null; // 指向右节点的指针
  };

  var root = null; // 将根节点置为null

  // insert(key)：向树中插入一个新的键。
  this.insert = function(key){
    var newNode = new Node(key); // 实例化一个节点
    if (root === null){
        root = newNode; // 如果树为空，直接将该节点作为根节点
    } else {
        insertNode(root,newNode); // 插入节点（传入根节点作为参数）
    }
  };

  // 插入节点的函数, 递归遍历
  var insertNode = function(node, newNode){
    // 如果插入节点的键值小于当前节点的键值
    // （第一次执行insertNode函数时，当前节点就是根节点）
    if (newNode.key < node.key){
        if (node.left === null){
            // 如果当前节点的左子节点为空，就直接在该左子节点处插入
            node.left = newNode;
        } else {
            // 如果左子节点不为空，需要继续执行insertNode函数，
            // 将要插入的节点与左子节点的后代继续比较，直到找到能够插入的位置
            insertNode(node.left, newNode);
        }
    } else {
        // 如果插入节点的键值大于当前节点的键值
        // 处理过程类似，只是insertNode函数继续比较的是右子节点
        if (node.right === null){
            node.right = newNode;
        } else {
            insertNode(node.right, newNode);
        }
    }
  }

  // 查找最小值
  this.min = function(node) {
    // min方法允许传入子树
    node = node || root;
    // 一直遍历左侧子节点，直到底部
    while (node && node.left !== null) {
        node = node.left;
    }
    return node;
  };

  // 查找最大值
  this.max = function(node) {
    // max方法允许传入子树
    node = node || root;
    // 一直遍历右侧子节点，直到底部
    while (node && node.right !== null) {
        node = node.right;
    }
    return node;
  }; 


  // 查找特定值
  this.search = function(key, node){
    // 同样的，search方法允许在子树中查找值
    node = node || root;
    return searchNode(key, node);
  };
  var searchNode = function(key, node) {
    // 如果node是null，说明树中没有要查找的值，返回false
    if (node === null){
        return false;
    }
    if (key < node.key){
        // 如果要查找的值小于该节点，继续递归遍历其左侧节点
        return searchNode( key, node.left);
    } else if (key > node.key){
        // 如果要查找的值大于该节点，继续递归遍历其右侧节点
        return searchNode(key, node.right);
    } else {
        // 如果要查找的值等于该节点，说明查找成功，返回改节点
        return node;
    }
  }

  // 移除特定值
  this.remove = function(key, node) {
    // 同样的，允许仅在子树中删除节点
    node = node || root;
    return removeNode(key, node);
  };

  var self = this;
  var removeNode = function(key, node) {
    // 找到要删除的节点
    node = self.search(key, node);
  
    // 如果 node 不存在，直接返回
    if (node === false) {
      return null;
    }

    // 第一种情况，该节点没有子节点
    // TODO: 验证方法 node 是复制的节点，无法直接更改node
    // var arr = [11, 7, 5, 3, 6, 9, 8, 10, 15];
    // for (var i = 0; i < arr.length; i++) {
    //   btree.insert(arr[i]);
    // }
    // btree.print();
    // var remove = btree.remove(15);
    // console.log("remove:", remove);
    // btree.print();
    if (node.left === null && node.right === null) {
      node = null;
      return node;
    }
    // 第二种情况，该节点只有一个子节点的节点
    if (node.left === null) {
      // 只有右节点
      node = node.right;
      return node;
    } else if (node.right === null) {
      // 只有左节点
      node = node.left;
      return node;
    }
    // 第三种情况，有有两个子节点的节点
    // 将右侧子树中的最小值，替换到要删除的位置

    // 找到最小值
    var aux = self.min(node.right);
    // 替换掉
    node.key = aux.key;
    // 删除最小值
    node.right = removeNode(aux.key, node.right);
    return node;
  };

  // 先序遍历
  this.preOrderTraverse = function(callback){
    // callback用于对遍历到的节点做操作
    preOrderTraverseNode(root, callback);
  };
  var preOrderTraverseNode = function (node, callback) {
    // 遍历到node为null为止
    if (node !== null) {
      callback(node.key); // 先处理当前节点
      preOrderTraverseNode(node.left, callback); // 再继续遍历左子节点
      preOrderTraverseNode(node.right, callback); // 最后遍历右子节点
    }
  };
  
  // 中序遍历 
  this.inOrderTraverse = function(callback){
    inOrderTraverseNode(root, callback);
  };
  var inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      // 优先遍历左边节点，保证从小到大遍历
      inOrderTraverseNode(node.left, callback);
      // 处理当前的节点
      callback(node.key);
      // 遍历右侧节点
      inOrderTraverseNode(node.right, callback);
    }
  };

  // 后序遍历
  this.postOrderTraverse = function(callback){
    postOrderTraverseNode(root, callback);
    
  };
  var postOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  this.print = function() {
    console.log('root :', root);
    return root;
  };





}

var btree = new BinarySearchTree();
btree.print();

// var arr = [11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25];

// var outputArr = [];
// for (var i =0;i<arr.length;i++) {
//   btree.insert(arr[i]);
// }

// btree.preOrderTraverse(function(value) {
//   outputArr.push(value);
// });
// console.log('Output Tree Array - preOrder: ',outputArr);
// var outputArr = [];

// btree.inOrderTraverse(function(value) {
// 	outputArr.push(value);
// });
// console.log('Output Tree Array - inOrder: ',outputArr);
// var outputArr = [];

// btree.postOrderTraverse(function(value) {
// 	outputArr.push(value);
// });
// console.log('Output Tree Array - postOrder: ',outputArr);
// var outputArr = [];

// btree.print(); // 看控制台



