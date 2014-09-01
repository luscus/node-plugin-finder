var plugin = require('../lib/plugin-finder');


console.log(plugin.match(/^root.*/));

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

console.log(plugin.load(/^root.*/));

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

console.log(plugin.loadAll(/^root.*/));

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

console.log(plugin.load(/^grunt.*/));

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

console.log(plugin.match('dadadadT'));
