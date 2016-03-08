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
		return url.replace(/.*?:\/\//g, '').split(/[?#]/)[0];;
	}

	function getResourceTimings(resource) {
		// Todo - Add relevant keys to determine cache hit
		return {
			url : sanitizeUrl(resource.name),
			duration: resource.duration
		}
	}

	function checkCacheHit(resource) {
		// Need to change logic
		if (resource.duration === 0) {
			return true;
		}
		return false;
	}

	function findCacheHitRatio(resource) {
		return resource.cacheHit/resource.totalHits * 100 + '%';
	}

	function computeHitsOfResouce(resource) {
		var localStorage = w.localStorage;
		var storedResource = JSON.parse(localStorage.getItem(resource.url)) || resource;
		var cacheHitRatio;

		if(storedResource.totalHits) {
			storedResource.totalHits++;
		} else {
			storedResource.totalHits = 1;
		}
		// For Cache validation
		storedResource.duration = resource.duration;

		if(storedResource.cacheHit) {
			if (checkCacheHit(storedResource)) {
				storedResource.cacheHit++;
			}
		} else {
			if (checkCacheHit(storedResource)) {
				storedResource.cacheHit++;
			} else {
				storedResource.cacheHit = 0;
			}
		}
		cacheHitRatio = findCacheHitRatio(storedResource);
		resource.cacheHitRatio = cacheHitRatio;
		localStorage.setItem(resource.url, JSON.stringify(storedResource));

		return storedResource;
	}

	function findHitsRatio(entries) {
		for (var key in entries) {
			if (entries.hasOwnProperty(key)) {
				var resource = entries[key];
				entries[key] = computeHitsOfResouce(resource);
			}
		}
		return entries;
	}

	function drawTimings(data) {
	}

	if(w.performance && w.performance.getEntriesByType) {

		var entries = getEntries();
		var updatedEntries = findHitsRatio(entries);
		drawTimings(updatedEntries);
	}
	else {
		alert("Resource Timing API not supported");
	}

})(window, window.document)