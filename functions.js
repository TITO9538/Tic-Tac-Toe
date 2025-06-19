let cellsHtml = document.querySelector("#cells");

function clearCells() {
    cellsHtml.innerHTML = "";
}
function renderCells(array) {
  array.forEach(cell => {
    cellsHtml.innerHTML += `
    <div id="${cell.cellId}"
        class="cells w-[85%] h-[85%] flex items-center justify-center bg-slate-600 inset-shadow-sm inset-shadow-slate-700 rounded-md">
    </div>
    `;
  });
}

function checkSign(arrayId ) {
    
}










export {clearCells, renderCells};