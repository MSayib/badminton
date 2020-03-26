<template>
  <div>
<<<<<<< HEAD
      <span>{{ time }}</span>
      <div>
          <button @click="start" class="btn btn-md text-primary">Start</button>
          <button @click="stop" class="btn btn-md text-danger">Stop</button>
          <button @click="reset" class="btn btn-md text-secondary">Reset</button>
      </div>
=======
      <b-container>
      </b-container>
    <button @click="start">Start</button>
    <button @click="stop">Stop</button>
    <button @click="reset">Reset</button>
    <p>{{formattedElapsedTime}}</p>
>>>>>>> master
  </div>
</template>

<script>
export default {
<<<<<<< HEAD
    data(){
        return{
            time: '00:00:00.000',
            timeBegan: null,
            timeStopped: null,
            stoppedDuration: 0,
            started: null,
            running: false
        }
    },

    methods:{
        start(){
            if(running == true) return;
            if(timeBegan == null){
                reset();
                timeBegan = new Date();
            }
            if(timeStopped !== null){
                stoppedDuration += (new Date() - timeStopped);
            }

            started = setInterval(clockRunning, 10);
            running = true;
        },

        stop(){
            running = false;
            timeStopped = new Date();
            clearInterval(started);
        },

        reset(){
            running = false;
            clearInterval(started);
            stoppedDuration = 0;
            timeBegan = null;
            timeStopped = null;
            clock.time = "00:00:00.000";
        },

        clockRunning(){
            var currentTime = new Date(),
            timeElapsed = new Date(currentTime - timeBegan - stoppedDuration),
            hour = timeElapsed.getUTCHours(),
            min = timeElapsed.getUTCMinutes(),
            sec = timeElapsed.getUTCSeconds(),
            ms = timeElapsed.getUTCMilliseconds();

            clock.time =
            zeroPrefix(hour, 2) + ":" +
            zeroPrefix(min, 2) + ":" +
            zeroPrefix(sec, 2) + "." +
            zeroPrefix(ms, 3)
        },

        zeroPrefix(num, digit){
            var zero = '';
            for(var i = 0; i < digit; i++){
                zero += '0';
            }

            return(zero + num).slice(-digit);
        }
    }
}
</script>

<style>

</style>
=======
  data() {
    return {
      elapsedTime: 0,
      timer: ''
    };
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    }
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.elapsedTime = 0;
    }
  }
};
</script>
>>>>>>> master
