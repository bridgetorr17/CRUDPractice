const update = document.querySelector('#updateButton');
const remove = document.querySelector('#deleteButton');
const messageDive = document.querySelector('#message');

update.addEventListener('click', () => {
    fetch('/quotes', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Neville Longbottom',
            quote: 'Why is it always me?'
        })
    })
        .then(res => {
            if(res.ok) return res.json();
        })
        .then(response => {
            console.log(response);
            window.location.reload(true);
        })
});

remove.addEventListener('click', () => {
    fetch('/quotes', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Voldemort'
        })
    })
        .then(res => {
            if(res.ok) return res.json();
        })
        .then(data => {
            if(data === 'No quote to delete'){
                messageDive.textContent = 'No quote to delete';
            }
            else window.location.reload();
        });
});