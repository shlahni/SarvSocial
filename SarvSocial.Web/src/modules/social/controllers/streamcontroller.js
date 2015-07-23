App.controller('streamController', function ($scope, $q, twitterService) {

    $scope.tweets = [];
    $scope.tweet = "";

    function initializeStream()
    {
        if(twitterService.isConnected() == false)
            twitterService.initialize();
       
    }

    initializeStream();
    
   
    $scope.refreshTimeline = function (maxId) {
        if (twitterService.isConnected() == false)
            return;

        twitterService.getLatestTweets(maxId).then(function (data) {
            console.log(data);
            $scope.tweets = $scope.tweets.concat(data);
        }, function () {
            $scope.rateLimitError = true;
        });
    }
  
   

    $scope.connectButton = function () {
        console.log("Connect pressed");
        twitterService.connectTwitter().then(function () {
            if (twitterService.isReady()) {

                ///todo shahin : move this code to a general directive
                //if the authorization is successful, hide the connect button and display the tweets
                $('#connectButton').fadeOut(function () {
                    $('#getTimelineButton, #signOut').fadeIn();
                    $scope.refreshTimeline();
                   // $scope.connectedTwitter = true;
                });
            } else {
                console.log("twitter is not connected");
            }
        });
    }

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function () {

        twitterService.clearCache();
        $scope.tweets.length = 0;
        $('#getTimelineButton, #signOut').fadeOut(function () {
            $('#connectButton').fadeIn();
            $scope.$apply(function () {
                $scope.connectedTwitter = false
            })
        });
    }

    $scope.isConnected = function () {
        var isconnected = twitterService.isConnected();
        console.log("checkk connection",isconnected);
        return isconnected
    }

    $scope.posttweet = function ()
    {
        console.log("tweet :" +$scope.tweet);

        if ($scope.tweet.length > 0)
        {
            console.log("send tweet");
        }
        
        $scope.tweet = "";
    }


    $scope.discardtweet = function () {
        $scope.tweet = "";
        console.log("discard tweet");
    }


    $scope.refreshTimeline();

});