

function moveSlide (currentSlide,targetSlide){
    const track = document.querySelector(".slider_track");  
    const amountToMove = targetSlide.style.left;
    track.style.transform = `translateX(-`+ amountToMove +`)`;
    currentSlide.classList.remove("current_slide");
    targetSlide.classList.add("current_slide");
}

function returnMove (currentSlide){
     const track = document.querySelector(".slider_track");    
    const amountToMove = currentSlide.style.left;
    track.style.transform = `translateX(-`+ amountToMove +`)`;
}



function Slider(){
    const track = document.querySelector(".slider_track");   
    const slides = Array.from(track.children);
    const leftButton = document.querySelector(".arrow-left__bt"); 
    const rightButton = document.querySelector(".arrow-right__btn");
    const control_section = document.querySelector(".slider_control");  
    

    const makeIndicator= (slide,index)=>{    
       slideClassList = slide.classList;   
       const button = document.createElement("button");
       button.classList.add("slider_indicator");
       if (slideClassList.contains("current_slide")) {
           button.classList.add("active");
        }
        button.addEventListener("click", () => {
            const currentSlide = document.querySelector(".current_slide");
            const targetSlide = slides[index];
            if (targetSlide !== currentSlide) {                
                moveSlide(currentSlide, targetSlide);
                setIndicator();
            }
        });
       control_section.appendChild(button);
    }


    const setIndicator = () =>{       
        const indecators = Array.from(control_section.children);
        indecators.forEach((indicator)=>{indicator.classList.remove("active")})
        slides.forEach((slide,index)=>{
            slideClassList = slide.classList;
            if (slideClassList.contains("current_slide")) {                
                if(index){
                    indecators[index-1].classList.remove("active");              
                 indecators[index].classList.add("active");
                } else {
                    indecators[0].classList.add("active");
                }
                 
            }
        })
    }    
    
    const setSlidePosition=(slide,index)=>{
        const slideWidth= slide.getBoundingClientRect().width;
        slide.style.left = index * slideWidth + "px";
    };

    const resetSlidePosition = () =>{
        const track = document.querySelector(".slider_track");
        track.style.transition = 'none'   
        const    setSlidePosition=(slide,index)=>{
            const slideWidth= slide.getBoundingClientRect().width;
            slide.style.left = index * slideWidth + "px";
        };
    
        slides.forEach(setSlidePosition);
        const currentSlide = document.querySelector(".current_slide");       
        returnMove(currentSlide);
        track.style.transition = 'transform 0.5s ease-in';
    };

    slides.forEach(setSlidePosition);

    slides.forEach(makeIndicator);


    rightButton.addEventListener("click",()=>{
        const currentSlide = document.querySelector(".current_slide");
        const nextSlide = currentSlide.nextElementSibling;
        if(nextSlide){  
            moveSlide(currentSlide,nextSlide);
            setIndicator(); 
        }
       
      
    })

    leftButton.addEventListener("click",()=>{
        const currentSlide = document.querySelector(".current_slide");
        const previousSlide = currentSlide.previousElementSibling; 
        if(previousSlide){
            moveSlide(currentSlide,previousSlide); 
            setIndicator(); 
        };
    })
    

    window.addEventListener('resize', resetSlidePosition);


}


Slider()