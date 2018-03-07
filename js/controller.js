angular.module('myApp')
    .controller('PageCtrl', ['$scope',
        function ($scope) {
            // 监听导航栏显示控制
            $scope.barIsShow = true;
            $scope.$on('showBar', function (e, barIsShow) {
                $scope.barIsShow = barIsShow;
            });
        }])
    .controller('CityCtrl', ['$scope', '$http', 'CityService',
        function ($scope, $http, cityService) {
            // 获取城市列表
            $http.get('./data/hot/cities.json').then(function (response) {
                $scope.setCurrentCIty = function (city) {
                    cityService.setCurrentCIty(city);
                    $.closeModal($(".popup"));
                    $.toast("当前城市：" + cityService.getCurentCity());
                }
                $scope.getCurentCity = cityService.getCurentCity;
                $scope.cities = response.data.data.returnValue;
            });
        }])
    .controller('MovieCtrl', ['$scope', '$location', '$http',
        function ($scope, $location, $http) {
            // 广播发送搜索关键字
            $scope.keyword = '';
            $scope.recallSearch = function () {
                $scope.$broadcast('recallSearch', $scope.keyword);
            }

            // 标签切换判断变量
            $scope.tab = /released/g.test($location.path());
        }])
    .controller('ReleasedCtrl', ['$scope', '$http',
        function ($scope, $http) {
            $scope.$emit('showBar', true);
            // 监听搜索关键字
            $scope.$on('recallSearch', function (e, keyword) {
                $scope.keyword = keyword;
            });

            // 启动图片轮播
            $(".swiper-container").swiper({
                initialSlide: 0,
                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                pagination: '.swiper-pagination',
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
            });

            // 获取轮播图片和链接地址
            $http.get('./data/hot/top.json').then(function (response) {
                $scope.topImg = response.data;
            });

            // 获取影片列表数据
            $.showPreloader('加载中...')
            $http.get('./data/hot/list.json').then(function (response) {
                $scope.releasedMovieList = response.data.data.returnValue;
                $.hidePreloader();
            }, function () {
                $.hidePreloader();
                $.toast("加载异常");
            });
        }])
    .controller('UpcomingCtrl', ['$scope', '$http',
        function ($scope, $http) {
            // 监听搜索关键字
            $scope.$on('recallsearch', function (e, keyword) {
                $scope.keyword = keyword;
            });

            // 获取影片列表数据
            $.showPreloader('加载中...')
            $http.get('./data/upcoming/list.json').then(function (response) {
                $scope.releasedMovieList = response.data.data.returnValue;
                $.hidePreloader();
            }, function () {
                $.hidePreloader();
                $.toast("加载异常");
            });
        }])
    .controller('PopoverCtrl', ['$scope', '$http', 'CinemaService',
        function ($scope, $http, cinemaService) {
            $scope.getFilterObj = cinemaService.getFilterObj;
            // 获取影院选项
            $http.get('./data/cinema/cinemaFilter.json').then(function (response) {
                $scope.cinemaFilter = response.data.cinemaFilter;
            });
        }])
    .controller('CinemaCtrl', ['$scope', '$http', '$stateParams', 'CinemaService',
        function ($scope, $http, $stateParams, cinemaService) {
            $scope.mid = $stateParams.mid;
            // 过滤条件
            $scope.f = cinemaService.getFilterObj();
            $scope.keyword = '';
            $scope.search = false;

            // 获取影院列表
            if ($stateParams.mid == undefined) {
                $http.get('./data/cinema/list.json').then(function (response) {
                    $scope.cinemas = response.data.data.returnValue.cinemas;
                });
            } else {
                $http.get('./data/cinema/list' + $stateParams.mid + '.json').then(function (response) {
                    $scope.cinemas = response.data.data.returnValue.cinemas;
                });
            }
        }])
    .controller('MovieDetailCtrl', ['$scope', '$http', '$stateParams', '$timeout',
        function ($scope, $http, $stateParams, $timeout) {
            // 隐藏导航栏
            $scope.$emit('showBar', false);
            // 返回
            $scope.back = function () {
                history.back();
                $scope.$emit('showBar', true);
            }

            // 获取影片信息
            $http.get('./data/movie/' + $stateParams.mid + '.json').then(function (response) {
                $scope.movie = response.data.data.returnValue;
            }, function () {
                history.back();
                $scope.$emit('showBar', true);
                $timeout(function () {
                    $.toast("无数据");
                }, 100);
            });

            // 获取评论信息
            $http.get('./data/movie/comment/' + $stateParams.mid + '.json').then(function (response) {
                $scope.comments = response.data.data.returnValue;
            });

            // 演员图片展示
            $(".swiper-container").swiper({
                initialSlide: 0,
                autoplayDisableOnInteraction: false,
                slidesPerView: 4,
                freeMode: true,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
            });
        }])
    .controller('CinemaDetailCtrl', ['$scope', '$http', '$stateParams', 'PaymentService',
        function ($scope, $http, $stateParams, PaymentService) {
            $scope.mid = $stateParams.mid;
            $scope.cid = $stateParams.cid;
            // 隐藏导航栏
            $scope.$emit('showBar', false);
            // 返回
            $scope.back = function () {
                history.back();
                $scope.$emit('showBar', true);
            }

            $scope.choSeat = function (price) {
                PaymentService.getPaymentData().price = price;
                location.href = "#/seat";
            }

            // 获取影院信息
            $http.get('./data/cinema/' + $stateParams.cid + '.json').then(function (response) {
                $scope.cinema = response.data.data.returnValue;
            }, function () {
                history.back();
                $scope.$emit('showBar', true);
                $.toast("无数据");
            });
        }])
    .controller('LoginCtrl', ['$scope',
        function ($scope) {
            // 隐藏导航栏
            $scope.$emit('showBar', false);
        }])
    .controller('RegCtrl', ['$scope',
        function ($scope) {
            // 隐藏导航栏
            $scope.$emit('showBar', false);
        }])
    .controller('MineCtrl', ['$scope', '$http',
        function ($scope, $http) {
            // 获取用户信息
            $http.get('./data/user/user.json').then(function (response) {
                $scope.user = response.data;
            });
        }])
    .controller('MineListCtrl', ['$scope', '$http', '$stateParams',
        function ($scope, $http, $stateParams) {
            $scope.item = $stateParams.item;
            // 获取所需列表信息
            $http.get('./data/user/' + $stateParams.item + '.json').then(function (response) {
                $scope.li = response.data;
            });

            // 隐藏导航栏
            $scope.$emit('showBar', false);
            // 返回
            $scope.back = function () {
                history.back();
                $scope.$emit('showBar', true);
            }
        }])
    .controller('PaymentCtrl', ['$scope', '$http', 'PaymentService',
        function ($scope, $http, PaymentService) {
            // 隐藏导航栏
            $scope.$emit('showBar', false);
            // 返回
            $scope.back = function () {
                history.back();
                $scope.$emit('showBar', true);
            }

            // 获取订票结算信息
            $scope.totalprice = PaymentService.getPaymentData().totalprice;
            $http.get('./data/payment/payment.json').then(function (response) {
                $scope.payment = response.data.data.returnValue;
            });
        }])
    .controller('SeatCtrl', ['$scope', '$http', 'PaymentService',
        function ($scope, $http, PaymentService) {
            // 隐藏导航栏
            $scope.$emit('showBar', false);
            // 返回
            $scope.back = function () {
                history.back();
                $scope.$emit('showBar', true);
            }

            var price = PaymentService.getPaymentData().price; //票价
            var $cart = $('#selected-seats'), //座位区
                $counter = $('#counter'), //票数
                $total = $('#total'); //总计金额

            var sc = $('#seat-map').seatCharts({
                map: [  //座位图
                    'aaaaaaaaaa',
                    'aaaaaaaaaa',
                    '__________',
                    'aaaaaaaa__',
                    'aaaaaaaaaa',
                    'aaaaaaaaaa',
                    'aaaaaaaaaa',
                    'aaaaaaaaaa',
                    'aaaaaaaaaa',
                    'aa__aa__aa'
                ],
                naming: {
                    top: false,
                    getLabel: function (character, row, column) {
                        return column;
                    }
                },
                legend: { //定义图例
                    node: $('#legend'),
                    items: [
                        ['a', 'available', '可选座'],
                        ['a', 'unavailable', '已售出']
                    ]
                },
                click: function () { //点击事件
                    if (this.status() == 'available') { //可选座
                        $('<li>' + (this.settings.row + 1) + '排' + this.settings.label + '座</li>')
                            .attr('id', 'cart-item-' + this.settings.id)
                            .data('seatId', this.settings.id)
                            .appendTo($cart);

                        $counter.text(sc.find('selected').length + 1);
                        $total.text(recalculateTotal(sc) + price);
                        PaymentService.getPaymentData().totalprice = recalculateTotal(sc) + price;

                        return 'selected';
                    } else if (this.status() == 'selected') { //已选中
                        //更新数量
                        $counter.text(sc.find('selected').length - 1);
                        //更新总计
                        $total.text(recalculateTotal(sc) - price);
                        PaymentService.getPaymentData().totalprice = recalculateTotal(sc) - price;

                        //删除已预订座位
                        $('#cart-item-' + this.settings.id).remove();
                        //可选座
                        return 'available';
                    } else if (this.status() == 'unavailable') { //已售出
                        return 'unavailable';
                    } else {
                        return this.style();
                    }
                }
            });
            //已售出的座位
            sc.get(['1_2', '4_4', '4_5', '6_6', '6_7', '8_5', '8_6', '8_7', '8_8', '10_1', '10_2']).status('unavailable');

            //计算总金额
            function recalculateTotal(sc) {
                var total = 0;
                sc.find('selected').each(function () {
                    total += price;
                });

                return total;
            }
        }])