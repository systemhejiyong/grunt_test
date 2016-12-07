// Contrib-jshint——javascript语法错误检查；
// Contrib-watch——实时监控文件变化、调用相应的任务重新执行；
// Contrib-clean——清空文件、文件夹；
// Contrib-uglify——压缩javascript代码
// Contrib-copy——复制文件、文件夹
// Contrib-concat——合并多个文件的代码到一个文件中
// karma——前端自动化测试工具

//包装函数
module.exports = function(grunt){

  // 任务配置，所有插件的配置信息
  grunt.initConfig({

    //获取 package.json 的信息
    pkg: grunt.file.readJSON('package.json'),

    //uglify插件的配置信息
    uglify:{
      options:{
        stripBanners:true,
        banner:'/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-MM-dd") %> */\n'
      },
      build:{
        src: 'src/test.js',
        dest: 'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
      }
    },

    jshint:{
      build: [ 'Gruntfile.js','src/*.js' ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      build: {
        files: ['src/*.js'],
        tasks: ['jshint','uglify'],
        options: { spawn: false },
      }
    }

  });

  // 告诉grunt我们使用那些插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //告诉grunt当我们的终端中输入grunt时需要做些什么（注意先后顺序）
  grunt.registerTask('default',[ 'uglify','jshint','watch' ]);
};
