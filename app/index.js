'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var WdjAppGenerator = module.exports = function WdjAppGenerator (args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({
            skipInstall : false
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WdjAppGenerator, yeoman.generators.Base);

WdjAppGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    console.log(this.yeoman);

    var prompts = [{
        type : 'list',
        name : 'projectType',
        message : 'Which kind of project are u scaffolding?',
        choices : [{
            name : 'Typical Front-end project that running in browsers. ',
            value : 'browser'
        }, {
            name : 'Node.js project. ',
            value : 'node'
        }]
    }];

    this.prompt(prompts, function (props) {
        this.projectType = props.projectType;

        cb();
    }.bind(this));
};

WdjAppGenerator.prototype.app = function app() {
    if (this.projectType !== 'browser') {
        this.copy('_package_node.json', 'package.json');
        this.copy('_Gruntfile_node.js', 'Gruntfile.js');
    } else {
        this.mkdir('app');

        // Make bower components dir
        this.mkdir('app/components');

        // Make images dir
        this.mkdir('app/images');

        // Make JavaScript dir
        this.mkdir('app/javascripts');

        // Make compass dir
        this.mkdir('app/compass');
        this.mkdir('app/compass/sass');
        this.mkdir('app/compass/images');

        this.mkdir('test/specs');

        this.copy('bowerrc', '.bowerrc');
        this.copy('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');
        this.copy('_Gruntfile.js', 'Gruntfile.js');
        this.copy('_README.md', 'README.md');

        this.copy('_index.html', 'app/index.html');
        this.copy('_main.scss', 'app/compass/sass/main.scss');
        this.copy('_main.js', 'app/javascripts/main.js');

        this.copy('_karma.conf.js', 'test/karma.conf.js');
        this.copy('_test-main.js', 'test/test-main.js');
    }
};

WdjAppGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('_README.md', 'README.md');
    this.copy('gitignore', '.gitignore');
    this.copy('_travis.yml', '.travis.yml');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};
