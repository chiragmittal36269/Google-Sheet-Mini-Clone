const tableHeadRow = document.getElementById("table-head-row");

const tableBody = document.getElementById("table-body");

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
const upperCaseButton = document.getElementById("upperCase-button");
const lowerCaseButton = document.getElementById("lowerCase-button");
const capitalizeButton = document.getElementById("capitalize-button");
const downloadButton = document.getElementById("download-button");
const uploadJsonFile = document.getElementById("jsonFile");
const addSheetButton = document.getElementById("add-sheet-button");
const buttonContainer = document.getElementById("button-container");
const sheetNo = document.getElementById("sheet-no");

// let cutCopyCell = {};
// if we do cutCopyCell to empty object then it is difficult to write if condition statement so
let cutCopyCell = null;

let numSheets = 1;
let currentSheetNum = 1;

let lastClickButton; // its value is lies between cut and copy.

let currentCell;
const columns = 26;
const rows = 100;

// create the 2D matrix to store the table data and make it easy to download it.
//forming of outer array
let matrix = new Array(rows); // creating an empty array of rows
// console.log(matrix);
for (let i = 0; i < rows; i++) {
    //forming the inner array
    matrix[i] = new Array(columns); // creating an empty array of columns in a row
    //putting the empty object in the inner arrays or each cell of array
    for (let j = 0; j < columns; j++) {
        // matrix[i][j] = `${i}${j}`;
        matrix[i][j] = {}; // putting an empty object
    }
}
// console.log(matrix);

// making 1st row in table of A B C D
for (let i = 0; i < columns; i++) {
    // first row in table having th tags so we create th tag
    let th = document.createElement("th");
    // console.log(String.fromCharCode(i + 65));
    th.innerText = String.fromCharCode(i + 65);

    tableHeadRow.appendChild(th);
}

// making the remaining table body
for (let i = 1; i <= rows; i++) {
    let tr = document.createElement("tr");

    // here we create the 1st column in table which contains 1 2 3 4
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

        // contentEditable is used so that we can able to edit the content of table byDefault it is false
        td.setAttribute("contentEditable", "true");

        // give the id to each cell like A1 B1 C1 A2 B2 C2
        td.setAttribute("id", `${String.fromCharCode(j + 65)}${i}`);

        //this event revolves around the focus on a cell
        td.addEventListener("focus", (event) => {
            onFocusFn(event);
        });

        //this event revolves around the input in a cell
        td.addEventListener("input", (event) => {
            onInputFn(event);
        });

        tr.appendChild(td);
    }

    tableBody.appendChild(tr);
}

//onInputFn helps me to add the data in the matrix from the table.
function onInputFn(event) {
    // console.log(event.target.innerText);
    // event.target.innerText === event.target.style.cssText
    updateMatrix(event.target);
}

function updateMatrix(currentCell) {
    let tempObj = {
        style: currentCell.style.cssText,
        text: currentCell.innerText,
        id: currentCell.id,
    };
    // console.log(tempObj);

    let j = currentCell.id.charCodeAt(0) - 65;
    // currentCell.id will give me the id of that current cell which we are pointing.
    // .charCodeAt(0) will give me the integer value of that respected character
    // -65 if for zeroth indexing
    // example:- A2 => A => 65
    let i = currentCell.id.substring(1) - 1;
    // substring(1) will give me the remaining character including 1st character.
    // -1 is for zeroth indexing so that we can insert the data directly in the Matrix because Matrix is zero based.
    // example:- A2 => 2

    matrix[i][j] = tempObj;

    // console.log(matrix);
}

function onFocusFn(event) {
    // console.log(event);
    currentCell = event.target; // it targets that cell which I am currently focused

    document.getElementById("current-cell").innerText = event.target.id; // here i am putting the id of the cell which I am currently focused and put it in the no selected cell present before the "A" cell

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

    if (currentCell.style.textTransform === "uppercase") {
        upperCaseButton.style.backgroundColor = "grey";
    } else {
        upperCaseButton.style.backgroundColor = "transparent";
    }

    if (currentCell.style.textTransform === "lowercase") {
        lowerCaseButton.style.backgroundColor = "grey";
    } else {
        lowerCaseButton.style.backgroundColor = "transparent";
    }

    if (currentCell.style.textTransform === "capitalized") {
        capitalizeButton.style.backgroundColor = "grey";
    } else {
        capitalizeButton.style.backgroundColor = "transparent";
    }
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

    // latest style to be in the matrix
    updateMatrix(currentCell);
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

    // latest style to be in the matrix
    updateMatrix(currentCell);
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

    // latest style to be in the matrix
    updateMatrix(currentCell);
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

    // latest style to be in the matrix
    updateMatrix(currentCell);
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

    // latest style to be in the matrix
    updateMatrix(currentCell);
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

    // latest style to be in the matrix
    updateMatrix(currentCell);
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
    // console.log(event.target);
    // console.log(fontSizeDropdown);
    currentCell.style.fontSize = fontSizeDropdown.value;
    //whatever option tag is selected by the end user the value will store in the select tag with value attribute

    // latest style to be in the matrix
    updateMatrix(currentCell);
});

