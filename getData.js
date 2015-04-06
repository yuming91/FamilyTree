
function trim(str) {
      return str.replace(/^\s+|\s+$/g, '');
}

var idA; 	 	
var idB; 
var indexA;
var indexB;

//get the informaiton from the form input
function getData(){
			var fname_element = document.getElementById('sourceName');
  		var sname_element = document.getElementById('targetName');
  		var relation_element = document.getElementById('relationship');
			var SourceFamily;
			var TargetFamily;
			
  		var SourceName = trim(fname_element.value);
  		var TargetName = trim(sname_element.value);
			var relationship = parseInt(relation_element.value);

      var SourceBirth = document.getElementById('yearpicker1').value;
      var TargetBirth = document.getElementById('yearpicker2').value;

      var SourceAlive = parseInt(document.getElementById('alive1').value);
      var TargetAlive = parseInt(document.getElementById('alive2').value);

  
  		var error_message = 'The following fields had errors in them: \n\n';
  		var data = 'You entered the following information: \n\n';

  		var error_flag = false;

  		if(fname_element == '') {
	  	  error_message += 'SourceName: Please enter your name\n';
	  		error_flag = true;
  		} else {
	      data += 'SourceNamee: ' + SourceName + '\n';
      }

  		if(sname_element == '') {
	  	  error_message += 'TargetName: Please enter the target name\n';
	      error_flag = true;
      } else {
	      data += 'TargetName: ' + TargetName + '\n';
      }

  		data += 'Relationship: ' + relationship;
			
			// When get the information from input, thinking of write to a jason file
			//WriteFile();
  		if(error_flag) {
        alert(error_message);
  		} else {
	  	 	//alert(data);
        var f1 = true;
        var f2 = true;
        var id1;
        var id2;
				
				
        for (var i = 0; i < graph.nodes.length; i++) {
          if(graph.nodes[i].title == SourceName && graph.nodes[i].birth == SourceBirth){
            f1= false;
            id1 = graph.nodes[i].id;
						SourceFamily = graph.nodes[i].family;
						console.log("Found sourcefamily ", SourceFamily);
          }
          if(graph.nodes[i].title == TargetName && graph.nodes[i].birth == TargetBirth){
            f2= false;
            id2 = graph.nodes[i].id;
						TargetFamily = graph.nodes[i].family;
          }
        };
				console.log("f1 is ", f1);
				console.log("f2 is ", f2);
				if (f1 && f2){
				  if (relationship == 3 || relationship == 4 || relationship == 5){
					 	SourceFamily = 0;
					 	TargetFamily = 0;
				  }
					if (relationship == 1){
					  SourceFamily = 0;
						TargetFamily = 1;
					}
					if (relationship == 2 || relationship == 6){
					  SourceFamily = 1;
						TargetFamily = 0;
					}
					id1 = count;
          graph.nodes.push({"family": SourceFamily, "birth": SourceBirth, "title": SourceName, "id": id1, "alive": SourceAlive});    
          count++;   
					id2 = count;
          graph.nodes.push({"family": TargetFamily, "birth": TargetBirth, "title": TargetName, "id": id2, "alive": TargetAlive});
          count++;
				}else{
				  // source is a new node
          if(f1){
					  console.log(" Come here, f1 is true");
				    if (relationship == 3 || relationship == 4 || relationship == 5){
					 		SourceFamily = TargetFamily;					 		
				    }
					  if (relationship == 1){
					    SourceFamily = TargetFamily - 1;
						}
					  if (relationship == 2 || relationship == 6){
					    SourceFamily = TargetFamily + 1;
					  }
          id1 = count;
          graph.nodes.push({"family": SourceFamily, "birth": SourceBirth, "title": SourceName, "id": id1, "alive": SourceAlive});    
          count++;   
					}
					// target is a new node
          if(f2){
					  console.log(" Come here, f2 is true");
						console.log("relationship is ", relationship);
					  if (relationship == 3 || relationship == 4 || relationship == 5){
					 		TargetFamily = SourceFamily;					 		
				    }
					  if (relationship == 1){
					    TargetFamily = SourceFamily + 1;
						}
					  if (relationship == 2 || relationship == 6){
					    TargetFamily = SourceFamily - 1;
					  }
            id2 = count;
            graph.nodes.push({"family": TargetFamily, "birth": TargetBirth, "title": TargetName, "id": id2, "alive": TargetAlive});
            count++;
          }
				} //end of else of (f1 && f2)
        console.log("sourceFamily is ", SourceFamily);
				console.log("targetFamily is ", TargetFamily);
        graph.links.push({"source": id1, "target": id2,  "bond": relationship});
				// if (f1 || f2){
    //       graph.links.push({"source": id1, "target": id2,  "bond": relationship});
				// } else {
				// 	error_message = "Error !!! Both source and target exist. "
				// 	alert(error_message);
				// }
         // console.log(graph.links[0].source, graph.links[0].target);
        
      }

      sortByGen(graph);
  		
      document.forms['family'].reset();

				// datalist for person 1
      var dataList = document.getElementById('json-datalist');
      var input = document.getElementById('sourceName');
      var temp = graph.nodes;
      var names = [];
      
			for(var i = 0; i < graph.nodes.length; i++) {
			  names.push(temp[i].title);
			}

      // Loop over the array.
      names.forEach(function(item) {
        // Create a new <option> element.
        var option = document.createElement('option');
        // Set the value using the item in the JSON array.
        var newOption = true;
        // Add the <option> element to the <datalist>.
				for (j = 0; j < dataList.options.length; j++){
				  if (dataList.options[j].value == item) {
					  newOption = false;
						break;
					}
				}
				if (newOption){
				option.value = item;
            dataList.appendChild(option);
				}
      });
			input.placeholder = "Name";
    
    
		 // datalist for person2     
      var dataList2 = document.getElementById('json-datalist2');
			var input2 = document.getElementById('targetName');
    	var temp = graph.nodes;
      
      var names = [];
      
   		for(var i = 0; i < graph.nodes.length; i++) {
  		  names.push(temp[i].title);
   
	 		}
      
			// Loop over the array.
      names.forEach(function(item) {
        // Create a new <option> element.
        var option = document.createElement('option');
        // Set the value using the item in the JSON array.
        var newOption = true;
        // Add the <option> element to the <datalist>.
				for (j = 0; j < dataList2.options.length; j++){
				  if (dataList2.options[j].value == item) {
					  newOption = false;
						break;
					}
				}
				if (newOption){
				option.value = item;
            dataList2.appendChild(option);
				}
      });
			
			input2.placeholder = "Name";   
    
		  document.getElementById('sourceName').addEventListener('input', function () {
        var n=sourceName.value;
        for(var i = 0; i < graph.nodes.length; i++) {
				  var temp=graph.nodes[i].title;
					if (temp==n){
					  document.getElementById('yearpicker1').value=graph.nodes[i].birth;
            document.getElementById('alive1').value=graph.nodes[i].alive;
            idA=graph.nodes[i].id;
            indexA=i;
          };
        }   
      });

			document.getElementById('targetName').addEventListener('input', function () {
			  var n=targetName.value;
        for(var i = 0; i < graph.nodes.length; i++) {
          var temp=graph.nodes[i].title;
          if (temp==n){
            document.getElementById('yearpicker2').value=graph.nodes[i].birth;
            document.getElementById('alive2').value=graph.nodes[i].alive;
            idB=graph.nodes[i].id;
            indexB=i;
          };
        }   

				//get relationship information
  			for(var i = 0; i < graph.links.length; i++) {
				  console.log(graph.links[i]);
          var tempS=graph.links[i].source.id;
          var tempT=graph.links[i].target.id;
          if (tempS==idA&&tempT==idB){
            document.getElementById('relationship').value=graph.links[i].bond;
          };
        }   
      });

			document.forms['family'].reset();

}


