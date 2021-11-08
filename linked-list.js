/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    /** Initializing a new node object and storing it in the newNode variable*/
    const newNode = new Node(val);

    if (!this.head) {
      /** If there is no head value then this.head is assigned newNode value
       *  and this.tail holds the this.head.
      */
      this.head = newNode;
      this.tail = this.head;
    } else {
      /** If there is a this.head value then this.tail.next is assigned the
       * value of newNode and this.tail is assigned the value of the newNode.
      */
      this.tail.next = newNode;
      this.tail = newNode;
    }
    /**This keeps track of the new addition to the list */
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    /** Initializing a new node object and storing it in the newNode variable*/
    const newNode = new Node(val);

    if (!this.head) {
      /** If there is no head value then this.head is assigned newNode value
       *  and this.tail holds the this.head.
      */
      this.head = newNode;
      this.tail = this.head;
    }else {
      /** Storing the current head value to the shiftCurrentHeadValue variable.
       *  Replacing the this.head value with the newNode value.
       *  Then adding back the first head value back and placing it second to 
       *  the new head value.
      */
      const shiftCurrentHeadValue = this.head;
      this.head = newNode;
      this.head.next = shiftCurrentHeadValue; 
    }
    /**This keeps track of the length of the list */
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
      if (this.length === 0) throw new Error('Empty list');
      /** Assigning the currentNode to the this.head for the starting point 
      *   to get the value in the list
      */
      let current = this.head;

      /** If current equals the head at index 0 and next value is null
       *  then tail is set to null and head is set to null and 1 minus
       *  the length to account for removing the current val
       *  Return popped value current
       */
      if (current === this.head && current.next === null) {
        this.tail = null;
        this.head = null;
        this.length -= 1;
        return current.val;
      }

      /** Looping through the list as long as there is a current.next value
       *  updating the current value to the current.next
       */
      while (current.next.next) {
        current = current.next;
      }
  
      /** Assigning the current.next to the removed variable */
      const removed = current.next;
      this.tail = current;
      current.next = null;
      this.length -= 1;
      /** Returning the removed value */
      return removed.val;

  }

  /** shift(): return & remove first item. */

  shift() {
    /** Assign the removedNode to the value of the head
     *  Set the new head to the next in line value on the list with this.head.next
     *  Subtract 1 from the length to reflect the removedNode
     */
     const nodeToRemove = this.head;
     this.head = this.head.next;
     this.length -= 1;
     /** If there is nothing in the list set the tail to null */
     if (!this.length) {
       this.tail = null;
     }
     /** Return the removedNode value */
     return nodeToRemove.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    /** Assigning the currentNode to the this.head for the starting point 
     *  to get the value in the list
     *  Assigning count variable to zero for starting point of the while loop
    */
     let current = this.head;
     let count = 0;

     /** While count is less than the index the current gets the value of the
      *  the next value on the list
      *  Count increases by one until the count is no longer less than the index
      */
    while (count < idx) {
      current = current.next;
      count += 1;
    }
    /** Return the currentNode value*/
    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    /** Assigning the current to the this.head for the starting point 
     *  to get the value in the list
     *  Assigning count variable to zero for starting point of the while loop
    */
    let current = this.head;
    let count = 0;

    /** While the count is less than the index minus 1, the current new value
     *  becomes the next value in the list. You subtract 1 from the index input
     *  because it cause a error at where the new value gets set. For example, if 
     *  the set index target is 4 it would be set at 5 because -1 was not subtracted
     *  The count variable keeps track of the index. 
     */

    if (idx === 0) this.head.val = val;
    
    while (count < (idx - 1)) {
      current = current.next;
      count += 1;
    }
    /** Set the current.next.val to the val input*/
    current.next.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    /** If index is less than or greater than list length that means 
     *  index is not valid
     */
    if (idx < 0 || idx > this.length) throw new Error('Index outside of list');
    
    /** Creating a node object with the key word new
     *  Assigning the current to the this.head for the starting point 
     *  to get the value in the list
     *  Assigning count variable to zero for starting point of the while loop
    */
    let node = new Node(val);
    let current = this.head;
    let count = 0;

    /** If the length is zero then set the head and tail to the node and
     * add 1 to the total length
    */
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
      this.length += 1;

    /** Else if the idx is equal to zero set the next node value to the head
     *  set the head to the node and add to the length of the list
    */
    } else if (idx === 0) {
      node.next = this.head;
      this.head = node;
      this.length += 1;

    /** Else while the count is less than the index minus one 
     *  set the current to the current.next and add 1 to the count everytime
    */
    } else {
      while (count < (idx - 1)) {
        current = current.next;
        count += 1;
      }

    /** If there is a current.next set the node.next to the current.next and
     *  set the current.next to the node
    */
      if (current.next) {
        node.next = current.next;
        current.next = node;

    /** Else Set the current.next to the node and set the tail to the node*/
      } else {
        current.next = node;
        this.tail = node;
      }

    /** Add one to the length*/
      this.length += 1;
    }
    /** If value can not be inserted, return undefined */
    return undefined;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    /** If index is less than or greater than list length that means 
     *  index is not valid
    */
    if (idx < 0 || idx >= this.length) throw new Error('Out of bounds');

    /**  Assigning the current to the this.head for the starting point 
     *   to get the value in the list
     *   Assigning count variable to zero for starting point of the while loop
     */
    let current = this.head;
    let count = 0;
    /** If index is equal to 0 and the length is 1 
     *  Set the head to null
     *  Swt the tail to null
     *  Set the length to 0
     *  Return the current.val removed value
    */
    if (idx === 0 && this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return current.val;
    }
    
    /** While the count is less than index minus 1 
     *  set the current to current.next
     *  add a one to the count
     */
    while (count < (idx - 1)) {
      current = current.next;
      count += 1;
    }

    /** Assign the val variable to the current.next.val 
     *  Set the current.next to the current.next.next
     *  return the removed val
    */
    const val = current.next.val;
    current.next === current.next.next;
    this.length -= 1;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    /** If there is no values in the list return zero */
    if (this.length === 0) return 0;
    /** Initializing the total variable to hold sum of numbers in the list */
    let total = 0;
    /** Initializing the current to hold the first value of the list which is
     *  the head. But this will change in the loop to reflect the next values
     *  in the list.
    */
    let current = this.head;
    /** Using a while loop to iterate and count up the sum of of numbers in list 
     *  as long as there is a current value
    */
    while (current) {
      /** total variable is being updated by adding the next value of the list
       *  represented by current.val.
       *  Current gets updated with the next value on the list noted by current.next
      */
      total += current.val;
      current = current.next;
    }
    /** Return total divided by length to get the average. */
    return total / this.length;
  }
}



module.exports = LinkedList;
