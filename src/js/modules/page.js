export default class Page {

  constructor(doc = 'body') {
    this.doc = document.querySelector(doc);
    this.cssClasses = this.doc.className.split(' ');
  }

  /**
   * Gets index of a CSS class in the parent element
   */
  getIndex(cls) {
    var ind = false;
    var self = this;
    var classNames = (typeof cls === 'string') ? [cls] : cls;
    if (!Array.isArray(classNames)) return ind;
    classNames.filter(function(i) {
      if (self.cssClasses.indexOf(i) >= 0) return ind = true;
    });
    return ind;
  }

  is(cls, cb) {
    if (this.getIndex(cls)) {
      document.addEventListener('DOMContentLoaded', cb);
    }
  }

  not(cls, cb) {
    if (!this.getIndex(cls)) {
      document.addEventListener('DOMContentLoaded', cb);
    }
  }

  has(cls, cb) {
    document.addEventListener('DOMContentLoaded', function() {
      var els = document.querySelectorAll(cls);
      if (els.length) cb();
    });
  }

  hasnt(cls, cb) {
    document.addEventListener('DOMContentLoaded', function() {
      var els = document.querySelectorAll(cls);
      if (!els.length) cb();
    });
  }

  all(cb) {
    document.addEventListener('DOMContentLoaded', cb);
  }

}
