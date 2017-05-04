$(function(){
     $(document).on('mouseover', '.phone', function(){
           $('.phones').css('display', 'inline-block');
     });

     $(document).on('mouseout', '.phone', function(){
           $('.phones').css('display', 'none');
     });
	 
	 
	 $(document).on('click', '.labor-day', function(){
           $('.labor-day').css('display', 'none');
     });

     window.onscroll = function(){

     	var top = document.body.scrollTop;
  
     	document.getElementsByClassName("scroll-div")[0].style.top = top + 424;
     
     	if(top == 0){
                  document.getElementsByClassName("scroll-div")[0].style.top = 498;
     	}
     	
             
     }
});