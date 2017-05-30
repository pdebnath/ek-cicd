var eknock=eknock||angular.module('eknock');

eknock.directive('infiniteScroll', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];

        elm.on('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= ( raw.scrollHeight - 100)) {
                scope.$apply(attr.infiniteScroll);
            }
        });
    };
});

eknock.directive('checklistBgcolor', function() {
  return {
    restrict: 'AC',
    link: function(scope, el, attr) {
       el.css('color', ( scope.$index + 1 == scope.disabledList[1] ? '#009688': ''));     
    }
  }
})