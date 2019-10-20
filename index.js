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

// function plotData(scaleX, scaleY) {
//     let histogram = 
// }


    // append the bar rectangles to the svg element
//    
//attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })

/* 
"use strict";

(function() {
    let data = ""; 
    let svg = "";

    window.onload = function() {
        svg = d3.select('canvas').append("svg")
            .attr('width', 800)
            .attr('height', 800);
        
        // Load the data 
        d3.csv("/data/Admission_Predict.csv", function (csvData){
            makeHistogram(csvData)
        })
    }
    /* 

    function makeHistogram(csvData) {
        let data = csvData; 
        let toeflScores = data.map((row) => parseInt(row["TOEFL Score"]));

        
        let maxtoefl = d3.max(data, function(x){
                return +x["TOEFL Score"];
        });
        
        let mintoefl = d3.min(data, function(x){
                return +x["TOEFL Score"];
        });
        
        let x = d3.scaleLinear()
            .domain([mintoefl, maxtoefl])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
            .range([50, 500]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // set the parameters for the histogram
        let histogram = d3.histogram()
            .value(function(toeflScores) { return+ toeflScores; })   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(x.ticks(10)); // then the numbers of bins

     // And apply this function to data to get the bins
    var bins = histogram(data);

  // Y axis: scale and draw:
  var y = d3.scaleLinear()
      .range([50, 450]);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
  svg.append("g")
      .call(d3.axisLeft(y));

  drawAxes(x,y)
  // append the bar rectangles to the svg element
  svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")
    }

    function findMinMax(greScores, admitChances) {
        return {
            greMin: d3.min(greScores),
            greMax: d3.max(greScores),
            admitMin: d3.min(admitChances),
            admitMax: d3.max(admitChances)
        }
    }

    function drawAxes(scaleX, scaleY) {
        // these are not HTML elements. They're functions!
        let xAxis = d3.axisBottom()
            .scale(scaleX)

        let yAxis = d3.axisLeft()
            .scale(scaleY)
            
        svgContainer.append('g')
            .attr('transform', 'translate(0,450)')
            .call(xAxis)

        svgContainer.append('g')
            .attr('transform', 'translate(50, 0)')
            .call(yAxis)
        
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - 50/100)
            .attr("x",0 - (500/ 2))
            .attr("dy", "0.7em")
            .style("text-anchor", "middle")
            .text("Count of TOEFL Score")
        
        svg.append("text")             
            .attr("transform",
                   "translate(" + (500/2) + " ," + (500 + 50/100) + ")")
            .style("text-anchor", "middle")
            .text("TOEFL Score(bin)");
    }
    */ 

    /* 
   function makeHistogram(data) { 
        
    //let toeflScores = Object.keys(data).map(row => {parseInt(row["TOEFL Score"])});
    let toeflScores = data.map((row) => parseInt(row["TOEFL Score"]));
    console.log(toeflScores);
    // Scale X-axis
    var maxtoefl = d3.max(data, function(d){
        return +d["TOEFL Score"];
    });

    var mintoefl = d3.min(data, function(d){
        return +d["TOEFL Score"];
    });

    var x = d3.scaleLinear()
              .domain([mintoefl-2, maxtoefl]) 
              .range([50, 500]);

   

    var histogram = d3.histogram()
                      .value(function(toeflScores) { return+ toeflScores; })   // I need to give the vector of value
                      .domain(x.domain())  // then the domain of the graphic
                      .thresholds(x.ticks(10)); // then the numbers of bins
      
    // And apply this function to data to get the bins
    var bins = histogram(toeflScores);


    // Scale Y-axis
    var y = d3.scaleLinear()
              .domain([d3.max(bins, function(d) { return d.length; }), 0]) 
              .range([50, 500 - 50]);

    drawAxes(x,y);
    svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")
}
   
function drawAxes(scaleX, scaleY) {
    console.log('in');
    let xAxis = d3.axisBottom()
        .scale(scaleX)
    
    let yAxis = d3.axisLeft()
        .scale(scaleY)

    svg.append('g')
        .attr('transform', 'translate(0,450)')
        .call(xAxis)
    
    svg.append("text")             
        .attr("transform",
               "translate(" + (500/2) + " ," + (500+ 50/100) + ")")
        .style("text-anchor", "middle")
        .text("TOEFL Score(bin)");

    svg.append('g')
        .attr('transform', 'translate(50,0)')
        .call(yAxis)
    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 50/100)
        .attr("x",0 - (500/ 2))
        .attr("dy", "0.7em")
        .style("text-anchor", "middle")
        .text("Count of TOEFL Score")
}
*/

