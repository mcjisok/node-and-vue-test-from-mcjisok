module.exports = function(grunt){

	grunt.initConfig({
		watch:{
			jade:{
				files:['views/**'],
				options:{
					livereload:true
				}
			},
			js:{
				file:['public/js/**','models/**/*.js','schemas/**/*.js'],
				//tasks:[jshint],
				options:{
					livereload:true
				}
			}
		},

		nodemon:{
			dev:{
				options:{
					file:'app.js',
					args:[],
					ignoredFiles:['README.md','node_modules/**','.DS_Store'],
					watchedExtensions:['js'],
					watchedFolders:['app','config'],
					debug:true,
					delayTime:1,
					env:{
						PORT:3000
					},
					cwd:__dirname
				}
			}
		},
		concurrent:{
			tasks:['nodemon','watch'],
			options:{
				logConcurrentOutput:true
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch')//只要监听到有文件新增或删除，就自动执行设置好的任务
	grunt.loadNpmTasks('grunt-nodemon')	     //监听入口文件app.js
	grunt.loadNpmTasks('grunt-concurrent')

	grunt.option('force',true)
	grunt.registerTask('default',['concurrent'])
}