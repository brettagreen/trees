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

        if (!node || !node.left || !node.right) {
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

        if (!node || !node.left && !node.right) {
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

        if (!node) {
           return 0;
        } else if (!node.left && !node.right) {
            return node.val;
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
        if (!this.root) return null;

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
    areCousins(node1, node2) {
        let answers = {1:null,2:null};

        function getDepth(node, count, parent=null) {
            if ([node1, node2].includes(node)) {
                if (!parent) {
                    answers = null;
                    return
                }
                if (!answers[1]) {
                    answers[1]=[count, parent];
                } else {
                    answers[2]=[count, parent];
                    return;
                }
            } 

            count++;

            if (node.left) {
               getDepth(node.left, count, node);
            }

            if (node.right) {
               getDepth(node.right, count, node);
            }

        }

        getDepth(this.root, 1);

        if (!answers) {
            return false;
        } else if (!answers[1] || !answers[2]) {
            return "one or both node values not found in binary tree";
        } else if (answers[1][0] === answers[2][0] && answers[1][1] !== answers[2][1]) {
            return true;
        } else {
            return false;
        }
    }

}

/** Further study!
 * serialize(tree): serialize the BinaryTree object tree into a string. */
// for now, this code will only work with unique node values
// I'm thinking a better solution would have each node having a unique id (instead of relying on each node's value)

function serialize(tree) {
    let stringified = `{"val": ${tree.root.val}, "left": ${tree.root.val}, "right": ${tree.root.val} }`;

    function buildString(node) {
        if (node.left) { 
            if (!node.right) {
                stringified = stringified.replace(`"right": ${node.val}`, '"right": null');
            }
            stringified = stringified.replace(`"left": ${node.val}`, `"left": {"val": ${node.left.val}, 
                "left": ${node.left.val}, "right": ${node.left.val}}`);
            buildString(node.left);
        } 
        
        if (node.right) {
            if (!node.left) {
                stringified = stringified.replace(`"left": ${node.val}`, '"left": null');
            }
            stringified = stringified.replace(`"right": ${node.val}`, `"right": {"val": ${node.right.val},
                    "left": ${node.right.val}, "right": ${node.right.val}}`);
            buildString(node.right);
        }         
        
        if (!node.left && !node.right) {
            stringified = stringified.replace(`"left": ${node.val}`, '"left": null').replace(`"right": ${node.val}`, '"right": null');                
        }
    
    }

    buildString(tree.root);
    return stringified;
}

// take BinaryTree, serialize it, parse resulting string to Object, and turn Object back into a BinaryTree
function deserialize(tree) {
    const so = JSON.parse(serialize(tree));
    const rootNode = new BinaryTreeNode(so.val);

    function buildTree(currNode, aspect, turn) {
        if (aspect === 'left') {
            if (!turn) {
                currNode.left = null;
            } else {
                currNode.left = new BinaryTreeNode(turn.val);
                subTree(currNode.left, turn);
            }
        } else {
            if (!turn) {
                currNode.right = null;
            } else {
                currNode.right = new BinaryTreeNode(turn.val);
                subTree(currNode.right, turn);
            }
        }

        function subTree(currNode, turn) {
            let leftTurn;
            let rightTurn;

            if (!turn.left) {
                currNode.left = null
            } else {
                currNode.left = new BinaryTreeNode(turn.left.val);
                leftTurn = !turn.left ? null : turn.left;
            }

            if (!turn.right) {
                currNode.right = null;
            } else {
                currNode.right = new BinaryTreeNode(turn.right.val);
                rightTurn = !turn.right ? null : turn.right;
            }

            if (leftTurn) {
                subTree(currNode.left, leftTurn);
            }
            if (rightTurn) {
                subTree(currNode.right, rightTurn);
            }
        }
    
    }

    buildTree(rootNode, 'left', so.left);
    buildTree(rootNode, 'right', so.right);

    return new BinaryTree(rootNode);
}


module.exports = { BinaryTree, BinaryTreeNode, serialize, deserialize };
