# setTimeout时间设置为0详细解析

## 开胃菜，setTimeout为何物?

#### 首先看一下w3school上面对于setTimeout的解释

> setTimeout(fn,millisec) 方法用于在指定的毫秒数后调用函数或计算表达式。

```js
setTimeout(function(){
 console.log(`'我是setTimeout'`);
}, 1000);
```

正常情况下，我是setTimeout 这句话并不会马上输出而是等1000毫秒以后会在浏览器的控制台输出。

## 主菜，js是单线程的

OK，看一个例子，这个例子的输出结果是什么？

```js
setTimeout(function(){
 console.log(1);
}, 0);
console.log(2);
console.log(3);
```

出乎一些人的意料，得到的结果竟然是2、3、1。

这就需要搞清楚一个很重要的概念：js是单线程的，单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

其实很好理解，就像大家去超市买东西一样，所有买东西的人都需要在收银台排队结账，正常情况下每个收银台同一时间只能为一位顾客结账，这位顾客结账完成才能为下一位顾客服务。

而浏览器的内核是多线程的，它们在内核制控下相互配合以保持同步，一个浏览器至少实现三个常驻线程：javascript引擎线程，GUI渲染线程，浏览器事件触发线程。

* javascript引擎是基于事件驱动单线程执行的，JS引擎一直等待着任务队列中任务的到来，然后加以处理，浏览器无论什么时候都只有一个JS线程在运行JS程序。
* GUI渲染线程负责渲染浏览器界面，当界面需要重绘（Repaint）或由于某种操作引发回流(reflow)时,该线程就会执行。但需要注意 GUI渲染线程与JS引擎是互斥的，当JS引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行。
* 事件触发线程，当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理。这些事件可来自JavaScript引擎当前执行的代码块如setTimeOut、也可来自浏览器内核的其他线程如鼠标点击、AJAX异步请求等，但由于JS的单线程关系所有这些事件都得排队等待JS引擎处理。（当线程中没有执行任何同步代码的前提下才会执行异步代码）

setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。

## 甜品，setTimeout的妙用

## 1. 函数去抖

让一个函数在一定间隔内没有被调用时，才开始执行被调用方法。比如当你在使用 google 搜索内容的时候，有些关键词输入到一半，谷歌会展示一个可选列表，根据你当前输入的内容作出的一个猜测联想。需要监听文字改变，每一次改变都会调用一次回调函数，现在需要的一种实现是在用户停止键盘事件一段时间后，去发送一个请求。

```js
var debounce = function(method, context) {
 clearTimeout(method.tId);
 method.tId = setTimeout(function(){
  method.call(context);
 },100);
}
```

## 2. 轮询任务

js中可以使用setInterval开启轮询，但是这种存在一个问题就是执行间隔往往就不是你希望的间隔时间。

比如有个轮询任务间隔是100ms，但是执行方法的时间需要450ms，那么在200ms、300ms、400ms本来是计划中执行任务的时间，浏览器发现第一个还未执行完，那么就会放弃2、3、4次的任务执行，并且在500ms之后再次执行任务，这样的话，其实再次执行的间隔就只有50ms。使用setTimeout构造轮询能保证每次轮询的间隔。

```js
setTimeout(function () {
 console.log('我被调用了');
 setTimeout(arguments.callee, 100);
}, 100);
```

## 3. 延迟js引擎执行

```js
var div = document.createElement('div');
div.innerHTML = '我是一个div';
div.setAttribute('style', 'width:200px; height:200px;background-color:#f00; ');
document.body.appendChild(div);
setTimeout(function() {
 console.log('我被调用了');
}, 1000);
```
