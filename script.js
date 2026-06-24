/*** DATA ***/
var theTagParent, theTagIndex, theTagIndexes;
var aCart = [];
var vItemImage, vItemName, vItemPrice, vItemQuantity, vItemSize, vItemTotalPrice, vItemHTML,
								vCartPrice, vCartTotal, vCartQuantity,
								vProductPrice, vProductQuantity;
/*** END DATA ***/
 
/*** EVENTS ***/
/*** END EVENTS ***/
 
/*** FUNCTIONS ***/
function doAddToCart(theTag) {
  		theTagParent = theTag.closest("li");
  		
  		vItemName = theTagParent.querySelector("h4");
  		vItemName = vItemName.textContent;
  		
  		if(!aCart.includes(vItemName)) {
  		  		aCart.push(vItemName);
  		  		
  		  		vItemImage = theTagParent.querySelector("img");
  		  		vItemImage = vItemImage.style.backgroundImage;
  //		  		vItemImage = vItemImage.split("/").pop();
  		  		vItemImage = vItemImage.slice(5, -5) + "png";
//  		  		alert(vItemImage);
  		  		
  		  		vItemPrice = theTagParent.querySelector(".js-vProductPrice").textContent;
  		  		vItemPrice = parseInt(vItemPrice.replace("R", ""));
  		  		
  		  		vItemQuantity = theTagParent.querySelector(".js-vProductQuantity").textContent;
  		  		
  		  		vItemTotalPrice = vItemPrice * vItemQuantity;
  		  		
  		  		theTagIndexes = theTagParent.querySelectorAll(".js-btnSelectSize");
  		  		theTagIndexes.forEach(theTagIndex => {
  		  		  		if(theTagIndex.classList.contains("is-active")) {
  		  		  		  		vItemSize = theTagIndex.textContent;
  		  		  		}
  		  		});
  		  		
  		  		vItemHTML = `
  		  						<tr>
  														<td><img src="placeholder.png" style="background-image: url('${vItemImage}');" /></td>
  														<td class="cart-table-details CSSspacer">
  																		<span class="CSSfont js-vCartItemName">${vItemName}</span>
  																	<span>${vItemSize} ya R<span class="js-vCartPrice">${vItemPrice}</span></span>
  		  														<span class="CSSspacer"></span>
  		  														<span>
  		  																		<span class="js-btnDecideQuantity" onclick="doDecideCartQuantity(this)">+</span>
  																						<span class="js-vCartQuantity">${vItemQuantity}</span>
  		  																		<span class="js-btnDecideQuantity" onclick="doDecideCartQuantity(this)">--</span>
  		  														</span>
  		  										</td>
  		  										<td class="cart-table-total">
  		  														<span class="js-vCartTotal">R${vItemTotalPrice}</span>
  		  														<span class="CSSspacer"></span>
  		  														<span class="CSSunderline" onclick="doDeleteCartItem(this)">remove</span>
  		  										</td>
  		  						</tr>
  		  		`;
  		  		
  		  		document.querySelector(".cart table").insertAdjacentHTML("beforeend", vItemHTML);
  		}
}

function doDecideCartQuantity(theTag) {
  		theTagParent = theTag.closest("td");
  		theTagIndex = theTagParent.querySelector(".js-vCartQuantity");
  		vCartQuantity = parseInt(theTagIndex.textContent);
  		
  		if(theTag.textContent == "+") { vCartQuantity++; }
  		else {
  		  		if(vCartQuantity > 1) { vCartQuantity--; }
  		}
  		
  		theTagIndex.textContent = vCartQuantity;
   		
  		theTagParent = theTag.closest("td");
  		theTagIndex = theTagParent.querySelector(".js-vCartPrice");
  		vCartPrice = parseInt(theTagIndex.textContent);
  		vCartTotal = vCartPrice * vCartQuantity;
  		
  		theTagParent = theTagParent.closest("tr");
  		theTagParentIndex = theTagParent.querySelector(".js-vCartTotal");
  		theTagParentIndex.textContent = "R" + vCartTotal;
 }

function doDeleteCartItem(theTag) {
  		theTagParent = theTag.closest("tr");
  		
  		vItemName = theTagParent.querySelector(".js-vCartItemName");
  		vItemName = vItemName.textContent;
  		
  		aCart.splice(aCart.indexOf(vItemName), 1);
  		
  		theTagParent.remove();
}

 function doDecideQuantity(theTag) {
   		theTagParent = theTag.closest(".m-vegetable-nav div");
   		theTagIndex = theTagParent.querySelector(".js-vProductQuantity");
   		vProductQuantity = parseInt(theTagIndex.textContent);
   		
   		if(theTag.textContent == "+") { vProductQuantity++; }
   		else {
   		  		if(vProductQuantity > 1) { vProductQuantity--; }
   		}
   		
   		theTagIndex.textContent = vProductQuantity;
   		
   		theTagParent = theTag.closest(".m-vegetable-nav");
   		theTagIndexes = theTagParent.querySelectorAll("label");
   		theTagIndexes.forEach(theTagIndex => {
   		  		if(theTagIndex.classList.contains("is-active")) {
   		  		  		vProductPrice = theTagIndex.getAttribute("attr-price");
   		  		}
   		});
 }

function doSelectSize(theTag) {
  		vProductPrice = theTag.getAttribute("attr-price");
  		
  		theTagParent = theTag.closest(".m-vegetable-nav");
  		theTagIndexes = theTagParent.querySelectorAll("label");
  		theTagIndexes.forEach(theTagIndex => {
  		  		theTagIndex.classList.remove("is-active");
  		});
  		
  		theTag.classList.add("is-active");
  		
  		theTagParent = theTag.closest(".m-vegetables-list-item");
  		theTagIndex = theTagParent.querySelector(".js-vProductPrice");
  		theTagIndex.textContent = "R" + vProductPrice;
}
/*** END FUNCTIONS ***/

/*** PLUGINS ***/
var tagRadioBtn = document.querySelector(".js-radio");

const songs = [
  { src: 'music/aye.mp3', duration: 255 }, 
  { src: 'music/afsana.mp3', duration: 287 }
];

const player = new Audio();

tagRadioBtn.addEventListener('click', doRadio);

function doRadio() {
  		tagRadioBtn.classList.toggle("is-playing");
  		if(!tagRadioBtn.classList.contains("is-playing")) {
//  		  		tagRadioBtn.classList.add("is-playing");
  		  		tuneIn();
  		} else {
//  		  		tagRadioBtn.classList.remove("is-playing");
  		  		tuneOff();
  		}
}

function tuneIn() {
  const { index, position } = getRadioState();
  const song = songs[index];

  player.src = song.src;
  player.currentTime = position;
  player.play();
  
 // alert(index + ": " + player.src);

  // When song ends, auto-advance to next
  player.onended = () => {
//    if (index == (songs.length - 1)) { index = -1; }
    
    const next = (index + 1) % songs.length;
    player.src = songs[next].src;
    player.currentTime = 0;
    player.play();
    
//    alert(index + ": " + player.src);
  };
}
function tuneOff() { player.pause(); }

function getTotalDuration() {
  return songs.reduce((sum, s) => sum + s.duration, 0);
}

function getRadioState() {
  const now = Math.floor(Date.now() / 1000); // unix time in seconds
  const total = getTotalDuration();
  let offset = now % total; // where we are in the full playlist cycle

  for (let i = 0; i < songs.length; i++) {
    if (offset < songs[i].duration) {
      return { index: i, position: offset }; // which song + how far in
    }
    offset -= songs[i].duration;
  }
}
/*** END PLUGINS ***/