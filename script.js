const tableHeadRow = document.getElementById("table-head-row");

const tableBody = document.getElementById("table-body");

let currentCell;

const boldButton = document.getElementById("bold-button");
const italicButton = document.getElementById("italic-button");
const underlineButton = document.getElementById("underline-button");
const leftAlignButton = document.getElementById("left-align-button");
const rightAlignButton = document.getElementById("right-align-button");
const centerAlignButton = document.getElementById("center-align-button");
// const justifyAlignButton = document.getElementById("justify-align-button");
const fontSizeDropdown = document.getElementById("font-size");
const fontStyleDropdown = document.getElementById("font-style");
const bgColorInput = document.getElementById("bg-color");
const textColorInput = document.getElementById("text-color");
const cutButton = document.getElementById("cut-button");
const copyButton = document.getElementById("copy-button");
const pasteButton = document.getElementById("paste-button");
let cutCopyCell = {};
let lastClickButton; // its value is lies between cut and copy.

const columns = 26;
const rows = 100;

for (let i = 0; i < columns; i++) {
	let th = document.createElement("th");
	th.innerText = String.fromCharCode(i + 65);

	tableHeadRow.appendChild(th);
}

for (let i = 1; i <= rows; i++) {
	let tr = document.createElement("tr");

	let th = document.createElement("th");
	th.innerText = i;

	tr.appendChild(th);

	for (let j = 0; j < columns; j++) {
		let td = document.createElement("td");

		// td.className = `${i}${String.fromCharCode(j + 65)}`;
		// td.addEventListener("click", (event) => {
		// 	console.log(event);
		// 	console.log(event.target);
		// 	console.log(event.target.innerHTML);
		// 	onFocusFn(event);
		// 	console.log(event.target.className);
		// 	console.log(td.className);
		// });

		td.setAttribute("contentEditable", "true");
		td.setAttribute("id", `${String.fromCharCode(j + 65)}${i}`);
		td.addEventListener("focus", (event) => {
			onFocusFn(event);
		});

		tr.appendChild(td);
	}

	tableBody.appendChild(tr);
}

function onFocusFn(event) {
	// console.log(event);
	currentCell = event.target;
	document.getElementById("current-cell").innerText = event.target.id; // here i am putting the id in the blank space before A cell
	// currentCell.style.backgroundColor = "lightgrey";

	buttonColors();
}

function buttonColors() {
	if (currentCell.style.fontWeight === "bold") {
		boldButton.style.backgroundColor = "grey";
	} else {
		boldButton.style.backgroundColor = "transparent";
	}

	if (currentCell.style.fontStyle === "italic") {
		italicButton.style.backgroundColor = "grey";
	} else {
		italicButton.style.backgroundColor = "transparent";
	}

	if (currentCell.style.textDecoration === "underline") {
		underlineButton.style.backgroundColor = "grey";
	} else {
		underlineButton.style.backgroundColor = "transparent";
	}

	if (currentCell.style.textAlign === "left") {
		leftAlignButton.style.backgroundColor = "grey";
	} else {
		leftAlignButton.style.backgroundColor = "transparent";
	}

	if (currentCell.style.textAlign === "center") {
		centerAlignButton.style.backgroundColor = "grey";
	} else {
		centerAlignButton.style.backgroundColor = "transparent";
	}

	if (currentCell.style.textAlign === "right") {
		rightAlignButton.style.backgroundColor = "grey";
	} else {
		rightAlignButton.style.backgroundColor = "transparent";
	}

	// if (currentCell.style.textAlign === "justify") {
	// 	justifyAlignButton.style.backgroundColor = "grey";
	// } else {
	// 	justifyAlignButton.style.backgroundColor = "transparent";
	// }
}

boldButton.addEventListener("click", (event) => {
	// currentCell.style.backgroundColor = "lightblue";

	if (currentCell.style.fontWeight === "bold") {
		currentCell.style.fontWeight = "normal";
		boldButton.style.backgroundColor = "transparent";
	} else {
		currentCell.style.fontWeight = "bold";
		boldButton.style.backgroundColor = "grey";
	}

	// currentCell.style.fontWeight =
	// 	currentCell.style.fontWeight === "bold" ? "normal" : "bold";
});

italicButton.addEventListener("click", (event) => {
	// currentCell.style.backgroundColor = "pink";

	if (currentCell.style.fontStyle === "italic") {
		currentCell.style.fontStyle = "normal";
		italicButton.style.backgroundColor = "transparent";
	} else {
		currentCell.style.fontStyle = "italic";
		italicButton.style.backgroundColor = "grey";
	}

	// currentCell.style.fontStyle =
	// 	currentCell.style.fontStyle === "italic" ? "normal" : "italic";
});

underlineButton.addEventListener("click", (event) => {
	// currentCell.style.backgroundColor = "yellow";

	if (currentCell.style.textDecoration === "underline") {
		currentCell.style.textDecoration = "none";
		underlineButton.style.backgroundColor = "transparent";
	} else {
		currentCell.style.textDecoration = "underline";
		underlineButton.style.backgroundColor = "grey";
	}

	// currentCell.style.textDecoration =
	// 	currentCell.style.textDecoration === "underline" ? "none" : "underline";
});

