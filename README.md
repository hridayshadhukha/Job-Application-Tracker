

### Q1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
A: getElementById selects one element using its unique ID. getElementsByClassName selects elements using a class name and returns multiple elements. querySelector returns the first matching element for a CSS selector and querySelectorAll returns all elements that match a CSS selector.

### Q2.How do you create and insert a new element into the DOM?
A: To create a new element in the DOM, first a new element is created using document.createElement() in JavaScript. The element created using appendChild() is inserted at a specific location in the DOM.

### Q3. What is Event Bubbling? And how does it work?
A: Event Bubbling is an event propagation process. When an event occurs on a child element, it is first executed on that element and then proceeds step by step to its parent element and upwards.

### Q4. What is Event Delegation in JavaScript? Why is it useful?
A: Event Delegation is a technique where a single event listener is added to the parent element and that listener is used to handle events of all its child elements. Event Delegation is very useful because it uses less memory and increases performance.

### Q5.What is the difference between preventDefault() and stopPropagation() methods?
A: preventDefault() stops the default behavior of an element. stopPropagation() stops event bubbling.



