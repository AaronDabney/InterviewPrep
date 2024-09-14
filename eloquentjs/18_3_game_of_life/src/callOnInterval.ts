/**
 * Calls a program periodically. Guaranteed call sequence compared to setInterval.
 * Optional halt callback
 * @param intervalMilliseconds 
 * @param callback 
 * @param stopCondition 
 */
function callOnInterval(intervalMilliseconds: number, callback: Function, halt: Function = () => false) {
    let lastCallTime: number | null = null;

    function loop(time: number) {
        if (lastCallTime === null) {
            lastCallTime = time;
        }

        if (halt()){
            return;
        }
       
        if (time - lastCallTime > intervalMilliseconds) {
          lastCallTime = time;
          callback();
        }

        requestAnimationFrame(loop);
    }
    
    requestAnimationFrame(loop);
}

export { callOnInterval }
