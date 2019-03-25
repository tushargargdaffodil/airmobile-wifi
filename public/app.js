import moment from 'moment';
import chrome from 'ui/chrome';
import { uiModules } from 'ui/modules';
import uiRoutes from 'ui/routes';
import 'ui/autoload/modules';
import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';
import $ from 'jquery';

uiRoutes.enable();
uiRoutes
.when('/', {
  template,
  resolve: {
    currentTime($http) {
      return $http.get('../api/airmobile_wifi/example').then(function (resp) {
        return resp.data.time;
      });
    }
  }
});

uiModules
.get('app/airmobile_wifi', [])
.controller('airmobileWifiHelloWorld', function ($scope, $route, $interval) {
  $scope.title = 'Airmobile Wifi';
  $scope.description = 'Basic Plugin for Kibana';

  const currentTime = moment($route.current.locals.currentTime);
  $scope.currentTime = currentTime.format('HH:mm:ss');
  const unsubscribe = $interval(function () {
    $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
  }, 1000);
  $scope.$watch('$destroy', unsubscribe);
});

$(document).on('ready', function (event) {
   document.body.innerHTML = document.body.innerHTML.replace(/Kibana/g, 'AirMobile');
});
