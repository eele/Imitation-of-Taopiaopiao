angular.module('myApp', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("movie", {
                    url: '/movie',
                    templateUrl: 'view/movie/movie.htm',
                    controller:'MovieCtrl'
                })
                .state("movie.released", {
                    url: '/released',
                    views: {
                        'movieListView@movie': {
                            templateUrl: 'view/movie/released/released.htm',
                            controller:'ReleasedCtrl'
                        }
                    }
                })
                .state("movie.upcoming", {
                    url: '/upcoming',
                    views: {
                        'movieListView@movie': {
                            templateUrl: 'view/movie/upcoming/upcoming.htm',
                            controller:'UpcomingCtrl'
                        }
                    }
                })
                .state("movieDetail", {
                    url: '/movieDetail/:mid',
                    templateUrl: 'view/movie/movieDetail/movieDetail.htm',
                    controller:'MovieDetailCtrl'
                })
                .state("cinema", {
                    url: '/cinema',
                    templateUrl: 'view/cinema/cinema.htm',
                    controller:'CinemaCtrl'
                })
                .state("cinemaCho", {
                    url: '/cinema/:mid',
                    templateUrl: 'view/cinema/cinema.htm',
                    controller:'CinemaCtrl'
                })
                .state("cinemaDetail", {
                    url: '/cinemaDetail/:cid',
                    templateUrl: 'view/cinema/cinemaDetail/cinemaDetail.htm',
                    controller:'CinemaDetailCtrl'
                })
                .state("cinemaDetailWhenBooking", {
                    url: '/cinemaDetail/:cid/:mid',
                    templateUrl: 'view/cinema/cinemaDetail/cinemaDetail.htm',
                    controller:'CinemaDetailCtrl'
                })
                .state("mine", {
                    url: '/mine',
                    templateUrl: 'view/mine/mine.htm',
                    controller:'MineCtrl'
                })
                .state("mineList", {
                    url: '/mine/:item',
                    templateUrl: 'view/mine/list.htm',
                    controller:'MineListCtrl'
                })
                .state("payment", {
                    url: '/payment',
                    templateUrl: 'view/payment/payment.htm',
                    controller:'PaymentCtrl'
                })
                .state("seat", {
                    url: '/seat',
                    templateUrl: 'view/seat/seat.htm',
                    controller:'SeatCtrl'
                })
                .state("login", {
                    url: '/login',
                    templateUrl: 'view/mine/login.htm',
                    controller:'LoginCtrl'
                })
                .state("reg", {
                    url: '/reg',
                    templateUrl: 'view/mine/reg.htm',
                    controller:'RegCtrl'
                })
            $urlRouterProvider.otherwise('/movie/released');
        }])