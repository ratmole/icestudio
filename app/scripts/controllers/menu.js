'use strict';

angular.module('icestudio')
  .controller('MenuCtrl', function ($scope, $rootScope, nodeFs, blocks, boards) {

    // File

    $scope.newProject = function() {
      alertify.prompt('Enter the project\'s title', 'untitled',
        function(evt, name) {
          if (name) {
            $rootScope.$emit('newProject', name);
          }
      });
    }

    $scope.loadProject = function() {
      alertify.confirm('The current project will be removed. ' +
                       'Do you want to continue?',
        function() {
          setTimeout(function() {
            var ctrl = angular.element('#input-load');
            ctrl.on('change', function(event) {
              var file = event.target.files[0];
              event.target.files.clear();
              if (file) {
                $rootScope.$emit('loadProject', file.path);
              }
            });
            ctrl.click();
          }, 0);
      });
    }

    $scope.saveProject = function() {
      setTimeout(function() {
        var ctrl = angular.element('#input-save');
        ctrl.on('change', function(event) {
          var file = event.target.files[0];
          if (file) {
            event.target.files.clear();
            var filepath = file.path;
            if (! filepath.endsWith('.json')) {
                filepath += '.json';
            }
            $rootScope.$emit('saveProject', filepath);
          }
        });
        ctrl.click();
      }, 0);
    }

    $scope.loadCustomBlock = function(name) {
      alertify.confirm('The current project will be removed. ' +
                       'Do you want to continue?',
        function() {
          $rootScope.$emit('loadCustomBlock', name);
      });
    }

    $scope.removeCustomBlock = function(name) {
      alertify.confirm('Do you want to remove the custom block <b>' + name + '</b>?',
        function() {
          $rootScope.$emit('removeCustomBlock', name);
      });
    }

    $scope.saveCustomBlock = function() {
      alertify.prompt('Do you want to export your custom block?',
        $rootScope.project.name,
        function(evt, name) {
          if (name) {
            $rootScope.$emit('saveCustomBlock', name);
          }
      });
    }

    // Edit

    $scope.build = function() {
      console.log('build');
    }

    $scope.upload = function() {
      console.log('upload');
    }

    $scope.clearGraph = function() {
      alertify.confirm('Do you want to clear the graph?',
        function() {
          $rootScope.$emit('clearGraph');
      });
    }

    $scope.removeSelectedBlock = function() {
      $rootScope.$emit('removeSelectedBlock');
    }

    // View

    $scope.reloadBlocks = function() {
      blocks.loadBlocks();
    }

    // Boards

    $scope.currentBoards = boards.getBoards();
    $rootScope.selectedBoard = $scope.currentBoards[0];

    $scope.selectBoard = function(board) {
      if ($rootScope.selectedBoard != board) {
        alertify.confirm('The current FPGA I/O configuration will be lost. ' +
                         'Do you want to change to <b>' + board.label + '</b> board?',
          function() {
            $rootScope.selectedBoard = board;
            $rootScope.$emit('boardChanged', board);
            alertify.success('Board ' + board.label + ' selected');
        });
      }
    }

    // Blocks menu

    $scope.addBasicBlock = function(type) {
      $rootScope.$emit('addBasicBlock', { type: type });
    }

    $scope.addBlock = function(type, block) {
      $rootScope.$emit('addBlock', { type: type, block: block });
    }

  });
