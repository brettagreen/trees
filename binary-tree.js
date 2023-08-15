/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {
    constructor(root = null) {
        this.root = root;
    }

    /** minDepth(): return the minimum depth of the tree -- that is,
     * the length of the shortest path from the root to a leaf. */

    minDepth() {
        let node = this.root;
        let subLeftCount;
        let subRightCount;

        if (!node.left || !node.right) {
           return 0;
        }

        function gleanDepth(node, count) {

            if (!node.left || !node.right) {
                return count;
            } else {
                count++;
                subLeftCount = gleanDepth(node.left, count);
                subRightCount = gleanDepth(node.right, count);
            }

            return subLeftCount < subRightCount ? subLeftCount : subRightCount;
        }

        const leftCount = gleanDepth(node.left, 1);
        const rightCount = gleanDepth(node.right, 1);

        return leftCount > rightCount ? rightCount : leftCount;

    }

    /** maxDepth(): return the maximum depth of the tree -- that is,
     * the length of the longest path from the root to a leaf. */

    maxDepth() {
        let node = this.root;
        let leftCount = 0;
        let rightCount = 0;
        let subLeftCount;
        let subRightCount;

        if (!node.left && !node.right) {
           return 0;
        }

        function gleanDepth(node, count) {

            if (!node.left && !node.right) {
                return count;
            } else {
                count++;
                if (node.left) {
                    subLeftCount = gleanDepth(node.left, count);
                }
                if (node.right) {
                    subRightCount = gleanDepth(node.right, count);
                }

            }

            return subLeftCount > subRightCount ? subLeftCount : subRightCount;
        }

        if (node.left) {
            leftCount = gleanDepth(node.left, 1);
        }
        if (node.right) {
            rightCount = gleanDepth(node.right, 1);
        }

        return leftCount > rightCount ? leftCount : rightCount;
    }

    /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
     * The path doesn't need to start at the root, but you can't visit a node more than once. */

    maxSum() {
        let node = this.root;
        let leftSum = 0;
        let rightSum = 0;
        let subLeftSum;
        let subRightSum;

        if (!node.left && !node.right) {
           return node.val ? node.val : 0;
        }

        function gleanVal(node, sum) {

            if (!node.left && !node.right) {
                let val = node.val ? node.val : 0;
                return sum + val;
            } else {
                if (node.left) {
                    let val = node.val ? node.val : 0;
                    let subSum = sum + val;
                    subLeftSum = gleanVal(node.left, subSum);
                }
                if (node.right) {
                    let val = node.val ? node.val : 0;
                    let subSum = sum + val;
                    subRightSum = gleanVal(node.right, subSum);
                }

            }
            return subLeftSum > subRightSum ? subLeftSum : subRightSum;
        }

        if (node.left) {
            leftSum = gleanVal(node.left, node.val ? node.val : 0);
        }
        if (node.right) {
            rightSum = gleanVal(node.right, node.val ? node.val : 0);
        }

        return leftSum > rightSum ? leftSum : rightSum;

    }

    /** nextLarger(lowerBound): return the smallest value in the tree
     * which is larger than lowerBound. Return null if no such value exists. */

    nextLarger(lowerBound) {
        let stack = [this.root];
        let lowest = null;

        while (stack.length) {
			let current = stack.pop();

			if (current.val > lowerBound) {
                if (!lowest) {
                    lowest = current.val;
                } else if (current.val < lowest) {
                    lowest = current.val;
                }
			}
            
            if (current.left) stack.push(current.left);
            if (current.right) stack.push(current.right);

		}

        return lowest;

    }

    /** Further study!
     * areCousins(node1, node2): determine whether two nodes are cousins
     * (i.e. are at the same level but have different parents. ) */

    //presumes non-null, unique .val nodes
    areCousins(node1, node2) {
        const node = this.root;
        const answers = [];

        if ([node1.val, node2.val].includes(node.val)) {
            return false;
        }

        function getDepth(node, count, parent) {
            if ([node1.val, node2.val].includes(node.val)) {
                answers.push([count, parent]);
            } 

            count++;

            if (node.left) {
               getDepth(node.left, count, node);
            }

            if (node.right) {
               getDepth(node.right, count, node);
            }

        }

        getDepth(node, 1);

        if (answers.length === 2) {
            return answers[0][0] === answers[1][0] && answers[0][1] !== answers[1][1];
        } else {
            return "one or both node values not found in binary tree";
        }
    }

    /** Further study!
     * serialize(tree): serialize the BinaryTree object tree into a string. */
    // for now, this code will only work with unique node values

    static serialize(tree) {
        let stringified = `{"val": ${tree.root.val}, "left": ${tree.root.val}, "right": ${tree.root.val} }`;

        function buildString(node) {
            if (node.left) { 
                let aspect;
                if (!node.right) {
                    aspect = 'right';
                    stringified = stringified.replace(`"${aspect}": ${node.val}`, `"${aspect}": null`);
                }
                aspect = 'left';
                stringified = stringified.replace(`"${aspect}": ${node.val}`, `"${aspect}": {"val": ${node.left.val}, 
                    "left": ${node.left.val}, "right": ${node.left.val}}`);
                buildString(node.left, node.left);
            } 
            
            if (node.right) {
                let aspect;
                if (!node.left) {
                    aspect = 'left';
                    stringified = stringified.replace(`"${aspect}": ${node.val}`, `"${aspect}": null`);
                }
                aspect = 'right';
                stringified = stringified.replace(`"${!aspect ? 'right' : aspect}": ${node.val}`, `"${aspect}": {"val": ${node.right.val},
                     "left": ${node.right.val}, "right": ${node.right.val}}`);
                buildString(node.right, node.right);
            }         
            
            if (!node.left && !node.right) {
                stringified = stringified.replace(`"left": ${node.val}`, '"left": null').replace(`"right": ${node.val}`, '"right": null');                
            }
        
        }

        buildString(tree.root);
        console.log(stringified);
    }

    static deserialize() {

    }

    /** Further study!
     * lowestCommonAncestor(node1, node2): find the lowest common ancestor
     * of two nodes in a binary tree. */

    lowestCommonAncestor(node1, node2) {
        
    }
}

const bt = new BinaryTree();
const headNode = new BinaryTreeNode(101010);
bt.root = headNode;

const headLeft = new BinaryTreeNode(2);
headNode.left = headLeft;
const headRight = new BinaryTreeNode(11);
headNode.right = headRight;

const node1 = new BinaryTreeNode(9);
headLeft.left = node1;
const node2 = new BinaryTreeNode(10);
headLeft.right = node2;

const node3 = new BinaryTreeNode(6);
const node4 = new BinaryTreeNode(12);
headRight.left = node3;
headRight.right = node4;

node3.left = new BinaryTreeNode(7);
node4.left = new BinaryTreeNode(8);
node4.right = new BinaryTreeNode(13, new BinaryTreeNode(14), new BinaryTreeNode(15, new BinaryTreeNode(20)));

BinaryTree.serialize(bt);

//console.log(bt.areCousins(new BinaryTreeNode(9), new BinaryTreeNode(12)));

module.exports = { BinaryTree, BinaryTreeNode };
