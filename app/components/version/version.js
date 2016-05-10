'use strict';

angular.module('iris.version', [
  'iris.version.interpolate-filter',
  'iris.version.version-directive'
])

.value('version', '0.1');
