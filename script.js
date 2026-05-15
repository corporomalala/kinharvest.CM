/*** DATA ***/
var vShopKits = 0, vShopKitsTotal = 0, vShopDelivery = null, vShopDeliveryTotal = null, vShopTotal = 0;
var vShopCoupon = "", vShopCouponAlert1 = "", vShopCouponAlert2 = "", vShopText4Kits = "", vShopText4Delivery = "", vShopText4Total = "";
var tagShopCouponAlert1 = document.querySelector(".js-tagShopCouponAlert1"),
								tagShopCouponAlert2 = document.querySelector(".js-tagShopCouponAlert2"),
								tagShopText = document.querySelector(".js-tagShopText"),
								tagShopKits = document.querySelector(".js-tagShopKits");
 /*** END DATA ***/
  
/*** EVENTS ***/

/*** END EVENTS ***/
  
/*** FUNCTIONS ***/
setTabloid();
 
function watchShopCoupon(theTag) {
				vShopCoupon = theTag.value;
				
				setTabloid();
}
function watchShopDelivery(theInt) {
				vShopDelivery = theInt;
				setTabloid();
}
function watchShopKits(theTag) {
				if(theTag.value != "") { vShopKits = parseInt(theTag.value); }
				setTabloid();
}

function setTabloid() {
				vShopCouponAlert = "", vShopText4Kits = "", vShopText4Delivery = "", vShopText4Total = "";
				
				if(vShopKits == 0) { vShopText4Kits = "__ Kits for R____"; }
//				else if (vShopKits == 1) { vShopText4Kits = "1 Kit for R400"; }
				else {
								vShopKitsTotal = vShopKits * 400;
								vShopText4Kits = vShopKits + " Kits for R" + vShopKitsTotal;
				}
				
				if (vShopDelivery == 0) {
								vShopDeliveryTotal = 0;
								vShopText4Delivery = "Free Shipping";
				}
				else if (vShopDelivery == 100) {
								if(vShopCoupon == "AAA") {
												vShopDeliveryTotal = 0;
												vShopText4Delivery = "Free Shipping";
								}
								else {
												if(vShopKits == 0) { vShopText4Delivery = "R___ Shipping"; }
												else {
																vShopDeliveryTotal = (vShopDelivery * (Math.ceil(vShopKits / 4)));
																vShopText4Delivery = "R" + vShopDeliveryTotal + " Shipping";
												}
								}
				}
				else { vShopText4Delivery = "R___ Shipping"; }
				
				vShopTotal = parseInt(vShopKitsTotal) + parseInt(vShopDeliveryTotal);
				if(vShopTotal > 0) { vShopText4Total = "R" + vShopTotal + " only"; }
				else { vShopText4Total = "R____ only"; }
								
				tagShopText.innerHTML = vShopText4Kits + " + " + vShopText4Delivery + " = " + vShopText4Total;
				
				if(vShopCoupon == "") {
								vShopCouponAlert1 = "** THE COMMUNITY gets free shipping";
				}
				else if (vShopCoupon == "AAA") {
								vShopCouponAlert1 = "<span style='color: green;'>** Coupon code is valid</span>";
				} else {
								vShopCouponAlert1 = "<span style='color: red;'>** Coupon doesn't exist</span>";
				}

				tagShopCouponAlert1.innerHTML = vShopCouponAlert1;
}
/*** END FUNCTIONS ***/