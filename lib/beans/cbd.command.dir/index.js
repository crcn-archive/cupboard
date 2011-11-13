/**
 * returns the directoy of the target project. Function is similar to `pwd`
 */

var vine = require('vine'),
exec = require('child_process').exec;

exports.plugin = function(router) {
	
	router.on({
		
		/**
		 */
		
		'pull command/projects -> command/execute/dir': function(request) {
			
			var response = vine.api(),
			numRunning = request.projects.length;
			
			request.projects.forEach(function(project)
			{
				exec('readlink ' + project.path(), function(err, stdout)
				{	
					response.success(stdout.replace(/[\r\n]+/g,''));
					
					if(!(--numRunning)) response.end(request);
				});
			});
		},
		
		/**
		 */
		
		'pull -multi help/item': function() {
			
			return {
				commands: {
					command: 'dir <proj>',
					desc:'Returns the project path.' 
				},
				examples: {
					command: 'cd `cbd dir <proj>`',
					desc: 'Changes the current working directory to given project.'
				}
			};
		}
	})
}