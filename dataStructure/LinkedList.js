/**
 * 单向链表
 */
function SinglyLinkedList() {
  var length = 0;
  var head = null;

  function Node(element) {
    this.element = element;
    this.next = null;
  }

  this.append = function(element) {
    var node = new Node(element);
    var currentNode = head;

    if (head === null) {
      head = node;
    } else {
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }

    length++;
    return true;
  }

  this.insert = function(position, element) {
    if (position < 0 || position > length) {
      return false;
    } else {
      var node = new Node(element);
      var index = 0;
      var currentNode = head;
      var previousNode = null;

      if (position === 0) {
        node.next = currentNode;
        head = node;
      } else {
				while (index < position) {
					index++;
					previousNode = currentNode;
          currentNode = currentNode.next;
        }
        node.next = currentNode;
        previousNode.next = node;
        
      }
    }
  }

  this.removeAt = function(position) {
    if (position < 0 || position >= length || length === 0) {
			return false;
    } else {
      var index = 0;
      var currentNode = head;
      var previousNode;

      if (position === 0) {
          head = currentNode.next
      } else {
        while (index < position) {
          index++;
          previousNode = currentNode;
          currentNode = currentNode.next;
        }
        previousNode.next = currentNode.next;
      }
      length--;
      return true;
    }
  }

  this.remove = function(element) {
    var index = this.indexOf(element);
		return this.removeAt(index);
  }

  this.indexOf = function(element) {
    var currentNode = head;
    var index = 0;

    while (currentNode) {
      if (currentNode.element === element) {
        return index;
      }
      index++;
      currentNode = currentNode.next;
    }
    return -1;
  }

  this.isEmpty = function() {
		return length === 0;
  };
  
  this.size = function() {
		return length;
  };
  
	this.getHead = function() {
		return head.element;
  };

  this.toString = function() {
		var currentNode = head;
    var string = '';

		while (currentNode) {
			string += ',' + currentNode.element;
			currentNode = currentNode.next;
    }
    
		return string.slice(1); // 去除首','
  };
  
  this.print = function() {
    console.log(this.toString());
  }

  this.list = function() {
    console.log('head', head);
    return head
  }
  
}

/*
console.log('------- 单向链表 -------')
var singlyLinked = new SinglyLinkedList();
console.log(singlyLinked.removeAt(0)); // false
console.log(singlyLinked.isEmpty()); // true
singlyLinked.append('Tom');
singlyLinked.append('Peter');
singlyLinked.append('Paul');
singlyLinked.print(); // "Tom,Peter,Paul"
singlyLinked.insert(0, 'Susan');
singlyLinked.print(); // "Susan,Tom,Peter,Paul"
singlyLinked.insert(1, 'Jack');
singlyLinked.print(); // "Susan,Jack,Tom,Peter,Paul"
console.log(singlyLinked.getHead()); // "Susan"
console.log(singlyLinked.isEmpty()); // false
console.log(singlyLinked.indexOf('Peter')); // 3
console.log(singlyLinked.indexOf('Cris')); // -1
singlyLinked.remove('Tom');
singlyLinked.removeAt(2);
singlyLinked.print(); // "Susan,Jack,Paul"
singlyLinked.list(); // 具体控制台
*/



/**
 * 双向链表
 */
function DoublyLinkedList() {
  var length = 0;
  var head = null;
  var tail = null;

  function Node(element) {
    this.element = element
    this.next = null;
    this.prev = null;
  }

  this.append = function(element) {
    var node = new Node(element);
    var currentNode = tail;

    if (currentNode === null) {
      head = node;
      tail = node;
    } else {
      currentNode.next = node;
      node.prev = currentNode;
      tail = node;
    }

    length++;
  };

  this.insert = function(position, element) {
    var node = new Node(element);
    var currentNode = head;
    var index = 0;
    var previousNode;

    if (position < 0 || position > length) {
      return false
    } else {
      if (position === 0) {
        if (!head) {
          head = node;
          node.next = currentNode;
        } else {
          node.next = currentNode;
          currentNode.prev = node; // 增加前指针
          head = node;
        }
      } else if (position === length) {
        this.append(element);
      } else {
        while (index < position) {
          index++;
          previousNode = currentNode;
          currentNode = currentNode.next;
        }
        node.next = currentNode;
        node.prev = previousNode;
        previousNode.next = node;
        currentNode.prev = node;
      }

      length++;
      return true;
    }
  }

  this.removeAt = function(position) {
    if (position < 0 || position >= length || length === 0) {
			return false;
		} else {
      var currentNode = head;
			var index = 0;
      var previousNode;
      
      if (position === 0) {
        if (length === 1) {
          head = null;
          tail = null;
        } else {
          head = currentNode.next;
          currentNode = head;
          currentNode.prev = null;
          previousNode = null;
        }
      } else if (position === length - 1) {
        // if (length === 1) {
        //   head = null;
        //   tail = null;
        // } else {          
          currentNode = tail;
          tail = currentNode.prev;
          tail.next = null;
        // }
      } else {
        while (index < position) {
          index++;
          previousNode = currentNode;
          currentNode = currentNode.next;
        }
        previousNode.next = currentNode.next;
        currentNode.next.prev = previousNode;  
      }
      length--;
      return true;
    }
  }

	this.remove = function(element) {
		var index = this.indexOf(element);
		return this.removeAt(index);
	};

	this.indexOf = function(element) {
		var currentNode = head;
		var index = 0;

		while (currentNode) {
			if (currentNode.element === element) {
				return index;
			}

			index++;
			currentNode = currentNode.next;
		}

		return -1;
	};

  this.isEmpty = function() {
    return length == 0;
  };

  this.size = function() {
    return length;
  };

  this.getHead = function() {
    return head.element;
  };

  this.toString = function() {
    var currentNode = head;
    var string = '';

    while (currentNode) {
      string += ',' + currentNode.element;
      currentNode = currentNode.next;
    }
    return string.slice(1);
  };

  this.print = function() {
    console.log(this.toString());
  };

  this.list = function() {
    console.log('head: ', head);
    return head;
  };

}

