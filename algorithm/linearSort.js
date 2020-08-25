// 名称         平均	   最好	    最坏        空间    稳定性  排序方式
// 桶排序	    O(n + k)	O(n + k)	O(n2)   	O(n + k)	Yes	  Out-place
// 计数排序	  O(n + k)	O(n + k)	O(n + k)	O(k)	    Yes	  Out-place
// 基数排序	  O(n * k)	O(n * k)	O(n * k)	O(n + k)	Yes	  Out-place

/** 桶排序
 * 将要排序的数据分到有限数量的几个有序的桶里。
 * 每个桶里的数据再单独进行排序（一般用插入排序或者快速排序）。
 * 再把每个桶里的数据按照顺序依次取出，组成的序列就是有序的了。
 * 
 * 在额外空间充足的情况下，尽量增大桶的数量。
 * 使用的映射函数能够将输入的 N 个数据均匀的分配到 K 个桶中。
 * 桶排序的核心：把元素平均分配到每个桶里，合理的分配将大大提高排序的效率。
 * 
 * 
 * 不是原地排序
 * 是否稳定取决于桶内的排序算法
 * 时间复杂度取决于桶内的排序算法。
 * 最佳情况：当输入的数据可以均匀的分配到每一个桶中。
 * 最差情况：当输入的数据被分配到了同一个桶中。
 */ 

const bucketSort = (array, bucketSize) => {
  if (array.length === 0) {
    return array;
  }

  let i = 0;
  let minValue = array[0];
  let maxValue = array[0];
  for (i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i]; //输入数据的最小值
    } else if (array[i] > maxValue) {
      maxValue = array[i]; //输入数据的最大值
    }
  }

  //桶的初始化
  const DEFAULT_BUCKET_SIZE = 5; //设置桶的默认数量为 5
  bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = new Array(bucketCount);
  for (i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }

  //利用映射函数将数据分配到各个桶中
  for (i = 0; i < array.length; i++) {
    buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
  }

  array.length = 0;
  for (i = 0; i < buckets.length; i++) {
    quickSort(buckets[i]); //对每个桶进行排序，这里使用了快速排序
    for (var j = 0; j < buckets[i].length; j++) {
      array.push(buckets[i][j]);
    }
  }

  return array;
};

// 快速排序
const quickSort = (arr, left, right) => {
	let len = arr.length,
		partitionIndex;
	left = typeof left != 'number' ? 0 : left;
	right = typeof right != 'number' ? len - 1 : right;

	if (left < right) {
		partitionIndex = partition(arr, left, right);
		quickSort(arr, left, partitionIndex - 1);
		quickSort(arr, partitionIndex + 1, right);
	}
	return arr;
};

const partition = (arr, left, right) => {
	//分区操作
	let pivot = left, //设定基准值（pivot）
		index = pivot + 1;
	for (let i = index; i <= right; i++) {
		if (arr[i] < arr[pivot]) {
			swapFunc(arr, i, index);
			index++;
		}
	}
	swapFunc(arr, pivot, index - 1);
	return index - 1;
};

const swapFunc = (arr, i, j) => {
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
};

// 测试
// const array = [11,5,8,4,9,10,3,6,2,7,1];
// console.log(bucketSort(array, 3));


/**
 * 记数排序 Counting Sort
 * 
  找出待排序的数组中最大和最小的元素。
  统计数组中每个值为 i 的元素出现的次数，存入新数组 countArr 的第 i 项。
  对所有的计数累加（从 countArr 中的第一个元素开始，每一项和前一项相加）。
  反向填充目标数组：将每个元素 i 放在新数组的第 countArr[i] 项，每放一个元素就将 countArr[i] 减去 1 。
 * 
 *
  只能用在数据范围不大的场景中，若数据范围 k 比要排序的数据 n 大很多，就不适合用计数排序。
  计数排序只能给非负整数排序，其他类型需要在不改变相对大小情况下，转换为非负整数。
  比如如果考试成绩精确到小数后一位，就需要将所有分数乘以 10，转换为整数。
 * 
 *
 * 非原地算法，稳定
 */

