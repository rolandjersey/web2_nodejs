async function fetchData() {
    const response = await fetch('/get_records'); // A /get_records útvonal a nyelv rekordokat kérdezi le
    const data = await response.json();
    populateTable(data);
}

async function createRecordFromForm() {
    const formData = new FormData(document.getElementById('create-form'));
    const orszag = formData.get('orszag');  // Ország mező
    const nyelv = formData.get('nyelv');    // Nyelv mező

    const response = await fetch('/create_record', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orszag, nyelv })  // Küldjük az országot és nyelvet
    });

    if (response.ok) {
        fetchData();
        document.getElementById('create-dialog').close();  // Ablak bezárása sikeres létrehozás után
    }
}

async function updateRecordFromForm() {
    const formData = new FormData(document.getElementById('edit-form'));
    const id = formData.get('id');
    const orszag = formData.get('orszag').trim();  // Ország mező
    const nyelv = formData.get('nyelv').trim();    // Nyelv mező

    // Lekérdezzük az aktuális rekordot
    const currentRecord = await fetch(`/get_record/${id}`).then(res => res.json());

    // Ha a mezők üresek, használjuk az eredeti értékeket
    const updatedOrszag = orszag || currentRecord.orszag;
    const updatedNyelv = nyelv || currentRecord.nyelv;

    const response = await fetch('/update_record', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, orszag: updatedOrszag, nyelv: updatedNyelv })  // Küldjük az ID-t, az új vagy eredeti értékeket
    });

    if (response.ok) {
        fetchData();
        document.getElementById('edit-dialog').close();  // Ablak bezárása sikeres frissítés után
    }
}

function createRecord() {
    document.getElementById('create-dialog').showModal();  // Megnyitjuk a létrehozási ablakot
}

async function editRecord(id) {
    const response = await fetch(`/get_record/${id}`);  // Kérünk egy rekordot az id alapján
    const data = await response.json();

    document.getElementById('orszag').value = data.orszag;  // Beállítjuk az ország mezőt
    document.getElementById('nyelv').value = data.nyelv;    // Beállítjuk a nyelv mezőt
    document.getElementById('id').value = id;  // Beállítjuk az id mezőt

    document.getElementById('edit-dialog').showModal();  // Megnyitjuk a szerkesztési ablakot
}

async function deleteRecord(id) {
    const response = await fetch(`/delete_record/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchData();  // Újratöltjük az adatokat törlés után
    }
}

function populateTable(data) {
    const tableBody = document.getElementById('crud-table-body');
    tableBody.innerHTML = '';  // Kiürítjük a táblázatot

    data.forEach(record => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = record.id;
        row.appendChild(idCell);

        const orszagCell = document.createElement('td');  // Ország megjelenítése
        orszagCell.textContent = record.orszag;
        row.appendChild(orszagCell);

        const nyelvCell = document.createElement('td');  // Nyelv megjelenítése
        nyelvCell.textContent = record.nyelv;
        row.appendChild(nyelvCell);

        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Szerkesztés';
        editButton.onclick = () => editRecord(record.id);
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Törlés';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => deleteRecord(record.id);
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });
}

fetchData();  // Kezdetben lekérdezzük az adatokat és megjelenítjük a táblázatban