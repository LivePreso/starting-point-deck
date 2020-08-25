let globalDeckReady = e => {
  Bridge.Event.on('slide:closed', function(slideId) {
    if (slideId) {
      clearCharts(slideId);
      clearTimeouts(slideId);
    }
  });
};

Bridge.Event.on('deckready', globalDeckReady, 'deck');
