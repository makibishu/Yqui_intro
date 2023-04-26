initialize();
function initialize() {
    chrome.storage.local.get(
        ['query', 'border', 'dateStart', 'dateEnd', 'sortType', 'mode']
    ).then((locals) => {
            document.getElementById('query').value = locals.query;
            document.getElementById('border').value = locals.border;
            document.getElementById('dateStart').value = locals.dateStart;
            document.getElementById('dateEnd').value = locals.dateEnd;

            for (let elm of document.getElementsByName('sortType')) {
                if (elm.value === locals.sortType) {
                    elm.checked = true;
                }
            }

            for (let elm of document.getElementsByName('mode')) {
                if (elm.id === locals.mode) {
                    elm.checked = true;
                }
            }

            document.getElementById('saveButton').onclick = save;
        }
    )
}

function save(){
    const query = document.getElementById('query').value;
    const border = document.getElementById('border').value;
    const dateStart = document.getElementById('dateStart').value
    const dateEnd = document.getElementById('dateEnd').value

    let sortType;
    for(let elm of document.getElementsByName('sortType')){
        if (elm.checked){
            sortType = elm.value
        }
    }

    const mode =
        document.getElementById('intro').checked ? 'intro':'rantro'

    chrome.storage.local.set({
        query: query,
        border: border,
        dateStart: dateStart,
        dateEnd: dateEnd,
        sortType: sortType,
        mode: mode
    })
}
