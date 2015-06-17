window.onload = function() {
    var margin_left = 230;
    var margin_top = 120;

    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var d3Context = d3.select(".video-container").append("svg")
        .attr("width", canvas.width + margin_left)
        .attr("height", canvas.height + margin_top);

    var tracker = new tracking.ObjectTracker('face');
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);

    var lineFunction = d3.svg.line()
        .x(function(d) {return d.x;})
        .y(function(d) {return d.y;})
        .interpolate("linear");

    tracking.track('#video', tracker, { camera: true });

    tracker.on('track', function(event) {
        d3Context.html(" ");

    event.data.forEach(function(rect) {

        var dottedLine =
            [
                {
                    "x": rect.x + margin_left,
                    "y": rect.y + margin_top
                },
                {
                    "x": rect.x + margin_left + rect.width,
                    "y": rect.y + margin_top
                },
                {
                    "x": rect.x + margin_left + rect.width,
                    "y": rect.y + margin_top + rect.height
                },
                {
                    "x": rect.x + margin_left,
                    "y": rect.y + margin_top + rect.height
                },
                {
                    "x": rect.x + margin_left,
                    "y": rect.y + margin_top
                }
            ];

        // Variables for the face selector
        var cornerSize = 5;
        var topBoxMargin = 5;
        var topBoxHeight = 10;
        var tickSize = 4;
        var plusSize = 8;
        var plusMargin = 4;
        var topBoxTextCoor =
            {
                "x": rect.x + margin_left + topBoxMargin + 4,
                "y": rect.y + margin_top + topBoxMargin + 7
            }

        var leftTopCorner =
            [
                {
                    "x": rect.x + margin_left,
                    "y": rect.y + margin_top + cornerSize
                },
                {
                    "x": rect.x + margin_left,
                    "y": rect.y + margin_top
                },
                {
                    "x": rect.x + margin_left + cornerSize,
                    "y": rect.y + margin_top
                }
            ]

        var rightTopCorner =
            [
                {
                    "x": rect.x + margin_left + rect.width - cornerSize,
                    "y": rect.y + margin_top
                },
                {
                    "x": rect.x + margin_left + rect.width,
                    "y": rect.y + margin_top
                },
                {
                    "x": rect.x + margin_left + rect.width,
                    "y": rect.y + margin_top + cornerSize
                }
            ]

        var rightBottomCorner =
            [
                {
                    "x": rect.x + margin_left + rect.width,
                    "y": rect.y + margin_top + rect.height - cornerSize
                },
                {
                    "x": rect.x + margin_left + rect.width,
                    "y": rect.y + margin_top + rect.height
                },
                {
                    "x": rect.x + margin_left + rect.width - cornerSize,
                    "y": rect.y + margin_top + rect.height
                }
            ]

        var leftBottomCorner =
            [
                {
                    "x": rect.x + margin_left + cornerSize,
                    "y": rect.y + margin_top + rect.height
                },
                {
                    "x": rect.x + margin_left,
                    "y": rect.y + margin_top + rect.height
                },
                {
                    "x": rect.x + margin_left,
                    "y": rect.y + margin_top + rect.height - cornerSize
                }
            ]

        var topBox =
            [
                {
                    "x": rect.x + margin_left + topBoxMargin,
                    "y": rect.y + margin_top + topBoxMargin
                },
                {
                    "x": rect.x + margin_left + rect.width - topBoxMargin,
                    "y": rect.y + margin_top + topBoxMargin
                },
                {
                    "x": rect.x + margin_left + rect.width - topBoxMargin,
                    "y": rect.y + margin_top + topBoxMargin + topBoxHeight
                },
                {
                    "x": rect.x + margin_left + topBoxMargin,
                    "y": rect.y + margin_top + topBoxMargin + topBoxHeight
                },
                {
                    "x": rect.x + margin_left + topBoxMargin,
                    "y": rect.y + margin_top + topBoxMargin
                }
            ]

        var topTick =
            [
                {
                    "x": rect.x + margin_left + rect.width/2,
                    "y": rect.y + margin_top
                },
                {
                    "x": rect.x + margin_left + rect.width/2,
                    "y": rect.y + margin_top + tickSize
                }
            ]

        var rightTick =
            [
                {
                    "x": rect.x + margin_left + rect.width,
                    "y": rect.y + margin_top + rect.height/2
                },
                {
                    "x": rect.x + margin_left + rect.width - tickSize,
                    "y": rect.y + margin_top + rect.height/2
                }
            ]

        var bottomTick =
            [
                {
                    "x": rect.x + margin_left + rect.width/2,
                    "y": rect.y + margin_top + rect.height
                },
                {
                    "x": rect.x + margin_left + rect.width/2,
                    "y": rect.y + margin_top + rect.height - tickSize
                }
            ]

        var leftTick =
            [
                {
                    "x": rect.x + margin_left,
                    "y": rect.y + margin_top + rect.height/2
                },
                {
                    "x": rect.x + margin_left + tickSize,
                    "y": rect.y + margin_top + rect.height/2
                }
            ]

        var ellipse =
            {
                "cx": rect.x + margin_left + rect.width/2,
                "cy": rect.y + margin_top + rect.height/2,
                "rx": rect.width*0.75,
                "ry": rect.height*0.75
            }

        var topPlus =
            [
                {
                    "x": rect.x + margin_left + rect.width/2,
                    "y": rect.y + margin_top - rect.height*0.25 - plusMargin
                },
                {
                    "x": rect.x + margin_left + rect.width/2,
                    "y": rect.y + margin_top - rect.height*0.25 - plusMargin - plusSize
                },
                {
                    "x": rect.x + margin_left + rect.width/2,
                    "y": rect.y + margin_top - rect.height*0.25 - plusMargin - plusSize/2
                },
                {
                    "x": rect.x + margin_left + rect.width/2 + plusSize/2,
                    "y": rect.y + margin_top - rect.height*0.25 - plusMargin - plusSize/2
                },
                {
                    "x": rect.x + margin_left + rect.width/2 - plusSize/2,
                    "y": rect.y + margin_top - rect.height*0.25 - plusMargin - plusSize/2
                }
            ]

        var rightPlus =
            [
                {
                    "x": rect.x + margin_left + rect.width*1.25 + plusMargin,
                    "y": rect.y + margin_top + rect.height/2
                },
                {
                    "x": rect.x + margin_left + rect.width*1.25 + plusMargin + plusSize,
                    "y": rect.y + margin_top + rect.height/2
                },
                {
                    "x": rect.x + margin_left + rect.width*1.25 + plusMargin + plusSize/2,
                    "y": rect.y + margin_top + rect.height/2
                },
                {
                    "x": rect.x + margin_left + rect.width*1.25 + plusMargin + plusSize/2,
                    "y": rect.y + margin_top + rect.height/2 + plusSize/2
                },
                {
                    "x": rect.x + margin_left + rect.width*1.25 + plusMargin + plusSize/2,
                    "y": rect.y + margin_top + rect.height/2 - plusSize/2
                }
            ]

        var bottomPlus =
            [
                {
                    "x": rect.x + margin_left + rect.width/2,
                    "y": rect.y + margin_top + rect.height*1.25 + plusMargin
                },
                {
                    "x": rect.x + margin_left + rect.width/2,
                    "y": rect.y + margin_top + rect.height*1.25 + plusMargin + plusSize
                },
                {
                    "x": rect.x + margin_left + rect.width/2,
                    "y": rect.y + margin_top + rect.height*1.25 + plusMargin + plusSize/2
                },
                {
                    "x": rect.x + margin_left + rect.width/2 + plusSize/2,
                    "y": rect.y + margin_top + rect.height*1.25 + plusMargin + plusSize/2
                },
                {
                    "x": rect.x + margin_left + rect.width/2 - plusSize/2,
                    "y": rect.y + margin_top + rect.height*1.25 + plusMargin + plusSize/2
                }
            ]

        var leftPlus =
            [
                {
                    "x": rect.x + margin_left - rect.width*0.25 - plusMargin,
                    "y": rect.y + margin_top + rect.height/2
                },
                {
                    "x": rect.x + margin_left - rect.width*0.25 - plusMargin - plusSize,
                    "y": rect.y + margin_top + rect.height/2
                },
                {
                    "x": rect.x + margin_left - rect.width*0.25 - plusMargin - plusSize/2,
                    "y": rect.y + margin_top + rect.height/2
                },
                {
                    "x": rect.x + margin_left - rect.width*0.25 - plusMargin - plusSize/2,
                    "y": rect.y + margin_top + rect.height/2 + plusSize/2
                },
                {
                    "x": rect.x + margin_left - rect.width*0.25 - plusMargin - plusSize/2,
                    "y": rect.y + margin_top + rect.height/2 - plusSize/2
                }
            ]

        d3Context
            .append("path")
            .attr("d", lineFunction(dottedLine))
            .attr("stroke-width", 1)
            .attr("stroke", "white")
            .attr("stroke-dasharray", "3,3")
            .attr("fill", "none");
        d3Context
            .append("path")
            .attr("d", lineFunction(leftTopCorner))
            .attr("stroke-width", 2.5)
            .attr("stroke", "white")
            .attr("fill", "none");
        d3Context
            .append("path")
            .attr("d", lineFunction(rightTopCorner))
            .attr("stroke-width", 2.5)
            .attr("stroke", "white")
            .attr("fill", "none");
        d3Context
            .append("path")
            .attr("d", lineFunction(rightBottomCorner))
            .attr("stroke-width", 2.5)
            .attr("stroke", "white")
            .attr("fill", "none");
        d3Context
            .append("path")
            .attr("d", lineFunction(leftBottomCorner))
            .attr("stroke-width", 2.5)
            .attr("stroke", "white")
            .attr("fill", "none");
        d3Context
            .append("path")
            .attr("d", lineFunction(topBox))
            .attr("stroke-width", 1)
            .attr("stroke", "white")
            .attr("fill", "black")
            .style("opacity", 0.7);
        d3Context
            .append("text")
            .attr("dx", topBoxTextCoor.x)
            .attr("dy", topBoxTextCoor.y)
            .text("ID   608 / 2729_10")
            .attr("fill", "white")
            .style("font-size", "6px");
        d3Context
            .append("path")
            .attr("d", lineFunction(topTick))
            .attr("stroke-width", 1)
            .attr("stroke", "white")
            .attr("fill", "none");
        d3Context
            .append("path")
            .attr("d", lineFunction(rightTick))
            .attr("stroke-width", 1)
            .attr("stroke", "white")
            .attr("fill", "none");
        d3Context
            .append("path")
            .attr("d", lineFunction(bottomTick))
            .attr("stroke-width", 1)
            .attr("stroke", "white")
            .attr("fill", "none");
        d3Context
            .append("path")
            .attr("d", lineFunction(leftTick))
            .attr("stroke-width", 1)
            .attr("stroke", "white")
            .attr("fill", "none");
        d3Context
            .append("ellipse")
            .attr("cx", ellipse.cx)
            .attr("cy", ellipse.cy)
            .attr("rx", ellipse.rx)
            .attr("ry", ellipse.ry)
            .attr("stroke-width", 0.5)
            .attr("stroke", "white")
            .attr("fill", "none");
        d3Context
            .append("path")
            .attr("d", lineFunction(topPlus))
            .attr("stroke-width", 0.5)
            .attr("stroke", "white")
            .attr("fill", "none");
        d3Context
            .append("path")
            .attr("d", lineFunction(rightPlus))
            .attr("stroke-width", 0.5)
            .attr("stroke", "white")
            .attr("fill", "none");
        d3Context
            .append("path")
            .attr("d", lineFunction(bottomPlus))
            .attr("stroke-width", 0.5)
            .attr("stroke", "white")
            .attr("fill", "none");
        d3Context
            .append("path")
            .attr("d", lineFunction(leftPlus))
            .attr("stroke-width", 0.5)
            .attr("stroke", "white")
            .attr("fill", "none");
    });
  });
};
