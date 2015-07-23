App.controller('friendController', function ($scope, $q, twitterService) {

    $scope.friends = [];

    $scope.refreshfriendlist = function (maxId) {
        if (twitterService.isConnected() == false)
            return;

        twitterService.getFriends(maxId).then(function (data) {
            console.log("friends :", data);
            $scope.friends = $scope.friends.concat(data.users);
        }, function () {
            $scope.rateLimitError = true;
        });
    }

    $scope.refreshfriendlist();
}
);
