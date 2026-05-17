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
								vShopText4Delivery = "Free Pickup";
				}
				else if (vShopDelivery == 100) {
								if(vShopCoupon == "FATSHI") {
												vShopDeliveryTotal = 0;
												vShopText4Delivery = "Free Shipping from Coupon";
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
								vShopCouponAlert1 = "** THE COMMUNITY gets free shipping <a href='https://chat.whatsapp.com/DhlDDKqM849BE2AwnhYIge/' class='CSSunderline'>[invite link]</a>";
				}
				else if (vShopCoupon == "FATSHI") {
								vShopCouponAlert1 = "<span style='color: green;'>** Coupon code is valid</span>";
				} else {
								vShopCouponAlert1 = "<span style='color: red;'>** Coupon doesn't exist</span>";
				}

				tagShopCouponAlert1.innerHTML = vShopCouponAlert1;
}
/*** END FUNCTIONS ***/

/*** LIBRARIES ***/
document.querySelector(".js-formProposal").addEventListener("submit", function(e){
	e.preventDefault();
	generateInvoice();
});

async function generateInvoice(){

	const { jsPDF } = window.jspdf;
	const doc = new jsPDF();

	// =========================================
	// GET VALUES
	// =========================================

	const kits =
		parseInt(document.querySelector(".js-formProposal .js-shopKits").value) || 0;

	const address =
		document.querySelector(".js-formProposal textarea").value || "Pickup Point";

	const coupon =
		document.querySelector(".js-formProposal input[type='text']").value || "";

	const isPaxi =
		document.querySelector(".js-formProposal .js-tagShopDeliveryPaxi").checked;

	const shipping =
		isPaxi ? 100 : 0;

	// =========================================
	// SEEDS
	// =========================================

	let seeds = [];

	if(document.getElementById("rdb4basil").checked)
		seeds.push("Basil");

	if(document.getElementById("rdb4chives").checked)
		seeds.push("Chives");

	if(document.getElementById("rdb4parsley").checked)
		seeds.push("Parsley");

	if(document.getElementById("rdb4cilantro").checked)
		seeds.push("Cilantro/Coriander");

	if(document.getElementById("rdb4mustard").checked)
		seeds.push("Mustard");

	if(document.getElementById("rdb4thyme").checked)
		seeds.push("Thyme");

	// =========================================
	// CALCULATIONS
	// =========================================

	const kitPrice = 400;

	let subtotal =
		kits * kitPrice;

	let shippingCost =
		shipping; shippingCost = vShopDeliveryTotal;

	// FREE SHIPPING
	if(coupon.toUpperCase() === "FATSHI"){
		shippingCost = 0;
	}

	const total =
		subtotal + shippingCost;

	// =========================================
	// COLORS
	// =========================================

	const green = [74,95,76];
	const beige = [244,241,234];

	// =========================================
	// HEADER
	// =========================================

	doc.setFillColor(...green);
	doc.rect(0,0,210,45,"F");

	doc.setTextColor(255,255,255);

	doc.setFontSize(28);
	doc.text("KINHARVEST",20,22);

	doc.setFontSize(12);
	doc.text("R400 'Seed to Harvest' Planter Kit with Pot and Accessories (+ sample seeds)",20,32);

	// =========================================
	// RESET COLOR
	// =========================================

	doc.setTextColor(0,0,0);

	// =========================================
	// TITLE
	// =========================================

	doc.setFontSize(18);
	doc.text("INVOICE",20,60);

	doc.setFontSize(11);

	doc.text(
		`Date: ${new Date().toLocaleDateString()}`,
		20,
		72
	);

	// =========================================
	// CUSTOMER DETAILS
	// =========================================

	doc.setFontSize(13);

	doc.text(
		`Number of Kits: ${kits}`,
		20,
		90
	);

	doc.text(
		`Seed Samples: ${seeds.join(", ") || "None"}`,
		20,
		100
	);

	doc.text(
		`Delivery Method: ${isPaxi ? "Door Delivery" : "Pickup Point"}`,
		20,
		110
	);

	// =========================================
	// ADDRESS BOX
	// =========================================

	doc.text(
		"Delivery Address:",
		20,
		125
	);

	doc.setFillColor(...beige);

	doc.roundedRect(
		20,
		130,
		170,
		25,
		4,
		4,
		"F"
	);

	doc.setFontSize(11);

	doc.text(
		address,
		25,
		142
	);

	// =========================================
	// TABLE HEADER
	// =========================================

	doc.setFillColor(...green);

	doc.rect(
		20,
		170,
		170,
		10,
		"F"
	);

	doc.setTextColor(255,255,255);

	doc.text("Description",25,177);
	doc.text("Amount",160,177);

	// =========================================
	// RESET
	// =========================================

	doc.setTextColor(0,0,0);

	// =========================================
	// TABLE ROWS
	// =========================================

	let y = 192;

	doc.text(
		`${kits} × Planter Kit(s)`,
		25,
		y
	);

	doc.text(
		`R${subtotal.toFixed(2)}`,
		160,
		y
	);

	y += 12;

	doc.text(
		"Shipping",
		25,
		y
	);

	doc.text(
		`R${shippingCost.toFixed(2)}`,
		160,
		y
	);

	y += 18;

	// =========================================
	// TOTAL BOX
	// =========================================

	doc.setFillColor(235,235,235);

	doc.roundedRect(
		20,
		y,
		170,
		18,
		4,
		4,
		"F"
	);

	doc.setFontSize(16);

	doc.text(
		`TOTAL: R${total.toFixed(2)}`,
		25,
		y + 12
	);

	// =========================================
	// FOOTER
	// =========================================

	doc.setFontSize(11);

	doc.text(
		"Thank you for supporting KINHARVEST",
		20,
		270
	);

	doc.text(
		"Supporting our people. Growing our future.",
		20,
		278
	);

	// =========================================
	// SAVE
	// =========================================

	doc.save(
		`KINHARVEST-INVOICE.pdf`
	);
}
/*** END LIBRARIES ***/