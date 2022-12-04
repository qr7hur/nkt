(function() {

var tfh = false;
try { tfh = top.location.host != location.host; }
catch (e) { tfh = true; }
if (tfh) top.location.href = location.href;

})();
