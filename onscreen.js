/* On Screen */
(function() {

  /* Utilities */
  // get element position relative to the document
  function getPosition(ele) {
    var rect = ele.getBoundingClientRect();
    return {
      left: rect.left + document.body.scrollLeft,
      top: rect.top + document.body.scrollTop
    };
  }

  // convert HTML node list into array
  function select(selectors) {
    if (typeof selectors === 'string') {
      return Array.prototype.slice.call(document.querySelectorAll(selectors));
    }else {
      return console.log('Invalid selectors');
    }
  }

  /* Watcher */
  function Watcher(pool, on, enterFn, leaveFn) {
    // elements to be watched
    this.pool = pool,
    // elements entered the viewport
    this.on = on,
    // function called when element enter the viewport
    this.enterFn = enterFn,
    // function called when element leave the viewport
    this.leaveFn = leaveFn
  }

  Watcher.prototype.detect = detect;

  // detect when elements enter or leave the viewport
  function detect(enterFn, leaveFn) {
    
    this.pool.forEach(function(ele) {
      if ( window.pageYOffset + window.innerHeight >= getPosition(ele).top && 
           window.pageYOffset <= getPosition(ele).top + ele.offsetHeight) {
        // add element to on when it enters the viewport
        if (this.on.indexOf(ele) === -1) {
          this.on.push(ele);
          if (typeof enterFn !== 'undefined') {
            enterFn(ele);
          }
        }
      }else {
        // remove element form on when it leaves the viewport
        if (this.on.indexOf(ele) !== -1) {
          this.on.splice(this.on.indexOf(ele), 1);
          if(typeof leaveFn !== 'undefined') {
            console.log(typeof leaveFn);
            leaveFn(ele);
          }
        }
      }
    }, this);

  }

  // watch elements and creat a watcher each time called
  function watch(selectors, enterFn, leaveFn) {
    var self = this;
    var selectorList;
    var pool = [];
    var on = [];

    if (typeof selectors === 'string') {
      this.watcher_count += 1
      selectorList = selectors.split(/,\s*/);

      // build elements pool
      selectorList.forEach(function(selector) {
        select(selector).forEach(function(ele) {
          pool.push(ele);
        });
      });

      // create watcher
      this['watcher_' + this.watcher_count] = new Watcher(pool, on, enterFn, leaveFn)
    }else {
      return console.log('Only accepts string and selectors sperate by comma.');
    }
  }

  
  // detect watched elements on load
  document.addEventListener('load', function() {
    if(test.watcher_count > 0) {
      for (i = 1; i <= test.watcher_count; i++) {
        test['watcher_' + i].detect(test['watcher_' + i].enterFn, test['watcher_' + i].leaveFn);
      }
    } 
  });

  // detect watched elements on scroll
  document.addEventListener('scroll', function() {
    if(test.watcher_count > 0) {
      for (i = 1; i <= test.watcher_count; i++) {
        test['watcher_' + i].detect(test['watcher_' + i].enterFn, test['watcher_' + i].leaveFn);
      }
    } 
  });
  

  // detect watched elements on resizing
  window.addEventListener('resize', function() {
    if(test.watcher_count > 0) {
      for (i = 1; i <= test.watcher_count; i++) {
        test['watcher_' + i].detect(test['watcher_' + i].enterFn, test['watcher_' + i].leaveFn);
      }
    } 
  });
  

  return test = {
    watcher_count: 0,
    watch: watch
  }
})();



	


