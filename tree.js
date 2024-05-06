	/** TreeNode: node for a general tree. */

class TreeNode {
	constructor(val, children = []) {
		this.val = val;
		this.children = children;
	}
}

class Tree {
	constructor(root = null) {
		this.root = root;
	}

	/** sumValues(): add up all of the values in the tree. */

	sumValues() {
		if (!this.root) return 0;
		let sum = 0;
		let stack = [this.root];
		while (stack.length) {
			let current = stack.pop();
			
			sum += current.val;
	  
			for (let child of current.children) {
				stack.push(child);
			}
		}
		
		return sum;
	}

	/** countEvens(): count all of the nodes in the tree with even values. */

	countEvens() {
		if (!this.root) return 0;
		let evenValues = 0;
		let queue = [this.root];

		while (queue.length) {
			let current = queue.shift();

			if (current.val % 2 === 0) {
				evenValues++;
			}

			for (let child of current.children) {
				queue.push(child);
			}
		}

		return evenValues;

	}

	/** numGreater(lowerBound): return a count of the number of nodes
	 * whose value is greater than lowerBound. */

	numGreater(lowerBound) {
		if (!this.root) return 0;
		let lowerThan = 0;
		let queue = [this.root];

		while (queue.length) {
			let current = queue.shift();

			if (current.val > lowerBound) {
				lowerThan++;
			}

			for (let child of current.children) {
				queue.push(child);
			}
		}

		return lowerThan;

	}
}

// const elm = new Tree(new TreeNode(25, [new TreeNode(30), new TreeNode(35, [new TreeNode(40), new TreeNode(45)])]));
// console.log(elm.sumValues());
// console.log(elm.countEvens());
// console.log(elm.numGreater(25));


module.exports = { Tree, TreeNode };
