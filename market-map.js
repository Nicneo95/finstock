This is to display tableau chart
console.log("I am here");
let containerDiv = document.querySelector(".chart");
let url = "https://public.tableau.com/views/UnitedStateTreemap/UnitedStateTreemap?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link";
let options = {
    hideTabs: true,
}
function activateVisual(){
    let viz = new tableau.Viz(containerDiv, url, options);
}
document.addEventListener("DOMContentLoaded", activateVisual());