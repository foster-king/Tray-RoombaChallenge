//Declare variables
const fs = require('fs');   
var dirtcount = 0;
var gridsizex;
var gridsizey;
var roombax;
var roombay;
var directions;
var array;

//Read in input file and assign contents to 'data'
fs.readFile('input.txt', (err, data) => {
    if (err) throw err;
          
    //Split contents of file to an array splitting on carriage returns
    array = data.toString().split("\n");
    
           
    //Loop through array of data to remove spaces to protect against files with multiple spaces between coordinates
    for(var i in array) {
        array[i] = array[i].replace(/\s/g, '')
    }; 
      
    //Get number of lines in input, to be used for identifying position of directions
    const lines = array.length-1;
    
    //Assign values for x and y coordinates
    gridsizex = parseInt(array[0].substring(0,1));
    gridsizey = parseInt(array[0].substring(2,1));
    roombax = parseInt(array[1].substring(0,1));
    roombay = parseInt(array[1].substring(2,1));
    
    //Split directions into array, splitting on every character
    directions  = array[lines].split('');
        
    //Remove from the input array the directions, grid coordinates, and roomba position. Remaining items are the coordinates of the dirt patches
    array.splice(lines,1);
    array.splice(0,2);    
        
        
//Loop through array of directions to change the position of the roomba  
    for(var i in directions) {

        //Increment x or y value of roomba position based on direction
        if(directions[i] == 'N'){
            roombay = roombay+1;
        }
        else if(directions[i] == 'S'){
            roombay = roombay-1;
        }
        else if(directions[i] == 'E'){
            roombax = roombax+1;
        }
        else {
            roombax = roombax-1;
        }


        //Correct for the roomba hitting the edge of the grid   
        if(roombax < 0){
                roombax = roombax+1;
        }
        else if(roombax > gridsizex-1){
                roombax = roombax-1;
        }
        else if(roombay < 0){
                roombay = roombay+1;
        }
        else if(roombay > gridsizey-1){
                roombay = roombay-1;
        }
        else{
                roombax=roombax;
                roombay=roombay;
        }

        //Loop through array of dirt patches and incrememnt dirtcount if roomba has same coordinates as a dirt patch
        for(var j in array){
            if(roombax.toString()+roombay.toString() == array[j]){

                dirtcount = dirtcount+1;
                array.splice(j,1);

            }
            else{

                dirtcount=dirtcount;

            }

        }

    }

    //Output final position of roomba and total count of dirt patches cleaned    
    console.log(roombax.toString()+' ' +roombay.toString());
    console.log(dirtcount.toString());    
           
})