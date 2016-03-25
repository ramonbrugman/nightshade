/**
 * Analytics Scripts
 * @module analytics_scripts.js
 * @overview Loads tracking service snippets: Optimizely, Segment, and Convertro
 */

 /** 
 * Optimizely snippet. Loaded synchronously. Not deferred. 
 * @todo: Implement env check, load conditionally, uncomment
 */
// Production Snippet <script src="//cdn.optimizely.com/js/1509982184.js"></script>
// Staging Snippet <script src="//cdn.optimizely.com/js/3687732782.js"></script>

/** 
 * Segment.io snippet. Loaded asynchronously. Not deferred. 
 * @todo: Implement env check. Swap to key "470f745508" for production.
 */
!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";
analytics.load("qtm71bghig"); 
analytics.page()
}}();

/** 
 * Convertro snippet. Loaded asynchronously. Not deferred. 
 */
(function(c){var e=document.createElement("script");
e.type='text/javascript';e.async=true;
e.src='//d1ivexoxmp59q7.cloudfront.net/'+c+'/live.js';
var n=document.getElementsByTagName('script')[0];
n.parentNode.insertBefore(e,n);})('casper');