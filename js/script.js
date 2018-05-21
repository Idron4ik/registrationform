window.onload = function(){
	var name = document.querySelector("input[name=name]");
	var mail = document.querySelector("input[name=mail]");
	var phone = document.querySelector("input[name=phone]");
	var pass = document.querySelector("input[name=password]");
	var message = document.querySelectorAll(".registration form .group>ul.message");
	var t1=t2=t3=t4=false;

	function validateFocus(self){
		if( self.classList.contains("error")){
			self.classList.remove("error");
		}
	}
	function validateBlur(f, self, itemMessage){
		if(f){
			self.classList.remove("success");
			self.classList.add("error");
			message[itemMessage].style.fontSize = "1rem";
			message[itemMessage].style.transform = "scaleY(1)";
		} else {
			self.classList.remove("error");
			message[itemMessage].style.fontSize = "0rem";
			message[itemMessage].style.transform = "scaleY(0)";
			self.classList.add("success");

		}
	}
	name.onfocus = function(){
		validateFocus(this);
	}
	name.onblur = function(){
		var itemMessage = 0;
		var regName = /^[a-zа-яёі ]+$/i;
		(!regName.test(this.value)) ? (validateBlur(true , this, itemMessage), t1=false) : (validateBlur(false , this, itemMessage), t1=true)
	}
	mail.onfocus = function(){
		validateFocus(this);
	}
	mail.onblur = function(){
		var itemMessage = 1;
		var regMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		(!regMail.test(this.value))  ? (validateBlur(true , this, itemMessage), t2=false) : (validateBlur(false , this, itemMessage), t2=true)
	}
	phone.onfocus = function(){
		validateFocus(this);
	}
	phone.onblur = function(){
		var itemMessage = 2;
		var regNumber = /^\d+$/;
		(!regNumber.test(this.value)) ? (validateBlur(true , this, itemMessage), t3=false) : (validateBlur(false , this, itemMessage), t3=true)
	}
	pass.onfocus = function(){
		validateFocus(this);
	}
	pass.onblur = function(){
		var itemMessage = 3;
		var regPass =  /^[a-z0-9_-]{6,22}$/;
		(!regPass.test(this.value)) ? (validateBlur(true , this, itemMessage), t4=false) : (validateBlur(false , this, itemMessage), t4=true)
	}

	document.querySelector(".registration form .btn").onclick = function(e){
		e.preventDefault();
		if(t1&&t2&&t3&&t4){
			var params = `name=${name.value}&mail=${mail.value}&phone=${phone.value}&pass=${pass.value}`;
			ajaxGet("../server.js/", params);
		}
		else{
			popUpShow("Sorry............... <p>You entered incorrect data</p>");
		}
	}
}

function ajaxGet(url,params){
	console.log(params);
	var request = new XMLHttpRequest();

	request.onreadystatechange = function(){
		console.log(request.readyState);
		if (request.readyState == 4){
			popUpShow("Thank you for registering");
			console.log(request.responseText);
		}
	}
	request.upload.onprogress = function(event) {
	    console.log("Starting");
	}
	request.open("POST", url);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.send(params);
}

function popUpHide(){
	var popUp =  document.querySelector(".pop-up");
	popUp.style.display = "none";
	
}
function popUpShow(message){
	var text = document.querySelector(".pop-up_inner-text");
	var popUp =  document.querySelector(".pop-up");
	text.innerHTML = message;
	popUp.style.display = "block";
	
}