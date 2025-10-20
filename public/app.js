const base = '';

async function fetchList() {
  const res = await fetch(`${base}/musicians`);
  const list = await res.json();
  const ul = document.getElementById('musicians');
  ul.innerHTML = '';
  list.forEach(m => {
    const li = document.createElement('li');
    const info = document.createElement('div');
    info.innerHTML = `<strong>${escapeHtml(m.name)}</strong> <small>${escapeHtml(m.instrument)}</small>`;

    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '8px';

    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    edit.addEventListener('click', () => startEdit(li, m));

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.addEventListener('click', () => deleteMusician(m.id));

    actions.appendChild(edit);
    actions.appendChild(del);

    li.appendChild(info);
    li.appendChild(actions);
    ul.appendChild(li);
  });
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]));
}

async function addMusician(ev){
  ev.preventDefault();
  const f = ev.target;
  const data = { name: f.name.value.trim(), instrument: f.instrument.value.trim() };
  const message = document.getElementById('message');
  try{
    const res = await fetch(`${base}/musicians`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!res.ok) throw new Error((await res.json()).error || 'Failed');
    message.textContent = 'Added';
    f.reset();
    await fetchList();
  }catch(err){
    message.textContent = err.message || 'Error';
  }
}

async function deleteMusician(id){
  const message = document.getElementById('message');
  try{
    const res = await fetch(`${base}/musicians/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error((await res.json()).error || 'Failed');
    message.textContent = 'Deleted';
    await fetchList();
  }catch(err){
    message.textContent = err.message || 'Error';
  }
}

function startEdit(listItem, musician){
  // create inline form
  listItem.innerHTML = '';
  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.gap = '8px';

  const nameInput = document.createElement('input');
  nameInput.value = musician.name;
  nameInput.required = true;

  const instrInput = document.createElement('input');
  instrInput.value = musician.instrument;
  instrInput.required = true;

  const save = document.createElement('button');
  save.type = 'submit';
  save.textContent = 'Save';

  const cancel = document.createElement('button');
  cancel.type = 'button';
  cancel.textContent = 'Cancel';
  cancel.addEventListener('click', fetchList);

  form.appendChild(nameInput);
  form.appendChild(instrInput);
  form.appendChild(save);
  form.appendChild(cancel);

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const payload = { name: nameInput.value.trim(), instrument: instrInput.value.trim() };
    const message = document.getElementById('message');
    try{
      const res = await fetch(`${base}/musicians/${musician.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to save');
      message.textContent = 'Updated';
      await fetchList();
    }catch(err){
      message.textContent = err.message || 'Error';
    }
  });

  listItem.appendChild(form);
}

document.getElementById('addForm').addEventListener('submit', addMusician);
fetchList();