fontStyleDropdown.addEventListener("change", (event) => {
    // currentCell.style.fontFamily = event.target.value;
    currentCell.style.fontFamily = fontStyleDropdown.value;

    // latest style to be in the matrix
    updateMatrix(currentCell);
});

// in case of input tags change and input both works but input tag creates the performance issue so we prefer change instead of input tag
// performance issue is like :- when we want to change the color then we hover on colors to pick the most accurate one then when we hover on multiple colors then it will also change the color so it will be a bulky thing.
bgColorInput.addEventListener("change", (event) => {
    // currentCell.style.backgroundColor = event.target.value;
    currentCell.style.backgroundColor = bgColorInput.value;

    // latest style to be in the matrix
    updateMatrix(currentCell);
});

textColorInput.addEventListener("input", (event) => {
    // currentCell.style.color = event.target.value;
    currentCell.style.color = textColorInput.value;

    // latest style to be in the matrix
    updateMatrix(currentCell);
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

    // latest style to be in the matrix
    updateMatrix(currentCell);
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

    // in case of copy updateMatrix is not required because we are not changing the table content we are just copy that content.
});

pasteButton.addEventListener("click", (event) => {
    currentCell.innerText = cutCopyCell.text;
    currentCell.style.cssText = cutCopyCell.style;

    // in case of cut when we paste the data then it will delete from the clipboard history so we are doing this manually
    if (lastClickButton == "cut") {
        cutCopyCell = null;
    }

    // latest style to be in the matrix
    updateMatrix(currentCell);
});

upperCaseButton.addEventListener("click", (event) => {
    // console.log(currentCell.style);
    if (currentCell.style.textTransform === "UPPERCASE") {
        currentCell.style.textTransform = "none";
        upperCaseButton.style.backgroundColor = "transparent";
    } else {
        currentCell.style.textTransform = "UPPERCASE";
        upperCaseButton.style.backgroundColor = "grey";
        lowerCaseButton.style.backgroundColor = "transparent";
        capitalizeButton.style.backgroundColor = "transparent";
    }

    // latest style to be in the matrix
    updateMatrix(currentCell);
});

lowerCaseButton.addEventListener("click", (event) => {
    if (currentCell.style.textTransform === "lowercase") {
        currentCell.style.textTransform = "none";
        lowerCaseButton.style.backgroundColor = "transparent";
    } else {
        currentCell.style.textTransform = "lowercase";
        lowerCaseButton.style.backgroundColor = "grey";
        upperCaseButton.style.backgroundColor = "transparent";
        capitalizeButton.style.backgroundColor = "transparent";
    }

    // latest style to be in the matrix
    updateMatrix(currentCell);
});

capitalizeButton.addEventListener("click", (event) => {
    if (currentCell.style.textTransform === "capitalize") {
        currentCell.style.textTransform = "none";
        capitalizeButton.style.backgroundColor = "transparent";
    } else {
        currentCell.style.textTransform = "capitalize";
        capitalizeButton.style.backgroundColor = "grey";
        upperCaseButton.style.backgroundColor = "transparent";
        lowerCaseButton.style.backgroundColor = "transparent";
    }

    // latest style to be in the matrix
    updateMatrix(currentCell);
});

//////////////////////////////////////////////////////////////
// download functioning

downloadButton.addEventListener("click", (event) => {
    downloadJSON(event);
});

function downloadJSON(event) {
    //2D matrix into string
    const matrixString = JSON.stringify(matrix);
    // matrixString is the string version of matrix.

    //text form of matrix  -> piece of memory (downloadable)
    // blob => Blob is a class which basically taking data and convert this data in the file interface/format.
    //application/json => format of json
    const blob = new Blob([matrixString], { type: "application/json" });

    // static link will have fixed href
    // dynamic link will have variable href

    //link created -> attach href and download
    // click link
    // delete link

    const link = document.createElement("a");
    // below line will convert the piece of memory to downloadable link
    //link created -> attach href
    link.href = URL.createObjectURL(blob);
    // we want to download the table so we need to add download in the link otherwise it will open in a new tab
    link.download = "table.json";
    //add link to body
    document.body.appendChild(link);
    //click link
    link.click();
    //delete link
    document.body.removeChild(link);
}

/////////////////////////////////////////////////////////////
// upload functioning

// input and change they both will work same in this scenario
uploadJsonFile.addEventListener("change", uploadJSONFileFn);

