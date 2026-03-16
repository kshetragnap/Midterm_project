// elements
const p1=document.getElementById("p1");
const p2=document.getElementById("p2");
const p3=document.getElementById("p3");
const img=document.getElementById("story-image");
const choices=document.getElementById("choices");
const codeBox=document.getElementById("codeBox");
const codeInput=document.getElementById("codeInput");
const unlockBtn=document.getElementById("unlockBtn");
const inventoryDiv=document.getElementById("inventory");
// state variables

let inventory=[]

//fucntion to change image
function changeImage(file){
    try{
        img.src=file
    }catch(err){
        console.log("image error")
    }
}

// function to update text
function setText(a,b,c){
    p1.textContent=a
    p2.textContent=b
    p3.textContent=c
}

//function to create choice buttons
function makeChoices(options){
    choices.innerHTML=""
    codeBox.style.display="none"
    options.forEach(option=>{
        let btn=document.createElement("button")
        btn.textContent=option.text
        btn.addEventListener("click",option.next)
        choices.appendChild(btn)
    })
}

//functin for the inventory system (loop requirement)
function addItem(item){
    inventory.push(item)
    inventoryDiv.innerHTML="Inventory:"
    for(let i=0; i<inventory.length;i++){
        inventoryDiv.innerHTML+="<p>"+inventory[i]+"</p>"
    }
}
// start scene
function welcome(){
    changeImage("house.jpg")

    setText(
        "Welcome to the haunted house adventure!!!",
        "Choose your next step",
        "Hallway or Basement"
    )
    makeChoices([
        {text:"Go to Hallway", next:hallway},
        {text:"Go to Basement", next:basement}
    ])
}
//hallway
function hallway() {
    changeImage("hallway.jpg")
    setText(
        "You are now near a dark hallway",
        "You hear loud wispers from the rooms near you",
        "There are 2 rooms you can enter!"
    )
    makeChoices([
        {text: "Red Room",next:redRoom},
        {text:"Dolls Bedroom", next:dolls}
    ])
}
//red room - first room in the hallway
function redRoom(){
    changeImage("redroom.jpg")
    setText(
        "This room smells like blood.",
        "You see a closet near",
        "What's your next step?"
    )
    makeChoices([
        {text:"Look through the closet",next:closet},
        {text:"Leave house", next:escapeEnding}
    ])
}

//closet
function closet() {
    addItem("Bloody Key")
    changeImage("closet.png")
    setText(
        "Blood flows from the closet.",
        "The blood is all over your feet",
        "Where next?"
    )
    makeChoices([
        {text:"Go to dolls bedroom", next:dolls},
        {text:"Go to basement", next:basement}
    ])
}

// dolls room
function dolls(){
    changeImage("dolls.jpg")
    setText(
        "The doll is staring at you.",
        "There is a locked chest that sits in the corner",
        "What do you want to do next?"
    )
    makeChoices([
        {text:"Open chest",next:chest},
        {text:"Leave house",next:escapeEnding}
    ])
}
//chest
function chest(){
    changeImage("chest.jpg")
    setText(
        "The chest has a lock",
        "You need a code.",
        "Hint: You saw it somewhere."
   )
   codeBox.style.display="block"
}

//basement
function basement(){
    changeImage("basement.jpg")
    setText(
        "The basement is cold and dark",
        "You hear loud scary noises",
        "You have 2 paths ahead!"
    )
    makeChoices([
        {text:"Storage Room",next:storage},
        {text:"Secret Tunnel",next:tunnel}

    ])
}
//storage(
function storage(){
    addItem("Code 666")
    changeImage("storage.jpg")
    setText(
        "Empty room with tables", 
        "You find a paper with number 666",
        "Hint: It might open something"
    )
    makeChoices([
        {text:"Explore",next:exploreStorage},
        {text:"Leave house",next:escapeEnding}
    ])
}
//explore storage
function exploreStorage(){
    changeImage("storage.jpg")
    setText(
        "You hear loud stomps.",
        "You should leave quickly.",
        "Where next?"
    )
    makeChoices([
        {text:"Go to Tunnel",next:tunnel},
        {text:"Go to Hallway",next:hallway}
    ])
}
//tunnel
function tunnel(){
    changeImage("tunnel.jpg")
    setText(
        "A pitch black tunnel",
        "You see a monster!!!", 
        "RUN!!! or explore"
    )
    makeChoices([
        {text:"Explore tunnel",next:deathEnding},
        {text:"Leave house",next:escapeEnding}
    ])
}

//first ending
function deathEnding(){
    changeImage("monster.jpg")
    setText(
        "The monster ATTACKS you!!",
        "You didn't escape :(",
        "Ending: death"
    )
    makeChoices([
        {text:"Restart",next:welcome}
    ])
}
//second ending
function escapeEnding(){
    changeImage("escape.jpg")
    setText(
        "You escaped the haunted house. YAY!!",
        "You survived :)",
        "Ending: escape"
    )
    makeChoices([
        {text:"Restart",next:welcome}
    ])
}
//third ending
function treasureEnding(){
    changeImage("treasure.jpg")
    setText(
        "The chest opens",
        "YOU FOUND A HIDDEN TREASURE!!!",
        "Secret Ending"
    )
    makeChoices([
        {text:"Restart",next:welcome}
    ])
}
//user input
unlockBtn.addEventListener("click",()=>{
    if(codeInput.value==="666"){
        treasureEnding()
    }else{
        p3.textContent="Wrong code."
    }
})

//hover events
img.addEventListener("mouseover",()=>{
    img.style.filter="brightness(1.3)"
})

img.addEventListener("mouseout",()=>{
    img.style.filter="brightness(1)"
})

//keyboard events
document.addEventListener("keydown",(e)=>{
    if(e.key==="h") hallway()
    if(e.key==="b") basement()
})

//event listeners
document.addEventListener("keydown",(e)=>{
    if(e.key==="r") welcome()
})

document.addEventListener("keydown",(e)=>{
    if(e.key==="i") alert("Inventory: " + inventory.join(", "))
})

document.addEventListener("keydown",(e)=>{
    if(e.key==="h") hallway()
})
document.addEventListener("keydown",(e)=>{
    if(e.key==="b") basement()
})
document.addEventListener("keydown",(e)=>{
    if(e.key==="d") dolls()
})
document.addEventListener("keydown",(e)=>{
    if(e.key==="c") chest()
})
document.addEventListener("keydown",(e)=>{
    if(e.key==="t") tunnel()
})
document.addEventListener("keydown",(e)=>{
    if(e.key==="s") storage()
})
document.addEventListener("keydown",(e)=>{
    if(e.key==="e") escapeEnding()
})
document.addEventListener("keydown",(e)=>{
    if(e.key==="x") deathEnding()
})
document.addEventListener("keydown",(e)=>{
    if(e.key==="w") welcome()
})
//start game!!
welcome()