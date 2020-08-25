// 冒泡排序
// 原地排序算法，空间复杂度: O(1)。原地排序算法，就是特指空间复杂度是 O(1) 的排序算法。
// 时间复杂度:
// 最佳情况：T(n) = O(n)，当数据已经是正序时。
// 最差情况：T(n) = O(n^2)，当数据是反序时。
// 平均情况：T(n) = O(n^2)。
const bubbleSort = arr => {
	const length = arr.length;
	if (length <= 1) return;
	// i < length - 1 是因为外层只需要 length-1 次就排好了，第 length 次比较是多余的。
	for (let i = 0; i < length - 1; i++) {
    let hasChange = false; // 提前退出冒泡循环的标志位
    // console.log('i的值', i);
		// j < length - i - 1 是因为内层的 length-i-1 到 length-1 的位置已经排好了，不需要再比较一次。
		for (let j = 0; j < length - i - 1; j++) {
      // 从 i => length - 1
      // console.log('j的值', j);
			if (arr[j] > arr[j + 1]) {
				// 此处需要三个赋值操作
				const temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
        hasChange = true; // 表示有数据交换
			}
    }
    
		if (!hasChange) break; // 如果 false 说明所有元素已经到位，没有数据交换，提前退出
	}
};
// 测试
// const arr = [7, 8, 4, 5, 6, 3, 2, 1];
// bubbleSort(arr);


// 插入排序 (直接插入排序) 只需要一个赋值操作，优与冒泡
// 原地排序算法，空间复杂度: O(1)
// 时间复杂度:
// 最佳情况：T(n) = O(n)，当数据已经是正序时。
// 最差情况：T(n) = O(n^2)，当数据是反序时。
// 平均情况：T(n) = O(n^2)。
const insertionSort = array => {
	const len = array.length;
	if (len <= 1) return

	let preIndex, current;
	for (let i = 1; i < len; i++) {
		preIndex = i - 1; //待比较元素的下标
    current = array[i]; //当前元素
    console.log('待比较元素的下标:', preIndex)
		while (preIndex >= 0 && array[preIndex] > current) {
			//前置条件之一: 待比较元素比当前元素大
			array[preIndex + 1] = array[preIndex]; //将待比较元素后移一位
			preIndex--; //游标前移一位
		}
		if (preIndex + 1 != i) {
			//避免同一个元素赋值给自身
			array[preIndex + 1] = current; //将当前元素插入预留空位
			console.log('array :', array);
		}
	}
	return array;
};
// 测试
// const arr = [6,2,8,9,1,5,4,3,7];
// insertionSort(arr);


// 拆半插入
// 折半插入排序是直接插入排序的升级版，鉴于插入排序第一部分为已排好序的数组, 我们不必按顺序依次寻找插入点, 只需比较它们的中间值与待插入元素的大小即可。

// 步骤
// 取 0 ~ i-1 的中间点 ( m = (i-1)>>1 )，array[i] 与 array[m] 进行比较，若 array[i] < array[m]，则说明待插入的元素 array[i] 应该处于数组的 0 ~ m 索引之间；反之，则说明它应该处于数组的 m ~ i-1 索引之间。
// 重复步骤 1，每次缩小一半的查找范围，直至找到插入的位置。
// 将数组中插入位置之后的元素全部后移一位。
// 在指定位置插入第 i 个元素。
// 和直接插入排序类似，折半插入排序每次交换的是相邻的且值为不同的元素，它并不会改变值相同的元素之间的顺序，因此它是稳定的。
const binaryInsertionSort = array => {
	const len = array.length;
	if (len <= 1) return;

	let current, i, j, low, high, m;
	for (i = 1; i < len; i++) {
		low = 0;
		high = i - 1;
		current = array[i];

		while (low <= high) {
			//步骤 1 & 2 : 折半查找
      m = (low + high) >> 1; // 等于m = Math.floor((low + high) / 2);
			if (array[i] >= array[m]) {
				//值相同时, 切换到高半区，保证稳定性
				low = m + 1; //插入点在高半区
			} else {
				high = m - 1; //插入点在低半区
			}
		}
		for (j = i; j > low; j--) {
			//步骤 3: 插入位置之后的元素全部后移一位
			array[j] = array[j - 1];
			// console.log('array2 :', JSON.parse(JSON.stringify(array)));
		}
		array[low] = current; //步骤 4: 插入该元素
	}
	console.log('array2 :', JSON.parse(JSON.stringify(array)));
	return array;
};
// 测试
// const array2 = [5,6,4,2,7,1,3];
// binaryInsertionSort(array2);



