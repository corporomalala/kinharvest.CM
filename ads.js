/***
document.getElementById("changeColorButton").addEventListener("click", function() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F4F4F4", "#FFC300"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
});
***/

/*** INITIALIZION ***/
injectIBRIAD();
/*** END INITIALIZATION ***/

/*** FUNCTIONS ***/
function injectIBRIAD() {
    const IBRInewad = document.createElement("article");
    IBRInewad.id = "IBRInewad";

    const IBRInewtag1 = document.createElement("img");
    IBRInewtag1.id = "IBRInewtag1";
    IBRInewtag1.src = "/storage/emulated/0/CODE/[Ads for IBRI]/inbuiltweb.png";
    IBRInewtag1.alt = "INBUILTWEB"
    IBRInewad.appendChild(IBRInewtag1);
    
    const IBRInewtag2 = document.createElement("marquee");
    IBRInewtag2.id = "IBRInewtag2";
    IBRInewtag2.textContent = "HOST WEB APPLICATIONS: php, python, node.js, ruby, perl, go (golang), rust, c/c++, java, asp.net. GET UNLIMITED RESOURCES: cpu, ram, bandwidth, storage, domain.";
    IBRInewad.appendChild(IBRInewtag2);
    
    const IBRInewtag3 = document.createElement("a");
    IBRInewtag3.id = "IBRInewtag3";
    IBRInewtag3.textContent = "Visit";
    IBRInewtag3.href = "https://inbuiltweb.com";
    IBRInewtag3.target = "_blank";
    IBRInewad.appendChild(IBRInewtag3);
    
    const IBRInewtag4 = document.createElement("span");
    IBRInewtag4.id = "IBRInewtag4";
    IBRInewtag4.textContent = "AD";
    IBRInewad.appendChild(IBRInewtag4);
    
    const IBRInewstyle = document.createElement("style");
    IBRInewstyle.textContent += "#IBRInewad, #IBRInewad * { padding: 0; margin: 0; box-sizing: border-box; } a { color: black; text-decoration: none; }";
    IBRInewstyle.textContent += "#IBRInewad, #IBRInewtag4 { background-color: #AAA; } #IBRInewtag3 { background-color: orange; }";
    IBRInewstyle.textContent += "#IBRInewad { font-family: 'Arial', sans-serif; line-height: 1.5em; } #IBRInewtag4 { font-size: .75em; }";
    IBRInewstyle.textContent += "body { position: relative; }";
    IBRInewstyle.textContent += "#IBRInewad { display: flex; align-items: center; justify-content: center; } #IBRInewtag2 { flex: 1; }";
    IBRInewstyle.textContent += "#IBRInewtag3 { border-radius: 4px; } #IBRInewtag4 { border-radius: 4px 4px 0 0; }";
    IBRInewstyle.textContent += "#IBRInewad { position: absolute; bottom: 0; left: 0; width: 100%; padding: 1em; } #IBRInewtag1 { width: auto; height: 1.5em; border-radius: 4px; } #IBRInewtag2 { margin: 0 1em } #IBRInewtag3 { padding: 0 0.5em; } #IBRInewtag4 { position: absolute; top: -1.5em; left: 0; display: inline-block; padding: 0 .5em; }";
    IBRInewstyle.textContent += "@media screen and (max-width: 50em) { #IBRInewad { font-size: 14px; } } @media screen and (min-width: 50em) { #IBRInewad { font-size: 18px; } }";
    
    document.querySelector(".IBRIADhtml body").appendChild(IBRInewad);
    document.querySelector(".IBRIADhtml body").appendChild(IBRInewstyle);
    document.querySelector(".IBRIADhtml body").style = "padding-bottom: 4em !important;";
}
/*** END FUNCTIONS ***/


