define ['graphael', 'gpie', 'gline', 'gdot', 'gbar'], () ->
  return {
    # values:Array, labels:Array, [title:String]
    piechart: (values, labels, title) ->
      if !@r? then @r = Raphael(10, 50, 640, 480)
      # todo - chart resize
      pie = @r.piechart(320, 240, 100, values, {legend: labels, legendpos: "west"})
      @r.text(320, 100, title).attr({ font: "20px sans-serif" })
      pie.hover(() ->
        @sector.stop()
        @sector.scale(1.1, 1.1, @cx, @cy)
        if @label
          @label[0].stop()
          @label[0].attr({ r: 7.5 })
          @label[1].attr({ "font-weight": 800 })
      () ->
        @sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce")
        if @label
          @label[0].animate({ r: 5 }, 500, "bounce")
          @label[1].attr({ "font-weight": 400 })
      ),
    # values:Array, labels:Array, [title:String]
    linechart: (values, labels, title) ->
      if !@r? then @r = Raphael(10, 50, 640, 480)
      # todo - chart resize
      line = @r.linechart(320, 240, 100, values, {legend: labels, legendpos: "west"})
      @r.text(320, 100, title).attr({ font: "20px sans-serif" })
      line.hover(() ->
        @sector.stop()
        @sector.scale(1.1, 1.1, @cx, @cy)
        if @label
          @label[0].stop()
          @label[0].attr({ r: 7.5 })
          @label[1].attr({ "font-weight": 800 })
      () ->
        @sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce")
        if @label
          @label[0].animate({ r: 5 }, 500, "bounce")
          @label[1].attr({ "font-weight": 400 })
      )
  }
