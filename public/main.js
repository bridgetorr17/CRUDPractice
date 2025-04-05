const update = document.querySelector('#updateButton');

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