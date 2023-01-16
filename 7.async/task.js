class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.timerId = null;
  }

  addClock(timeToStart, cb, id) {
    if (!id) {
      throw new Error('error text')
    }
    let searchId = this.alarmCollection?.find((el) => el?.id === id);

    if (searchId) {
      return console.error('error text');
    }
    this.alarmCollection.push({ time:timeToStart, cb, id })
  }

  removeClock(id) {
    this.alarmCollection = this.alarmCollection.filter((el) => el.id !== id)
  }

  getCurrentFormattedTime() {
    let time = new Date();
    return time.toLocaleTimeString().slice(0, -6)
  }

  start() {
    function checkClock(time) {
      let nowTime = this.getCurrentFormattedTime()
      if (time.time === nowTime) {
        time.cb();
      }
    }
    

    setInterval(() => {
      this.alarmCollection.forEach((el) => checkClock(el.time))
    }, 1000)

  }


  stop(id) {
    this.alarmCollection.forEach(el => {
      if (el.id === id) {
        clearInterval()
      }
    })
  }

  printAlarms() {
    this.alarmCollection.forEach((el) => console.log(`id: ${el.id}; time: ${el.time}`))
  }

  clearAlarms() {
    this.alarmCollection.length = 0;
  }
}

const a = new AlarmClock();
console.log(a.getCurrentFormattedTime())