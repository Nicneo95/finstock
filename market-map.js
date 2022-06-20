let containerDiv = document.querySelector(".treeMap")

// select all the tree chart button
let australiaBtn = document.getElementById("australiaBtn");
let canadaBtn = document.getElementById("canadaBtn");
let irelandBtn = document.getElementById("irelandBtn");
let japanBtn = document.getElementById("japanBtn");
let singaporeBtn = document.getElementById("singaporeBtn");
let unitedkingdomBtn = document.getElementById("unitedkingdomBtn");
let unitedstateBtn = document.getElementById("unitedstateBtn");
let worldBtn = document.getElementById("worldBtn");

// //function when the respective button is click
australiaBtn.addEventListener("click", async function (e) {

    let url = "https://public.tableau.com/views/AustraliaTreemap/AustraliaTreemap?:language=en-US&:display_count=n&:origin=viz_share_link";

    await new tableau.Viz(containerDiv, url)

});
canadaBtn.addEventListener("click", async function (e) {

    let url = "https://public.tableau.com/views/CanadaTreemap/CanadaTreemap?:language=en-US&:display_count=n&:origin=viz_share_link";

    await new tableau.Viz(containerDiv, url)

});
irelandBtn.addEventListener("click", async function (e) {

    let url = "https://public.tableau.com/views/IrelandTreemap/IrelandTreemap?:language=en-US&:display_count=n&:origin=viz_share_link";

    await new tableau.Viz(containerDiv, url)
});
japanBtn.addEventListener("click", async function (e) {

    let url = "https://public.tableau.com/views/JapanTreemap/JapanTreemap?:language=en-US&:display_count=n&:origin=viz_share_link";

    await new tableau.Viz(containerDiv, url)

});
singaporeBtn.addEventListener("click", async function (e) {

    let url = "https://public.tableau.com/views/SingaporeTreemap/SingaporeTreemap?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link";

    await new tableau.Viz(containerDiv, url)
});
unitedkingdomBtn.addEventListener("click", async function (e) {

    let url = "https://public.tableau.com/views/UnitedKingdomTreemap/UnitedKingdomTreemap?:language=en-US&:display_count=n&:origin=viz_share_link";

    await new tableau.Viz(containerDiv, url)

});
unitedstateBtn.addEventListener("click", async function (e) {

    let url = "https://public.tableau.com/views/UnitedStateTreemap/UnitedStateTreemap?:language=en-US&:display_count=n&:origin=viz_share_link";

    await new tableau.Viz(containerDiv, url)

});
worldBtn.addEventListener("click", async function (e) {

    let url = "https://public.tableau.com/views/WorldTreemap/WorldTreemap?:language=en-US&:display_count=n&:origin=viz_share_link";

    await new tableau.Viz(containerDiv, url)

})
