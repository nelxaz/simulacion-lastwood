var hora=0;min=0,seg=0,mseg=0;
var t=0;

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
            
},10);
$(document).ready(function(){ 
	for (var i = 0; i <5; i++) {
    	$('body').append("<div class=\"div\" style=\"left:"+i*50+"px;\" ></div>");
	}


	$(".div").hover(
		function() {
			$( this ).css({'background':'yellow'});
        }, function() {
            $( this ).css({'background':'red'});
        }
	);
});