function uploadJSONFileFn(event) {
    const file = event.target.files[0];
    // event.target.files is having the information of the files which we choose to open
    if (file) {
        // file reader read the external files
        // it is doing the opposite work
        const reader = new FileReader(file);
        // readAsText is to activate the reader
        reader.readAsText(file);

        //trigger the reader? => use .readAsText method to trigger the reader

        //default operations
        // .onload method is having default function/operations that will get triggered after we call .readAsText
        //.onload is internal method which is internally executed.
        // example: - looks like this
        // 	function readAsText(file) {
        // 		onload();
        // 	}

        // we change the onload function
        reader.onload = function (e) {
            const fileContent = e.target.result;
            //e.target.result is having the data on the file which we fetch

            //uploading JSON file -> matrix -> table

            try {
                //updating my matrix by converting the json file into object one.
                matrix = JSON.parse(fileContent);

                // iterate over the matrix so that I can fill the matrix data in the table
                matrix.forEach((row) => {
                    // here we are having row as the 1st element and we are accessing the 1st element in a row as a cell
                    row.forEach((cell) => {
                        // now i have id, innerText, cssText
                        if (cell.id) {
                            let cellToBeEdited = document.getElementById(
                                cell.id
                            );
                            cellToBeEdited.innerText = cell.Text;
                            cellToBeEdited.style.cssText = cell.style;
                        }
                        // else empty object do nothing
                    });
                });
            } catch {
                console.log(err);
            }
        };
    }
}

addSheetButton.addEventListener("click", () => {
    const btn = document.createElement("button");
    numSheets++;
    currentSheetNum = numSheets;
    btn.innerText = `Sheet ${numSheets}`;
    btn.setAttribute("id", `sheet-${numSheets}`);
    btn.setAttribute("onclick", "viewSheet(event)");
    // we also do this btn.id = `sheet-${numSheets}`;
    buttonContainer.appendChild(btn);

    if (localStorage.getItem("arrMatrix")) {
        var oldMatrixArr = localStorage.getItem("arrMatrix");
        // oldMatrixArr is a string so we need to convert it

        // here we are spread the oldMatrixArr in newMatrixArr
        // using spread operator it will create a new matrix which is different from the old one.
        // like the storage point is different for both of the matrix.
        // and then we also add the matrix which was currently created
        // because we move from one sheet to another so we need to save the current sheet data which was present in the matrix
        var newMatrixArr = [...JSON.parse(oldMatrixArr), matrix];
        //oldMatrixArr = [1,2,3]
        // newMatrixArr = [...oldMatrixArr];

        localStorage.setItem("arrMatrix", JSON.stringify(newMatrixArr));
    } else {
        let tempMatrixArr = [matrix];
        localStorage.setItem("arrMatrix", JSON.stringify(tempMatrixArr));
    }

    // cleanup the virtual memory i.e. table so that old data is not placed in the memory of new table
    // it is important because we only have one variable called matrix and if we are not deleting the data of matrix then it also visible on next page
    // example:
    // => on sheet 1 enter something on different locations
    // => on sheet 2 enter something on different locations
    // => on sheet 3 enter something on different locations
    // and then when we move from one sheet to another then it shows all the data
    for (let i = 0; i < rows; i++) {
        matrix[i] = new Array(columns);
        for (let j = 0; j < columns; j++) {
            matrix[i][j] = {};
        }
    }

    sheetNo.innerText = "Sheet No => " + currentSheetNum;
    tableBody.innerHTML = "";

    tableBodyCreation();
});

function tableBodyCreation() {
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

            //this event revolves around the focus on a cell
            td.addEventListener("focus", (event) => {
                onFocusFn(event);
            });

            //this event revolves around the input on a cell
            td.addEventListener("input", (event) => {
                onInputFn(event);
            });

            tr.appendChild(td);
        }

        tableBody.appendChild(tr);
    }
}

function viewSheet(event) {
    let id = event.target.id.split("-")[1];
    var matrixArr = JSON.parse(localStorage.getItem("arrMatrix"));
    // here we have multiple array in an array and we want a specific array according to the sheet number and we know array are zero based and sheet number is starting from 1 so we subtract by 1.
    matrix = matrixArr[id - 1];

    tableBody.innerHTML = "";

    // when i create new sheet then the functions is not working so I am tring to create something which helps it
    // if (matrix === undefined) {
    //     matrix = new Array(rows);
    //     for (let i = 0; i < rows; i++) {
    //         matrix[i] = new Array(columns);
    //         for (let j = 0; j < columns; j++) {
    //             matrix[i][j] = {};
    //         }
    //     }
    // }

    tableBodyCreation();
    // during tableBodyCreation function call it will create a matrix but we already update the value of matrix in the viewSheet function so we using that value to show the data on the page

    // if (matrix === null || matrix === undefined) {
    //     console.log("error");
    //     return;
    // }
    if (matrix !== undefined) {
        matrix.forEach((row) => {
            // here we are having row as the 1st element and we are accessing the 1st element in a row as a cell
            row.forEach((cell) => {
                // now i have id, innerText, cssText
                if (cell.id) {
                    let cellToBeEdited = document.getElementById(cell.id);
                    cellToBeEdited.innerText = cell.text;
                    cellToBeEdited.style.cssText = cell.style;
                }
            });
        });
    }

    // console.log(event.target);
    let number = event.target.id.split("-")[1];
    // console.log(number);
    // sheetNo.innerText = "Sheet No => " + currentSheetNum;
    sheetNo.innerText = "Sheet No => " + number;
}

window.onunload = () => {
    // Clear the local storage
    localStorage.clear();
};
