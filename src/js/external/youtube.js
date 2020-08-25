// get the youtube iframe js
$.getScript('https://www.youtube.com/iframe_api');

var YoutubePlayer = function(options) {
  this.$container = options.$container;
  this.video_id = options.video_id;
  this.dimensions = options.dimensions;
  this.preOverlayState = 0;
  this.initialize();
};

YoutubePlayer.prototype.onYouTubeIframeAPIReady = function() {
  this.player = new YT.Player(this.$container[0], {
    videoId: this.video_id,
    width: (this.dimensions && this.dimensions.width) || 1680,
    height: (this.dimensions && this.dimensions.height) || 760,
    playerVars: {
      autohide: 1,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      wmode: 'opaque'
    }
  });
};

YoutubePlayer.prototype.initialize = function() {
  if (!$('body').hasClass('screenshot')) {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      console.log('ERROR LOADING YOUTUBE API');
    } else {
      this.onYouTubeIframeAPIReady();
    }
  }

  Bridge.Event.on('overlayopened', () => {
    if (!$('body').hasClass('client')) {
      this.preOverlayState = this.player.getPlayerState();
      this.pause();
    }
  });

  Bridge.Event.on('overlayclosed', () => {
    if (!$('body').hasClass('client') && this.preOverlayState === 1) {
      this.play();
      this.preOverlayState = 0;
    }
  });
};

YoutubePlayer.prototype.pause = function() {
  if (this.player) {
    this.player.pauseVideo();
  }
};

YoutubePlayer.prototype.play = function() {
  if (this.player) {
    this.player.playVideo();
  }
};
