document.addEventListener('DOMContentLoaded', init);

function init() {
  // add tasks - events, timers
  // main stack code
  for (let i = 0; i < 1000000000; i++) {
    if (i / 10000 == 1) {
      //if statement evaluated on main stack with each iterative loop
      console.log(i);
    }
  }
  // add microtasks - Promises
  // ui render tasks
  requestAnimationFrame(animateSomething);
}

function animateSomething(timestamp) {
  // timestamp is the current time as a DOMHighResTimeStamp
  //value of the milliseconds since the page load
  //we can use this for calculations in the animation
  console.log(timestamp);
}