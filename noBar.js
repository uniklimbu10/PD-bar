//data should be written to this file, displaying this data for GUI
var dataFile = "photodiodeValues.csv";
//milliseconds - update interval
var interval = 50; //Hz display
//assigning html canvas to a JS variable
var ctx = document.getElementById('myChart').getContext('2d');
//milliseconds - update interval

//photodiode numbers: 16,32,48,64
var setPhotodiodes = 80; //default 
var photodiodeLabels;
var initialData;
var minY = 0;
let maxY = 600; //default - typical max charge

//labels for the photodiodes
photodiodeLabels_16 = ['1','2','3','4','5','6','7','8','9','10','11','12',
'13','14','15','16'];

photodiodeLabels_32 = ['1','2','3','4','5','6','7','8','9','10','11','12',
'13','14','15','16','17','18','19','20','21','22','23','24','25','26',
'27','28','29','30','31','32'];

photodiodeLabels_48 = ['1','2','3','4','5','6','7','8','9','10','11','12',
'13','14','15','16','17','18','19','20','21','22','23','24','25','26',
'27','28','29','30','31','32','33','34','35','36','37','38','39','40',
'41','42','43','44','45','46','47','48'];

photodiodeLabels_64 = ['1','2','3','4','5','6','7','8','9','10','11','12',
'13','14','15','16','17','18','19','20','21','22','23','24','25','26',
'27','28','29','30','31','32','33','34','35','36','37','38','39','40',
'41','42','43','44','45','46','47','48','49','50','51','52','53','54',
'55','56','57','58','59','60','61','62','63','64'];

photodiodeLabels_80 = ['1','2','3','4','5','6','7','8','9','10','11','12',
'13','14','15','16','17','18','19','20','21','22','23','24','25','26',
'27','28','29','30','31','32','33','34','35','36','37','38','39','40',
'41','42','43','44','45','46','47','48','49','50','51','52','53','54',
'55','56','57','58','59','60','61','62','63','64','65','66','67',
'68','69','70','71','72','73','74','75','76','77','78','79','80'];

//x-axis of the graph is set up depending on number of photodiodes
if (setPhotodiodes === 16){
        photodiodeLabels = photodiodeLabels_16
        var initialData = new Array(16).fill(0);
}
    else if (setPhotodiodes === 32){
        photodiodeLabels = photodiodeLabels_32
        var initialData = new Array(32).fill(0);
}
    else if (setPhotodiodes === 48){
        photodiodeLabels = photodiodeLabels_48
        var initialData = new Array(48).fill(0);
}
    else if (setPhotodiodes === 64){
        photodiodeLabels = photodiodeLabels_64
        var initialData = new Array(64).fill(0);
}
    else if (setPhotodiodes === 80){
        photodiodeLabels = photodiodeLabels_80
        var initialData = new Array(80).fill(0);
}
    else {
        photodiodeLabels = photodiodeLabels_64
        var initialData = new Array(80).fill(0);
    }
    
    //Rescaling the x-axis based on a user selection of photodiode number
    //via button click action
    
    let btn_16=document.getElementById("pd-16").
    addEventListener('click', ()=> {
        setPhotodiodes = 16;
        photodiodeLabels = photodiodeLabels_16;
    });
    
    let btn_32=document.getElementById("pd-32").
    addEventListener('click', ()=> {
       setPhotodiodes = 32;
       photodiodeLabels = photodiodeLabels_32; 
    });
    
    let btn_48=document.getElementById("pd-48").
    addEventListener('click', ()=> {
        setPhotodiodes = 48;
        photodiodeLabels = photodiodeLabels_48;
    });

    let btn_64=document.getElementById("pd-64").
    addEventListener('click', ()=> {
        setPhotodiodes = 64;
        photodiodeLabels = photodiodeLabels_64;
    });

    let btn_80=document.getElementById("pd-80").
    addEventListener('click', ()=> {
        setPhotodiodes = 80;
        photodiodeLabels = photodiodeLabels_80;
    });
    
    //Rescaling the y-axis based on a user INPUT of maximum y value
    //via localhost window prompt
    
    let btn_range=document.getElementById("range").
    addEventListener('click', ()=> {
        var range = window.prompt("Set upper value for y axis: ");
        maxY = parseInt(range, 10);
    });  

/*
//Create empty chart 
var svgWidth = 1800, svgHeight = 700, barPadding = 5;

    var svg = d3.select('svg')
                .attr("width", svgWidth) 
                .attr("height", svgHeight) 
    
    var xscale = d3.scaleLinear()
                .domain([0, setPhotodiodes])
                .range([0, svgWidth - 100]);
        
    var yscale = d3.scaleLinear()
                    .domain([minY, maxY])
                    .range([svgHeight/2, 0]);
        
    var x_axis = d3.axisBottom()
                    .scale(xscale);
        
    var y_axis = d3.axisLeft()
                    .scale(yscale);
        
    svg.append("g")
        .attr("transform", "translate(50, 10)")
        .call(y_axis);
        
    var xAxisTranslate = svgHeight/2 + 10;
        
    svg.append("g")
        .attr("transform", "translate(50, " + xAxisTranslate  +")")
        .call(x_axis)  */

//////////////////////////////Parsing CSV values - photodiode data
window.onload=function(){

	//begin showing the data once the start button is clicked
	let btn_start=document.getElementById("parse-start").
	addEventListener('click', ()=> {
			//Parses local CSV data with PapaParse library
			function parseData(createGraph) {
				Papa.parse(dataFile, {
					//required for webserver data
					download: true,
					complete: function(results) {
						createGraph(results.data);
						
					}
				});
			}
			//update the graph at a set interval
			setInterval(() => {parseData(createGraph);},interval);

		});

function createGraph(data) {
	//initialise empty y array for photodiode bars
	var photodiodeData = [];
	//iterate over each element in csv row and put into photodiodeData array
	for (var i = 0; i < setPhotodiodes; i++) {
		//create useable array of data for plotting
		photodiodeData.push(data[0][i]);
	}

	//Create Graph with parsed photodiode data 
    var svgWidth = 1300, svgHeight = 600, barPadding = 5;
    var barWidth = (svgWidth / photodiodeData.length);

    var svg = d3.select('svg')
                .attr("width", svgWidth) 
                .attr("height", svgHeight);
    
    //scaling x and y                 
    var xScale = d3.scaleBand().domain(photodiodeLabels).range([0, svgWidth-100]).padding(0.4),
        yScale = d3.scaleLinear().domain([minY, maxY]).range([svgHeight-30, 0]);
    
    //location of where the x and y axis are placed                        
    var x_axis = d3.axisBottom().scale(xScale),
        y_axis = d3.axisLeft().scale(yScale);
            
    //assigns the y axis    
    svg.append("g").attr("transform", "translate(50, 10)").call(y_axis);
                
    //assigns the x axis 
    var xAxisTranslate = svgHeight - 20;
    svg.append("g")
        .attr("transform", "translate(50, " + xAxisTranslate + ")")
        .call(x_axis);

                }; 
            }