leftAlignButton.addEventListener("click", (event) => {
	if (currentCell.style.textAlign === "left") {
		currentCell.style.textAlign = "initial";
		leftAlignButton.style.backgroundColor = "transparent";
	} else {
		currentCell.style.textAlign = "left";
		leftAlignButton.style.backgroundColor = "grey";
		centerAlignButton.style.backgroundColor = "transparent";
		rightAlignButton.style.backgroundColor = "transparent";
		justifyAlignButton.style.backgroundColor = "transparent";
	}
});

centerAlignButton.addEventListener("click", (event) => {
	if (currentCell.style.textAlign === "center") {
		currentCell.style.textAlign = "initial";
		centerAlignButton.style.backgroundColor = "transparent";
	} else {
		currentCell.style.textAlign = "center";
		centerAlignButton.style.backgroundColor = "grey";
		leftAlignButton.style.backgroundColor = "transparent";
		rightAlignButton.style.backgroundColor = "transparent";
		justifyAlignButton.style.backgroundColor = "transparent";
	}
});

rightAlignButton.addEventListener("click", (event) => {
	if (currentCell.style.textAlign === "right") {
		currentCell.style.textAlign = "initial";
		rightAlignButton.style.backgroundColor = "transparent";
	} else {
		currentCell.style.textAlign = "right";
		rightAlignButton.style.backgroundColor = "grey";
		centerAlignButton.style.backgroundColor = "transparent";
		leftAlignButton.style.backgroundColor = "transparent";
		justifyAlignButton.style.backgroundColor = "transparent";
	}
});

// justifyAlignButton.addEventListener("click", (event) => {
// 	if (currentCell.style.textAlign === "justify") {
// 		currentCell.style.textAlign = "initial";
// 		justifyAlignButton.style.backgroundColor = "transparent";
// 	} else {
// 		currentCell.style.textAlign = "justify";
// 		justifyAlignButton.style.backgroundColor = "grey";
// 	}
// });

fontSizeDropdown.addEventListener("change", (event) => {
	// currentCell.style.fontSize = event.target.value;
	// both are same
	currentCell.style.fontSize = fontSizeDropdown.value;
	//whatever option tag is selected by the end user the value will store in the select tag with value attribute
});

fontStyleDropdown.addEventListener("change", (event) => {
	// currentCell.style.fontFamily = event.target.value;
	currentCell.style.fontFamily = fontStyleDropdown.value;
});

// in case of input tags change and input both works but input tag creates the performance issue so we prefer change instead of input tag
// performance issue is like :- when we want to change the color then we hover on colors to pick the most accurate one then when we hover on multiple colors then it will also change the color so it will be a bulky thing.
bgColorInput.addEventListener("change", (event) => {
	// currentCell.style.backgroundColor = event.target.value;
	currentCell.style.backgroundColor = bgColorInput.value;
});

textColorInput.addEventListener("input", (event) => {
	// currentCell.style.color = event.target.value;
	currentCell.style.color = textColorInput.value;
});

cutButton.addEventListener("click", (event) => {
	// here event is pointing out to the cutButton tag so not be use the event argument.
	// store the currentCell in the global variable(cutCopyCell) so that we can paste it on some other place

	cutCopyCell = {
		style: currentCell.style.cssText,
		text: currentCell.innerText,
	};
	// we can also do the above code in this way
	// cutCopyCell.style = currentCell.style.cssText;
	// cutCopyCell.innerText = currentCell.innerText;

	// here we no need to copy the whole css so that is the reason we only copy the cssText which is provided by the user.

	//because we cut the data so the data will be cut from the currentCell that is the reason I use ("") to clean the text as well as the style.
	// here we can also do currentCell.style = null;
	// it will also work but we only need to delete the cssText which was provided by the use so we are doing that thing only
	currentCell.style.cssText = "";
	currentCell.innerText = "";
	lastClickButton = "cut";

	console.log(cutCopyCell);
});

copyButton.addEventListener("click", (event) => {
	// here event is pointing out to the copyButton tag so not be use the event argument.
	// store the currentCell in the global variable(cutCopyCell) so that we can paste it on some other place

	cutCopyCell = {
		style: currentCell.style.cssText,
		text: currentCell.innerText,
	};
	// we can also do the above code in this way
	// cutCopyCell.style = currentCell.style.cssText;
	// cutCopyCell.innerText = currentCell.innerText;

	// here we no need to copy the whole css so that is the reason we only copy the cssText which is provided by the user.

	lastClickButton = "copy";

	console.log(cutCopyCell);
});

pasteButton.addEventListener("click", (event) => {
	currentCell.innerText = cutCopyCell.text;
	currentCell.style.cssText = cutCopyCell.style;

	// in case of cut when we paste the data then it will delete from the clipboard history so we are doing this manually
	if (lastClickButton == "cut") {
		cutCopyCell = {};
	}
});