/*
console.log('------- 双向链表 -------')
var doublyLinked = new DoublyLinkedList();
console.log(doublyLinked.isEmpty()); // true
doublyLinked.append('Tom');
doublyLinked.append('Peter');
doublyLinked.append('Paul');
doublyLinked.print(); // "Tom,Peter,Paul"
doublyLinked.insert(0, 'Susan');
doublyLinked.print(); // "Susan,Tom,Peter,Paul"
doublyLinked.insert(1, 'Jack');
doublyLinked.print(); // "Susan,Jack,Tom,Peter,Paul"
console.log(doublyLinked.getHead()); // "Susan"
console.log(doublyLinked.isEmpty()); // false
console.log(doublyLinked.indexOf('Peter')); // 3
console.log(doublyLinked.indexOf('Cris')); // -1
doublyLinked.remove('Tom');
doublyLinked.removeAt(2);
doublyLinked.print(); // "Susan,Jack,Paul"
doublyLinked.list(); // 请看控制台输出
 */


/**
 * 循环链表
 */

function CircularLinkedList() {
  var length = 0;
  var head = null;

  function Node(element) {
    this.element = element
    this.next = head;
  }

  this.append = function(element) {
    var node = new Node(element);
    var currentNode;

    if (!head) {
      head = node;
      node.next = head;
    } else {
      currentNode = head;
      while (currentNode.next !== head) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
      node.next = head;
    }

    length++;
    return true;
  }

  this.insert = function(position, element) {
    if (position < 0 || position > length) {
      return false;
    }
    var node = new Node(element);
    var index = 0;
    var currentNode = head;
    var previousNode;

    if (position === 0) {
      node.next = head;
      head = node;
    } else {
      while (index < position) {
        index++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = node;
      node.next = currentNode;
    }
    length++;
    return true;
  }

  this.removeAt = function(position) {
    if (position < 0 || position > length || length === 0) {
      return false;
    }
    var currentNode = head;
    var index = 0;
    var previousNode;

    if (position === 0) {
      head = currentNode.next;
    } else {
      while (index < position) {
        index++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next;
    }
    length--;
    return currentNode.element;
  }

  this.remove = function(element) {
    var currentNode = head;
    var index = 0;
    var previousNode;

    while (currentNode && index < length) {
			if (currentNode.element === element) {
				if (index == 0) {
					head = currentNode.next;
					length--;
					return true;
				} else {
					previousNode.next = currentNode.next;
					length--;
					return true;
				}
			} else {
				previousNode = currentNode;
				currentNode = currentNode.next;
				index++;
			}
		}
		return false;
  }
  
  this.indexOf = function(element) {
		var currentNode = head,
			index = 0;
		while (currentNode && index < length) {
			if (currentNode.element === element) {
				return index;
			} else {
				index++;
				currentNode = currentNode.next;
			}
		}
		return -1;
  };
  
	this.isEmpty = function() {
		return length === 0;
  };
  
	this.size = function() {
		return length;
	};

	this.toString = function() {
		var currentNode = head,
			string = '',
			index = 0;
		while (currentNode && index < length) {
			string += ',' + currentNode.element;
			currentNode = currentNode.next;
			index++;
		}
		return string.slice(1);
	};

	this.getHead = function() {
		return head.element;
	};

	this.print = function() {
		console.log(this.toString());
	};

	this.list = function() {
		console.log('head: ', head);
		return head;
	};
  
}

/**
console.log('------- 循环链表 -------')
var circularLinked = new CircularLinkedList();
console.log(circularLinked.removeAt(0)); // false
console.log(circularLinked.isEmpty()); // true
circularLinked.append('Tom');
circularLinked.append('Peter');
circularLinked.append('Paul');
circularLinked.print(); // "Tom,Peter,Paul"
circularLinked.insert(0, 'Susan');
circularLinked.print(); // "Susan,Tom,Peter,Paul"
circularLinked.insert(1, 'Jack');
circularLinked.print(); // "Susan,Jack,Tom,Peter,Paul"
console.log(circularLinked.getHead()); // "Susan"
console.log(circularLinked.isEmpty()); // false
console.log(circularLinked.indexOf('Peter')); // 3
console.log(circularLinked.indexOf('Cris')); // -1
circularLinked.remove('Tom');
circularLinked.print();
circularLinked.removeAt(2);
circularLinked.print(); // "Susan,Jack,Paul"
circularLinked.list(); // 具体控制台
 */


function DoublyCircularLinkedList() {
   var length = 0, head = null, tail = null;

   function Node(element) {
     this.element = element;
     this.next = head;
     this.prev = head;
   }

   this.append = function(element) {
    var node = new Node(element);
    var currentNode = head;
    var previousNode;

    if (head === null) {
      head = node;
      tail = node;
      currentNode = head;
      previousNode = currentNode;
      currentNode.next = node;
      currentNode.prev = previousNode;
    } else if (length == 1) {
      tail = node;
      currentNode.next = node;
      head.prev = tail;
      tail.next = head;
      previousNode = currentNode;
      currentNode = currentNode.next;
    } else {
      while (currentNode.next !== head) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }

      node.prev = currentNode;
      node.next = head;
      currentNode.next = node;
      currentNode.prev = currentNode;
      previousNode = currentNode;
      currentNode = currentNode.next;
      tail = currentNode;
      head.prev = currentNode;

      // 另一种写法
      // node.prev = currentNode;
      // node.next = head;
      // head.prev = node;
      // currentNode.next = node;
      // previousNode = currentNode;
      // currentNode = currentNode.next;
      // tail = node;
    }
    length++;
    return true;
  }

  this.insert = function(position, element) {
    if (position < 0 || position > length) {
      return false;
    }

    var node = new Node(element);
    var index = 0;
    var currentNode = head;
    var previousNode;

    if (position === 0) {
      node.next = head;
      node.prev = tail;
      tail.next = node;
      head.prev = node;
      head = node;
      currentNode = head;
    } else if (position === length) {
      this.append(element);
      return
    } else {
      while (index < position) {
        index++;
        previousNode = currentNode;
        currentNode = currentNode.next; 
      }
      node.next = currentNode;
      node.prev = previousNode;
      previousNode.next = node;
      currentNode.prev = node;
      previousNode = node;
    }

    length++;
    return true;
  }

  this.removeAt = function(position) {
    if (position < 0 || position > length) {
      return false;
    }
    if (length === 0) {
      return false;
    }
    var index = 0;
    var currentNode = head;
    var previousNode;

    if (position === 0) {
      head.next.prev = tail;
      tail.next = head.next;
      head = head.next;
      currentNode = head;
    } else if (position === length) {
      tail.prev.next = head;
      head.prev = tail.prev;
      tail = tail.prev;
      currentNode = tail;
      previousNode = currentNode.prev;
    } else {
      while (index < position) {
        previousNode = currentNode;
        currentNode = currentNode.next;
        index++;
      }
      previousNode.next = currentNode.next;
      currentNode.next.prev = previousNode;
      currentNode = currentNode.next;
    }

    length--;
    return true;
  }

  this.remove = function(element) {
    this.removeAt(this.indexOf(element));
  }

  this.indexOf = function(element) {
		var currentNode = head,
			index = 0;
		while (currentNode && index < length) {
			if (currentNode.element === element) {
				return index;
			} else {
				index++;
				currentNode = currentNode.next;
			}
		}
		return -1;
  };

  this.toString = function() {
		var currentNode = head,
			string = '',
			index = 0;
		while (currentNode && index < length) {
			string += ',' + currentNode.element;
			currentNode = currentNode.next;
			index++;
		}
		return string.slice(1);
  };
  
  this.isEmpty = function() {
		return length === 0;
  };
  
  this.size = function() {
		return length;
  };

	this.getHead = function() {
		return head.element;
	};

	this.print = function() {
		console.log(this.toString());
	};

	this.list = function() {
		console.log('head: ', head);
		return head;
	};
}

/**
 * 双向循环列表
 */
// var dclList = new DoublyCircularLinkedList();

// dclList.append('0');
// dclList.append('1');
// dclList.append('3');
// dclList.append('4');
// console.log(dclList.size());
// dclList.print();
// dclList.insert(2,'2');
// console.log(dclList.size());
// dclList.print();
// dclList.removeAt(1);
// dclList.print();
// dclList.list();
// dclList.removeAt('4');
// dclList.print();
// dclList.list();