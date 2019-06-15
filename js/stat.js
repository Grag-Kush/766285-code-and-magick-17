window.renderStatistics = function (ctx, names, times) {
  var cloud = {
    x: 100,
    y: 10,
    width: 420,
    height: 270,
    backgroundColor: '#fff',
    shadowStyle: 'rgba(0, 0, 0, 0.7)',
    congratsText: {
      font: '16px PT Mono',
      color: '#000',
      baseLine: 'top',
      text: 'УРА вы победили!\nСписок результатов:',
      x: 120,
      y: 30,
      yOffset: 20
    },
    histogram: {
      height: 150,
      columnWidth: 40,
      gutter: 50,
      initialX: 155,
      initialY: 250,
      color: '#000',
      yourColumnColor: 'rgba(255, 0, 0, 1)',
      getOtherColumnsHSLColor: function () {

        var hue = 240;
        var saturation = Math.floor(Math.random() * 100);
        var lightness = 50;

        return 'hsl(' + hue + ',' + saturation + '%,' + lightness + '%)';
      },
      max: -1,
      maxIndex: -1,
      step: 0
    }
  };

  ctx.fillStyle = cloud.shadowStyle;
  ctx.fillRect(cloud.x + 10, cloud.y + 10, cloud.width, cloud.height);
  ctx.fillStyle = cloud.backgroundColor;
  ctx.fillRect(cloud.x, cloud.y, cloud.width, cloud.height);
  ctx.font = cloud.congratsText.font;
  ctx.fillStyle = cloud.congratsText.color;
  ctx.textBaseline = cloud.congratsText.baseLine;

  var congratsTextLines = cloud.congratsText.text.split('\n');
  var congratsTextLineYposition = cloud.congratsText.y;

  congratsTextLines.forEach(function (value, index) {
    if (index !== 0) {
      congratsTextLineYposition += cloud.congratsText.yOffset;
    }

    ctx.fillText(value, cloud.congratsText.x, congratsTextLineYposition);
  });

  times.forEach(function (value, index) {
    if (value > cloud.histogram.max) {
      cloud.histogram.max = value;
      cloud.histogram.maxIndex = index;
    }
  });

  cloud.histogram.step = cloud.histogram.height / (cloud.histogram.max - 0);

  var histogramColumnXposition = cloud.histogram.initialX;

  times.forEach(function (value, index) {
    if (index !== 0) {
      histogramColumnXposition += cloud.histogram.columnWidth + cloud.histogram.gutter;
    }
    if (names[index] === 'Вы') {
      ctx.fillStyle = cloud.histogram.yourColumnColor;
    } else {
      ctx.fillStyle = cloud.histogram.getOtherColumnsHSLColor();
    }

    var columnHeight = value * cloud.histogram.step;

    ctx.fillRect(histogramColumnXposition, cloud.histogram.initialY, cloud.histogram.columnWidth, -columnHeight);

    var namesLabelY = cloud.histogram.initialY + 5;
    var timesLabelY = cloud.histogram.initialY - (columnHeight + 25);

    ctx.fillStyle = cloud.histogram.color;
    ctx.fillText(Math.round(value), histogramColumnXposition, timesLabelY);
    ctx.fillText(names[index], histogramColumnXposition, namesLabelY);
  });
};
