function header_expand(){
	var morebox = document.getElementById("id_header_all_buttons");

	if (morebox.classList.contains('cl_visible')) {
    	morebox.classList.remove('cl_visible');
	} 
	else {
		morebox.classList.add('cl_visible');
	}
}

function errorPage(){
	setTimeout(function() {
	  	window.location.href = "https://www.htmlhorse.com";
	}, 3000);
}

function addAllBps(){

    addBp("./bp/bp_home.html","bp_home","For simple homepage.")
    addBp("./bp/bp_bp.html","bp_blueprints","For blueprints page, ironic.")
    addBp("./bp/bp_backgroundvideo.html","bp_backgroundvideo","For pages with video background.")
    addBp("./bp/bp_randomizer.html","bp_randomizer","For seed based random number generator.")
    addBp("./bp/bp_blackjack.html","bp_blackjack","For blackjack gamble game.")
    addBp("./bp/bp_sf6.html","bp_sf6","Dedicated for street fighter 6.")
    addBp("./bp/bp_clickcounter.html","bp_clickcounter","For click counter.")
    addBp("./bp/bp_wiki_mixedup.html","bp_wiki_mixedup","For the mod Mixed-up.")
    addBp("./bp/bp_designshop.html","bp_designshop","For the design of a shopping page.")
	addBp("./bp/bp_game.html","bp_game","For the interactive game.")
	addBp("./bp/bp_shipwrecked.html","bp_shipwrecked","For example game shipwrecked where you think carefully and survive");
	addBp("./bp/bp_space.html","bp_space","For simulation of space traveling");
	addBp("./bp/bp_givethephone.html","bp_givethephone","For the ' giving the phone to x' game");
	addBp("./bp/bp_jackpot.html","bp_jackpot","For the jackpot simulation game");
	addBp("./bp/bp_potionmake.html","bp_potionmake","For the potion crafting game");
	addBp("./bp/bp_popupnotif.html","bp_popupnotif","For the example popup notification");

}

var lastBpHref = "";
function addBp(href,title,desc){
    let list = document.getElementById("id_middle");
    theText = '<a class="cl_bp_block" href="'+href+'"><i>'+title+'</i><br>'+desc+'</br></a>';
    list.innerHTML = theText +list.innerHTML;

    lastBpHref = href;
}

function gotoLastBp(){
	window.location.href = lastBpHref;
}