// 希尔排序
// 已一定的间隔两两比较交换
// 原地排序算法，空间复杂度: O(1)
// 时间复杂度:
// 最佳情况：T(n) = O(n^2)，当数据已经是正序时。
// 最差情况：T(n) = O(n^2)，当数据是反序时。
// 平均情况：T(n) = O(n^2)。
const shellSort = array => {
	let len = array.length,
		temp,
		gap = 1;
	while (gap < len / 3) {
		//动态定义间隔序列
		gap = gap * 3 + 1;
	}
	for (gap; gap > 0; gap = Math.floor(gap / 3)) {
		for (let i = gap; i < len; i++) {
			temp = array[i];
			let j = i - gap;
			for (; j >= 0 && array[j] > temp; j -= gap) {
				array[j + gap] = array[j];
			}
			array[j + gap] = temp;
			console.log('array  :', array);
		}
	}
	return array;
};
// 测试
// const array2 = [5,6,4,2,7,1,3];
// shellSort(array2);




// 选择排序
// 原地排序算法，空间复杂度: O(1)， 不稳定
// 时间复杂度:
// 最佳情况：T(n) = O(n logn)。
// 最差情况：T(n) = O(n (log(n))^2)。
// 平均情况：T(n) = O(nlogn) 取决于间隙序列 
const selectionSort = array => {
	const len = array.length;
	let minIndex, temp;
	for (let i=0;i<len-1;i++) {
		minIndex = i;
		for (let j=i+1;j<len;j++) {
			if (array[j] < array[minIndex]) { // min number
				minIndex = j;
			}
		}
		temp = array[i];
		array[i] = array[minIndex];
		array[minIndex] = temp;
		console.log('array: ', array)
	}
	return array;
}
// 测试
// const array = [5,6,4,2,7,1,3];
// selectionSort(array);



// 归并排序 Merge sort
// 不是原地排序算法，空间复杂度: O(n)。稳定算法
// 最佳情况：T(n) = O(nlogn)。
// 最差情况：T(n) = O(nlogn)。
// 平均情况：T(n) = O(nlogn)。
const mergeSort = arr => {
	//采用自上而下的递归方法
	const len = arr.length;
	if (len < 2) {
		return arr;
	}
	// length >> 1 和 Math.floor(len / 2) 等价
	let middle = Math.floor(len / 2),
		left = arr.slice(0, middle),
		right = arr.slice(middle); // 拆分为两个子数组
	return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
	const result = [];

	while (left.length && right.length) {
		// 注意: 判断的条件是小于或等于，如果只是小于，那么排序将不稳定.
		if (left[0] <= right[0]) {
			result.push(left.shift());
		} else {
			result.push(right.shift());
		}
	}

	while (left.length) result.push(left.shift());
	while (right.length) result.push(right.shift());
	return result;
};

// 测试
// const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
// console.log('merge Sort arr :', mergeSort(arr));


// 快速排序（快速，常用）
// 原地排序算法，不稳定
// 
// 先找到一个基准点（一般指数组的中部），然后数组被该基准点分为两部分，依次与该基准点数据比较，如果比它小，放左边；反之，放右边。
// 左右分别用一个空数组去存储比较后的数据。
// 最后递归执行上述操作，直到数组长度 <= 1;
// 缺点：要另外声明两个数组，浪费了内存空间资源。

