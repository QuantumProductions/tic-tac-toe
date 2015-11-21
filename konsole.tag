<konsole>
  <div class="left">
    <u>Logs:</u>
    <div each={ log }>
      { text }
    </div>
  </div>
  <div class="right">
    <u>Watches:</u>
    <div each={ watch }>
      <b>{ key }:</b> { value }
    </div>
  </div>

  <style scoped>
    :scope {
      bottom: 0;
      height: 200px;
      position: absolute;
      right: 0;
      width: 400px;
    }
    .left, .right {
      border: 1px solid;
      box-sizing: border-box;
      float: left;
      height: 100%;
      padding: 5px;
      width: 50%;
    }
  </style>

  watch_keys = [];
  watch_ings = {};
  this.log = [];
  var that = this;
  window.konsole = {
    log: function(v) { that.log.push({ text:v }); that.update(); },
    watch: function(k,v) {
      
      if (watch_keys.indexOf(k) == -1) { watch_keys.push(k); }
      watch_ings[k] = v;
      that.update();
    }
  }

  this.on('update',function() {
    this.watch = [];
    for (var i=0;i<watch_keys.length;i++) {
      var k = watch_keys[i];
      this.watch.push({key: k, value: watch_ings[k]});
    }
  });
</konsole>
