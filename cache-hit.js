(function(w, d) {


	function getEntries() {

		var entries = {}, resourceInfo;
		var i, resources = w.performance.getEntriesByType('resource');

		for (i = 0 ; i < resources.length; i++) {
			resourceInfo = getResourceTimings(resources[i]);
			entries[resourceInfo.url] = resourceInfo;
		}

		return entries;
	}

	function sanitizeUrl(url) {
		return url.replace(/.*?:\/\//g, '') && url.split(/[?#]/)[0];;
	}

	function getResourceTimings(resource) {
		
		return {
			url : sanitizeUrl(resource.name),
			duration: resource.duration
		}
	}

	function getCacheHitRatioOfResouce(resource) {

	}

	function checkIfCacheHit(entries) {
		for (var key in entries) {
			if (entries.hasOwnProperty(key)) {
				var entry = entries[key];

				// if (w.localStorage.get(entry.name)) {

				// }
			}
		}
	}

	if(w.performance && w.performance.getEntriesByType) {

		var cachetimings = getEntries();

		console.log(cachetimings);
	}
	else {
		alert("Resource Timing API not supported");
	}

})(window, window.document)