class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.timerId = null;
    this.timeoutId = null;
  }

  addClock(time, cb, id) {
    if (!id) {
      throw new Error('error text')
    }
    let searchId = this.alarmCollection.find((el) => el.id === id);

    if (searchId) {
      return console.error('error text');
    }
    this.alarmCollection.push({ time, cb, id })
  }

  removeClock(id) {
    const arrayLength = this.alarmCollection.length;
    this.alarmCollection = this.alarmCollection.filter((el) => el.id !== id)
    return arrayLength !== this.alarmCollection.length
  }

  getCurrentFormattedTime() {
    let time = new Date();
    return time.toLocaleTimeString().slice(0, -6)
  }

  start() {
    const checkClock = (time) => {
      let nowTime = this.getCurrentFormattedTime()
      if (time.time === nowTime) {
        time.cb();
      }
    }

    if(this.timeoutId){
      return 
    }

    this.timeoutId = setInterval(() => {
      this.alarmCollection.forEach((el) => checkClock(el.time))
    }, 1000)
    
  }


  stop() {
    clearInterval(this.timeoutId);
    this.timeoutId = null;
  }

  printAlarms() {
    this.alarmCollection.forEach((el) => console.log(`id: ${el.id}; time: ${el.time}`))
  }

  clearAlarms() {
    this.alarmCollection = []
  }
}


const a = new AlarmClock()
a.addClock('12:12', () => console.log('hello'), 1)


console.log(a.alarmCollection.length)

