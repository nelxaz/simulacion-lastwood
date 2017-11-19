var t=0;
var tam_total_hor = 12;
var tam_total_ver = 6;
//var tam_total_hor = 4; // para debug
//var tam_total_ver = 4; //  para debug
var balsa = new Array(tam_total_ver);
var hora=0;min=0,seg=0,mseg=0;
var construir=0;
var render = false;

let menu = function () {

    menuConstructor();
}

//Esta funcion deberia verificar si puedo poner otra madera 
function verify_empty(x ,  y){
	console.log(x + "  "+ y + "blasa  " + balsa[x][y])
	//Aqui deveria ir la verificacion pero me esta dando un error todo pajuo
    //que no tengo puta idea de que sea
    return !balsa[x][y] 
	
}

//Para comodidad de saber donde se hace click el id de los cuadros
// va de la forma plank/noplank-#-# para poder obtener la posicion,
//Me parececio mas comodo para verificar si se puede colocar o no

function interactuarCasilla(x,y){
    console.log('click a casilla');
    if (verify_empty(x,y) && construir === 1){
        if (balsa[x+1][y]===1 || balsa[x-1][y]===1 || balsa[x][y+1]===1 || balsa[x][y-1]===1){
            balsa[x][y]=1;
            render=true;
            contruir=0;
        }else{
            alert('No puedes construir ahí');
            console.log('contruir: ',construir);
        }
    }
}

function paintTable(){
	for(var i = 1; i <= tam_total_ver; i++) {
		$('#balsa').append("<br>"); //debug
    	for (var j = 1; j <= tam_total_hor; j++) {
    		// console.log(balsa[i][j])
    		if(balsa[i][j]==1){
		    	$('#balsa').append(balsa[i][j]); //debug
		    	$('#tablero').append(`<img id="plank-${i}-${j}" class="plank" style="left:${j*100}px; top:${i*100}px" ></img>"`);		    	
		    	$(`#plank-${i}-${j}`).click(function(){
			    	alert("cat "+ $(this).attr('id'));
				}); 
	    	}
		    else{
		    	$('#balsa').append(balsa[i][j]); //debug
                $('#tablero').append(`<img id="noplank-${i}-${j}" class="noplank" style="left:${j*100}px; top:${i*100}px; border:null" ></img>`);
                $(`#noplank-${i}-${j}`).click(function(){
                    str = $(this).attr('id').split("-");
                    x = +str[1];
                    y = +str[2];
                    interactuarCasilla(x,y)
                });                    
		    } 		      
    	}	
	}
	render = false;
}

// Contructor del menu
function menuConstructor(){
    console.log('crea el menu');
    $('#menu').append(`<img id="menu-item-1" class="menu-item" style="left:${80}px; top:${20}px"></img>"`);
    $('#menu-item-1').click(function() {
        construir=1;
        console.log(construir);
    });
}   

function intialTable(){

var cant_piso_inicial = 3;
var initialx = tam_total_hor / 2;
var initialy = tam_total_ver / 2;

// console.log(initialx + "   -   " + initialy)
//Creo un tablero vacio
	for(var i = 1; i <= tam_total_ver; i++) {
    	balsa[i] = new Array(tam_total_hor);
    	for (var j = 1; j <= tam_total_hor; j++) {
    		//0 Quiere decir que no hay nada construido
    		balsa[i][j]=0
    		// console.log(balsa[i][j] + "AQUIIII")
    	}
	}

//para crear los 3 tablones iniciales de forma al azar	
	for(var w = 1; w <= cant_piso_inicial; w++) {
		//1 si es madera
		balsa[initialy][initialx]=1;
		var HoV = Math.floor((Math.random() * 2) + 1);
		if (HoV==1) { 
			initialy++;
			balsa[initialy][initialx]=1; 
			w++;
		}
		else{
			initialx++;
			balsa[initialy][initialx]=1; 
			w++	;
		}


	}
	//Llamo para pintar el tablero
	paintTable();
		
}


setInterval(function(){ 
	if(min==60){
		hora++;
		min=0;
	}
	if(seg==60){
		min++;
		seg=0;
	}
	if(mseg==100){
		seg++;
		mseg=0;
	}
	mseg++;
 	$("#reloj").text(hora+":"+min+":"+seg+":"+mseg);

 	$(".div:eq( 2 )").css({'left':""+t+"px"});
 	t++;
    if(render) paintTable();
},10);
$(document).ready(function(){ 

    intialTable()
    menu()
	for (var i = 0; i <5; i++) {
    	//$('body').append("<div class=\"div\" style=\"left:"+i*50+"px;\" ></div>");
	}


	$(".div").hover(
		function() {
			$( this ).css({'background':'yellow'});
		  }, function() {
		   $( this ).css({'background':'red'});
		  }
	);

// An array with three elements





});