//update information
function getData2(){
      console.log(idA);
			console.log(idB);
			if (idA != null){
  		  for(var i=0;i < graph.nodes.length; i++){
          if(graph.nodes[i].id==idA) {
            graph.nodes[i].title=document.getElementById('sourceName').value;
          	graph.nodes[i].birth=document.getElementById('yearpicker1').value;
          	graph.nodes[i].alive=document.getElementById('alive1').value;   
          };
				}
	     }
			 if (idB != null){
			   for(var i=0;i < graph.nodes.length; i++){
           if(graph.nodes[i].id==idB) {
             graph.nodes[i].title=document.getElementById('targetName').value;
           	 graph.nodes[i].birth=document.getElementById('yearpicker2').value;
             graph.nodes[i].alive=document.getElementById('alive2').value;   
           };
  		   }
  		}
  		
			if (idA != null && idB != null){
  		  for(var i = 0; i < graph.links.length; i++) {
          var tempS=graph.links[i].source.id;
          var tempT=graph.links[i].target.id;
          if (tempS==idA&&tempT==idB){
            graph.links[i].bond=document.getElementById('relationship').value;
            
            
            if (graph.links[i].bond == 3 || graph.links[i].bond == 4 || graph.links[i].bond == 5){
					 		graph.nodes[indexA].family = graph.nodes[indexB].family;					 		
				    }
					  if (graph.links[i].bond == 1){
					    graph.nodes[indexA].family = graph.nodes[indexB].family - 1;
						}
					  if (graph.links[i].bond == 2 || graph.links[i].bond == 6){
					    graph.nodes[indexA].family = graph.nodes[indexB].family + 1;
					  }
            
            
            
            
          };
				}
      }
     
      document.forms['family'].reset();
			idA = null;
			idB = null;
			sortByGen(graph);
}

