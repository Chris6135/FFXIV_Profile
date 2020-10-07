document.addEventListener("DOMContentLoaded", function () {
    run();
  });



function run(){
    let page = document.querySelector(".start");
    let oldPage
    let selected = null;
    let previousButton;
    let oldButton
    let oldSelected
    let freeze = false;
    let contentToggle = true
    let hideToggle = true;
  

    function hideClass(selectedClass){

        if(hideToggle){ 
            newClass = selectedClass +" transitional";
        }else{
            newClass = selectedClass +" hidden";
            hideToggle = true;

        }

        freeze = false;
        return newClass;
    }

    function unHideClass(selectedClass){
        let arr = selectedClass.split(" ")
        let newArr =[]

        arr.forEach((ele)=>{
            if(ele !== "hidden"){
                newArr.push(ele)
            }
        })

        freeze = false;

       return newArr.join(" ")
    }


    function pressButton(selectedClass){

        newClass = selectedClass +" pressed";


        return newClass;
    }

    function unPressButton(selectedClass){
        let arr = selectedClass.split(" ")
        let newArr =[]

        arr.forEach((ele)=>{
            if(ele !== "pressed"){
                newArr.push(ele)
            }
        })

       return newArr.join(" ")
    }

    function setButtons(){
        let buttons = document.querySelectorAll(".button");

        buttons.forEach((button,i)=>{
            button.addEventListener("click", ()=>{
                
                if(contentToggle){
                let content = document.querySelector(".content-pages")
                content.setAttribute("class", unHideClass(content.getAttribute("class")))
                contentToggle = false
                }
                    if(selected){
                        oldSelected = selected
                        previousButton = document.querySelector(".button."+selected);
                    }
                    // previousButton.setAttribute("class", unHideClass(previousButton.getAttribute("class"))) //hide button variant
                    // previousButton.setAttribute("class", unPressButton(previousButton.getAttribute("class")))  //push button variant

                
                let selectedClass = page.getAttribute("class");
                selected = button.textContent;
                let selectedButton = button.getAttribute("class")

         

                if(selectedButton.includes(oldButton) || freeze){
                    console.log("sucess")
                }else{



                    freeze = true

                    // previousButton.setAttribute("class", unHideClass(previousButton.getAttribute("class"))) //hide button variant
                if(oldSelected){
                     previousButton.setAttribute("class", unPressButton(previousButton.getAttribute("class")))  //push button variant}
                }
                  //this is another lazy refactor this is mostly for testing purposes. 
                  //need to delete this if condition and tweak the 
                    if(page.getAttribute("class").includes("start")){
                    page.setAttribute("class", hideClass(selectedClass));
                    oldPage = page
                    page = document.querySelector("." + selected+".page");
                    setTimeout(function() { page.setAttribute("class", unHideClass(page.getAttribute("class")))}, 2000)

                    if(hideToggle){
                        freeze = true;
                        setTimeout(function(){ 
                        oldPage.setAttribute("class", hideClass(selectedClass));}, 2000);
                        hideToggle = false

                    }
                } else{
                    page.setAttribute("class", hideSection(selectedClass));
                    page = document.querySelector("." + selected+".page");
                    page.setAttribute("class", unHideClass(page.getAttribute("class")))


                }

                    let currentButton = document.querySelector(".button."+selected)
                    // currentButton.setAttribute("class", hideClass(currentButton.getAttribute("class"))) //hide button variant
                    currentButton.setAttribute("class", pressButton(currentButton.getAttribute("class"))) //push button variant

            
                    oldButton = selected
    
                }
                

            })
        })
    }


    function hideSection(selectedClass){
        //this is a messy soltion. What I should do is refactor the depedancy on hideToggle and have hideclass accept two arguments. a class and a boolean. 
        //but Im lazy so for now this is what Im doing.

     
            newClass = selectedClass +" hidden";

        return newClass;
    }

    function clickOrder(section,secClass){

        let pressedSection

        if(section.getAttribute("class").includes("section-selector")){
            pressedSection = document.querySelectorAll(".section-selector.pressed")[0];
        } else{
            pressedSection = document.querySelectorAll(".point.pressed")[0];
        }
         let target = document.querySelector(pressedSection.getAttribute("data"))
            pressedSection.setAttribute("class", unPressButton(secClass))
            target.setAttribute("class", hideSection(target.getAttribute("class")))



            pressedSection = section
            pressedSection.setAttribute("class", pressButton(secClass))
            target = document.querySelector(pressedSection.getAttribute("data"))
            target.setAttribute("class", unHideClass(target.getAttribute("class")))

   }

    function setClickers(stuff){
        stuff.forEach((section,i)=> {
            section.addEventListener("click", ()=>{
                console.log(section.getAttribute("data"))
                let   secClass = section.getAttribute("class")

                if(secClass.includes("pressed")){
                    console.log("success")
                }else{

                    clickOrder(section,secClass)
            
                }
            }
        )})
    }


    function hookClickers(stuff){
        let buttons = document.querySelectorAll(stuff);
        buttons.forEach((hook)=>{
            hook.addEventListener("click", ()=>{
                let   secClass = hook.getAttribute("class")
                let target = document.querySelector(hook.getAttribute("data"))

                if(secClass.includes("pressed") && !secClass.includes("general-hook") ){
                    hook.setAttribute("class", unPressButton(secClass))
                    target.setAttribute("class", hideSection(target.getAttribute("class")))
                }else{
                    hook.setAttribute("class", pressButton(secClass))
                     target.setAttribute("class", unHideClass(target.getAttribute("class")))
                }
            })
        })
    }







    
    setClickers(document.querySelectorAll(".section-selector"));
    setClickers(document.querySelectorAll(".point"));
    hookClickers(".hook");
    hookClickers(".plus");

    setButtons();

    
}