const quickSort1 = arr => {
	if (arr.length <= 1) {
		return arr;
	}
	//取基准点
	const midIndex = Math.floor(arr.length / 2);
	//取基准点的值，splice(index,1) 则返回的是含有被删除的元素的数组。删除数组的中间数
	const valArr = arr.splice(midIndex, 1);
	const midIndexVal = valArr[0];
	const left = []; //存放比基准点小的数组
	const right = []; //存放比基准点大的数组
	//遍历数组，进行判断分配
	for (let i = 0; i < arr.length; i++) {
			if (arr[i] < midIndexVal) {
				left.push(arr[i]); //比基准点小的放在左边数组
			} else {
				right.push(arr[i]); //比基准点大的放在右边数组
			}
	}
	//递归执行以上操作，对左右两个数组进行操作，直到数组长度为 <= 1
	return quickSort1(left).concat(midIndexVal, quickSort1(right));
};

// 测试
// const arr = [5,8, 4, 9,10,3,6,2,7,1];
// console.log('quickSort1 ', quickSort1(arr));


// 快速排序
const quickSort2 = (arr, left, right) => {
	let len = arr.length,
		partitionIndex;
	left = typeof left != 'number' ? 0 : left;
	right = typeof right != 'number' ? len - 1 : right;

	if (left < right) {
		partitionIndex = partition(arr, left, right);
		quickSort2(arr, left, partitionIndex - 1);
		quickSort2(arr, partitionIndex + 1, right);
	}
	return arr;
};
// TODO
const partition = (arr, left, right) => {
	//分区操作
	let pivot = left, //设定基准值（pivot）
		index = pivot + 1;
	for (let i = index; i <= right; i++) {
		if (arr[i] < arr[pivot]) {
			swap(arr, i, index);
			index++;
		}
	}
	swap(arr, pivot, index - 1);
	return index - 1;
};

const swap = (arr, i, j) => {
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
};

// 测试
// const arr = [5, 4, 3, 2, 1];
// console.log('quickSort2: ', quickSort2(arr));




// 堆排序
// 原地排序，不稳定
// 最佳情况：T(n) = O(nlogn)。
// 最差情况：T(n) = O(nlogn)。
// 平均情况：T(n) = O(nlogn)。
const heapSort = array => {
	// 初始化大顶堆，从第一个非叶子结点开始
	for (let i = Math.floor(array.length / 2 - 1); i >= 0; i--) {
		
		heapify(array, i, array.length);
	}
	// 排序，每一次 for 循环找出一个当前最大值，数组长度减一
	for (let i = Math.floor(array.length - 1); i > 0; i--) {
		// 根节点与最后一个节点交换
		swapFunc(array, 0, i);
		// 从根节点开始调整，并且最后一个结点已经为当前最大值，不需要再参与比较，所以第三个参数为 i，即比较到最后一个结点前一个即可
		heapify(array, 0, i);
	}
	return array;
};

//交换两个节点
const swapFunc = (array, i, j) => {
	let temp = array[i];
	array[i] = array[j];
	array[j] = temp;
};

// 将 i 结点以下的堆整理为大顶堆，注意这一步实现的基础实际上是：假设结点 i 以下的子堆已经是一个大顶堆。
// heapify 函数实现的功能是实际上是：找到 结点 i 在包括结点 i 的堆中的正确位置。
// 后面将写一个 for 循环，从第一个非叶子结点开始，对每一个非叶子结点
// 都执行 heapify 操作，所以就满足了结点 i 以下的子堆已经是一大顶堆

const heapify = (array, i, length) => {
	let temp = array[i]; // 当前父节点
	console.log("-------i: ", i)
	// j < length 的目的是对结点 i 以下的结点全部做顺序调整
	//
	for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
		console.log("+++++++++j: ", j)
		console.log("array[j]: ", array[j])
		temp = array[i]; // 将 array[i] 取出，整个过程相当于找到 array[i] 应处于的位置
		if (j + 1 < length && array[j] < array[j + 1]) {
			j++; // 找到两个孩子中较大的一个，再与父节点比较
		}
		if (temp < array[j]) {
			swapFunc(array, i, j); // 如果父节点小于子节点:交换；否则跳出
			i = j; // 交换后，temp 的下标变为 j
		} else {
			break;
		}
	}
};
// 测试
const arr = [11,5,8,4,9,10,3,6,2,7,1];
console.log(heapSort(arr));