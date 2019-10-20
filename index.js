'use strict';

(function() { 

    let data = ""
    let svg = ""

    const measurements = {
        margin: 50,
        width: 500,
        height: 500
    }


    window.onload = function() {
        // Append the svg object to the page
        svg = d3.select("canvas").append("svg")
            .attr("width", 700)
            .attr("height", 700);
        
        d3.csv("/data/Admission_Predict.csv", function (data){
            makeHistogram(data)
        })
    }

    function makeHistogram(data) {
        let toeflScores = data.map((row) => parseInt(row["TOEFL Score"]));

        console.log("hi"); 
        console.log(toeflScores); 

        // Scale X-axis
        let maxtoefl = d3.max(data, function(d){
            return +d["TOEFL Score"];
        });

        let mintoefl = d3.min(data, function(d){
            return +d["TOEFL Score"];
        });

        console.log(maxtoefl); 
        console.log(mintoefl); 

        var x = d3.scaleLinear()
                .domain([mintoefl, maxtoefl]) 
                .range([50, 500]);
            svg.append("g")
                .attr("transform", "translate(0," + 500 + ")")
                .call(d3.axisBottom(x));
        
        console.log(x);
    

        var histogram = d3.histogram()
                        .value(function(toeflScores) { return toeflScores; })  
                        .domain(x.domain()) 
                        .thresholds(x.ticks(10)); 
        console.log(histogram); 
        
        // And apply this function to data to get the bins
        var bins = histogram(toeflScores);


        // Scale Y-axis
        var y = d3.scaleLinear()
                .domain([d3.max(bins, function(d) { return d.length; }), 0]) 
                .range([10, 450]);
            svg.append("g")
                .call(d3.axisLeft(y));

        drawAxes(x,y);

        svg.selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0); })
            .attr("height", function(d) { return measurements.height - y(d.length); })
            .style("fill", "#69b3a2")
        }
    
    function drawAxes(scaleX, scaleY) {
        let xAxis = d3.axisBottom()
            .scale(scaleX)
        
        let yAxis = d3.axisLeft()
            .scale(scaleY)

        svg.append('g')
            .attr('transform', 'translate(0,450)')
            .call(xAxis)
        
        svg.append('g')
            .attr('transform', 'translate(50,0)')
            .call(yAxis)
        
        svg.append("text")             
            .attr("transform",
                "translate(" + (500/2) + " ," + (500 + 50/100) + ")")
            .style("text-anchor", "middle")
            .text("TOEFL Score(bin)");
        
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x",0 - (250))
            .attr("dy", "0.7em")
            .style("text-anchor", "middle")
            .text("Count of TOEFL Score")
        }
})()
