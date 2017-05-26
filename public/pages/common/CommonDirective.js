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