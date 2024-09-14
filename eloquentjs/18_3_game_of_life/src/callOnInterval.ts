function callOnInterval(intervalMilliseconds: number, callback: Function, stopCondition: Function = () => false) {
    let lastCallTime: number | null = null;

    function loop(time: number) {
        if (lastCallTime === null) {
            lastCallTime = time;
        }

        if (stopCondition()){
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
