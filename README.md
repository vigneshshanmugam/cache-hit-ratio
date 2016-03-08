# cache-hit-ratio
A bookmarklet to find the cache-hit ratio of all resources in the browser using the Resource Timing API. 

(Work in Progress).

Inspired from [waterfall.js](https://github.com/andydavies/waterfall)

Just add the bookmarklet below to your bookmarks bar.

```
javascript:(function(d){var el=d.createElement('script');el.type='text/javascript';el.src='//cdn.rawgit.com/vigneshshanmugam/cache-hit-ratio/master/cache-hit.js';d.getElementsByTagName('body')[0].appendChild(el);})(window.document);
```


+ More percentage - Resource cache is hot (Assets is cached properly)
+ Low Percentage - Resource Cache is cold (No Caching)

## Browser Issues

- Yet to figure out. 

