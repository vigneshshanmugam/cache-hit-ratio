(function(w, d) {


	function getEntries() {

		var entries = {}, resourceInfo;
		var i, resources = w.performance.getEntriesByType('resource');

		for (i = 0 ; i < resources.length; i++) {
			resourceInfo = getResourceTimings(resources[i]);
			entries[resourceInfo.url] = resourceInfo.duration;
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

	if(w.performance && w.performance.getEntriesByType) {

		var cachetimings = getEntries();

		console.log(cachetimings);
	}
	else {
		alert("Resource Timing API not supported");
	}

})(window, window.document)