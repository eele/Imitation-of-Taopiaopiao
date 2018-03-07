angular.module('myApp')
    .filter('areaFilter', [function () {
        return function (cinemas, area) {
            var output = [];
            if (area == '%%') {
                output = cinemas;
            } else {
                angular.forEach(cinemas, function (item) {
                    if (item.address.indexOf(area) >= 0) {
                        output.push(item);
                    }
                })
            }
            return output;
        }
    }])
    .filter('supportFilter', [function () {
        return function (cinemas, support) {
            var output = [];
            if (support == '%%') {
                output = cinemas;
            } else {
                angular.forEach(cinemas, function (item) {
                    for (var i in item.displaySupports) {
                        if (item.displaySupports[i] == support) {
                            output.push(item);
                            break;
                        }
                    }
                })
            }

            return output;
        }
    }])
    .filter('searchMovieFilter', [function () {
        return function (movies, keyword) {
            var output = [];
            if (keyword == '') {
                output = movies;
            } else {
                angular.forEach(movies, function (item) {
                    if (item.showName.indexOf(keyword) >= 0 ||
                     item.director.indexOf(keyword) >= 0 ||
                     item.leadingRole.indexOf(keyword) >= 0 ||
                     item.type.indexOf(keyword) >= 0) {
                        output.push(item);
                    }
                })
            }
            return output;
        }
    }])
    .filter('searchCinemaFilter', [function () {
        return function (cinemas, keyword) {
            var output = [];
            if (keyword == '') {
                output = cinemas;
            } else {
                angular.forEach(cinemas, function (item) {
                    if (item.cinemaName.indexOf(keyword) >= 0 ||
                     item.address.indexOf(keyword) >= 0) {
                        output.push(item);
                    }
                })
            }
            return output;
        }
    }])