const countingSort1 = array => {
	let len = array.length,
		result = [],
		countArr = [],
		min = (max = array[0]);
	console.time('计数排序1耗时');
	for (let i = 0; i < len; i++) {
		// 获取最小，最大 值
		min = min <= array[i] ? min : array[i];
		max = max >= array[i] ? max : array[i];
		countArr[array[i]] = countArr[array[i]] ? countArr[array[i]] + 1 : 1;
	}
	console.log('countArr :', countArr);
	// 从最小值 -> 最大值,将计数逐项相加
	for (let j = min; j < max; j++) {
		countArr[j + 1] = (countArr[j + 1] || 0) + (countArr[j] || 0);
	}
	console.log('countArr 2:', countArr);
	// countArr 中,下标为 array 数值，数据为 array 数值出现次数；反向填充数据进入 result 数据
	for (let k = len - 1; k >= 0; k--) {
		// result[位置] = array 数据
		result[countArr[array[k]] - 1] = array[k];
		// 减少 countArr 数组中保存的计数
		countArr[array[k]]--;
		// console.log("array[k]:", array[k], 'countArr[array[k]] :', countArr[array[k]],)
		console.log('result:', result);
	}
	console.timeEnd('计数排序1耗时');
	return result;
};


// 速度快于1
const countingSort2 = (arr, maxValue) => {
  maxValue = maxValue || arr.length;
	let bucket = new Array(maxValue + 1),
    sortedIndex = 0;
	(arrLen = arr.length), (bucketLen = maxValue + 1);
  console.time('计数排序2耗时');
	for (let i = 0; i < arrLen; i++) {
		if (!bucket[arr[i]]) {
			bucket[arr[i]] = 0;
		}
		bucket[arr[i]]++;
	}

	for (let j = 0; j < bucketLen; j++) {
		while (bucket[j] > 0) {
			arr[sortedIndex++] = j;
			bucket[j]--;
		}
	}
	console.timeEnd('计数排序2耗时');
	return arr;
}

// 测试
// const array2 = [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2];
// console.log('原始 array2: ', array2);
// const newArr2 = countingSort1(array2, 21);
// console.log('newArr2: ', newArr2);



/** 基数排序 Radix sort
 * 基数排序是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。
 * 由于整数也可以表达字符串（比如名字或日期）和特定格式的浮点数，所以基数排序也不是只能使用于整数。
 * 
 * 要求数据可以分割独立的位来比较；
 * 位之间由递进关系，如果 a 数据的高位比 b 数据大，那么剩下的地位就不用比较了；
 * 每一位的数据范围不能太大，要可以用线性排序，否则基数排序的时间复杂度无法做到 O(n)。
 * 
 * MSD: 由高位为基底，先按 k1 排序分组，同一组中记录, 关键码 k1 相等，再对各组按 k2 排序分成子组, 之后，对后面的关键码继续这样的排序分组，直到按最次位关键码 kd 对各子组排序后，再将各组连接起来，便得到一个有序序列。MSD 方式适用于位数多的序列。
 * LSD: 由低位为基底，先从 kd 开始排序，再对 kd - 1 进行排序，依次重复，直到对 k1 排序后便得到一个有序序列。LSD 方式适用于位数少的序列。
 */

const radixSort = (array, max) => {
  console.time('基数排序耗时');
	const buckets = [];
	let unit = 10,
		base = 1;
	for (let i = 0; i < max; i++, base *= 10, unit *= 10) {
		for (let j = 0; j < array.length; j++) {
      let index = Math.floor((array[j] % unit) / base); //依次过滤出个位，十位等等数字
      // let index = ~~((array[j] % unit) / base);
			if (buckets[index] == null) {
				buckets[index] = []; //初始化桶
			}
			buckets[index].push(array[j]); //往不同桶里添加数据
		}
		let pos = 0,
			value;
		for (let j = 0, length = buckets.length; j < length; j++) {
			if (buckets[j] != null) {
				while ((value = buckets[j].shift()) != null) {
					array[pos++] = value; //将不同桶里数据挨个捞出来，为下一轮高位排序做准备，由于靠近桶底的元素排名靠前，因此从桶底先捞
				}
			}
		}
	}
	console.timeEnd('基数排序耗时');
	return array;
};

// 测试
// const array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
// console.log('原始array:', array);
// const newArr = radixSort(array, 2);
// console.log('newArr:', newArr);


/**
 * 基数排序：根据键值的每位数字来分配桶
 * 计数排序：每个桶只存储单一键值
 * 桶排序：每个桶存储一定范围的数值
 */

var testObj = {
   a:1,
   b:2
 }
var arr_test = [1,2,3,4,5,15,21];

// console.log(arr_test.splice(arr_test.length, 0, 'test'));
// console.log(arr_test);

// var arr_clone = arr_test.slice(0);
// console.log(arr_clone);
// console.log(arr_test.toString());
console.log(arr_test.sort((a,b) => a - b));

var arr_final = arr_test.filter(function(element) {
	return element > 6
})
console.log(arr_final);

var array_test = [[1,2],[3,[4,5]],6];
console.log(array_test);
console.log(array_test.flat(3));

var string_test = 'Hello world, peace!';
var farr = string_test.split(' ');
console.log(farr);