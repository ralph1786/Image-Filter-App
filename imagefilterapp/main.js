const canvas = document.querySelector("#canvas");
const downloadBtn = document.querySelector("#download-btn");
const uploadFile = document.querySelector("#upload-file");
const revertBtn = document.querySelector("#revert-btn");
const ctx = canvas.getContext("2d");

let img = new Image();
let filename = "";

//Upload file image.
uploadFile.addEventListener('change', (e) => {
    //Grab file
    const file = document.querySelector("#upload-file").files[0];
    //Initialize fileReader
    const reader = new FileReader();
    if(file) {
        //Set file name
        fileName = file.name;
        //read data as url
        reader.readAsDataURL(file);
    }
    //Add image to canvas
    reader.addEventListener("load", () => {
        //Create image
        img = new Image();
        //Set source
        img.src = reader.result;
        //When image loads, add to canvas
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.removeAttribute("data-caman-id");
        }
    }, false);
});

//Add Filters and Effects
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {//checks to see if clicked element has the filter-btn class.
        if (e.target.classList.contains("brightness-add")){//then it checks to see if it has the brightness-add class.
            //If everything passes then following code provided by CamanJs is executed.
            Caman("#canvas", img, function(){
                this.brightness(5).render();
            });
        } else if (e.target.classList.contains("brightness-remove")){
            Caman("#canvas", img, function () {
                this.brightness(-5).render();
            });
        } else if (e.target.classList.contains("contrast-add")) {
            Caman("#canvas", img, function () {
                this.contrast(5).render();
            });
        } else if (e.target.classList.contains("contrast-remove")) {
            Caman("#canvas", img, function () {
                this.contrast(-5).render();
            });
        } else if (e.target.classList.contains("saturation-add")) {
            Caman("#canvas", img, function () {
                this.saturation(5).render();
            });
        } else if (e.target.classList.contains("saturation-remove")) {
            Caman("#canvas", img, function () {
                this.saturation(-5).render();
            });
        } else if (e.target.classList.contains("stackBlur-add")) {
            Caman("#canvas", img, function () {
                this.stackBlur(5).render();
            });
        } else if (e.target.classList.contains("stackBlur-remove")) {
            Caman("#canvas", img, function () {
                this.stackBlur(-5).render();
            });
        } 
            // Start of Effects section
          else if (e.target.classList.contains("vintage-add")) {
            Caman("#canvas", img, function () {
                this.vintage().render();
            });
        } else if (e.target.classList.contains("hemingway-add")) {
            Caman("#canvas", img, function () {
                this.hemingway().render();
            });
        } else if (e.target.classList.contains("clarity-add")) {
            Caman("#canvas", img, function () {
                this.clarity().render();
            });
        } else if (e.target.classList.contains("sincity-add")) {
            Caman("#canvas", img, function () {
                this.sinCity().render();
            });
        } else if (e.target.classList.contains("grungy-add")) {
            Caman("#canvas", img, function () {
                this.grungy().render();
            });
        } else if (e.target.classList.contains("pinhole-add")) {
            Caman("#canvas", img, function () {
                this.pinhole().render();
            });
        } else if (e.target.classList.contains("nostalgia-add")) {
            Caman("#canvas", img, function () {
                this.nostalgia().render();
            });
        } else if (e.target.classList.contains("hermajesty-add")) {
            Caman("#canvas", img, function () {
                this.herMajesty().render();
            });
        }
    }
});

//Remove filters
revertBtn.addEventListener("click", (e) => {
    Caman("#canvas", img, function(){
        this.revert();
    });
});

//Download Eventhandler
downloadBtn.addEventListener("click", (e) => {
    //Get file extension
    const fileExtension= fileName.slice(-4);
    //Initialize new filename
    let newFileName;
    //Check image type
    if (fileExtension === '.jpg' || fileExtension === ".png"){
        newFileName = fileName.substring(0, fileName.length - 4) + '-edited.jpg'
    }
    //Call download
    download(canvas, newFileName);
});

//Download function
function download(canvas, filename) {
    //Initialize event
    let e;
    //Create link
    const link = document.createElement("a");
    //Set props
    link.download = filename;
    link.href = canvas.toDataURL('image/jpeg', 0.8);
    //New Mouse event
    e = new MouseEvent("click");
    //Dispatch event
    link.dispatchEvent(e);
}
