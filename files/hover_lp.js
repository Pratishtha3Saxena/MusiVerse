
const defaultColor = '#eeeeee';

const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.color = '#040A66';
    });

    link.addEventListener('mouseout', () => {
        link.style.color = defaultColor;
    });
});

  
  const buttons = document.querySelectorAll('.save-button');
  buttons.forEach(button => {
    button.addEventListener('click', event => {
        const row = event.target.closest('.transbox');
        const songName = row.querySelector('div:first-child p').textContent.trim();
        const songDuration = row.querySelector('div:last-child p').textContent.trim();
        const a_name="Linkin Park";
        const data={
            song_name:songName,
            duration: songDuration,
            artist: a_name
        };
        console.log(data);
        fetch('http://localhost:8000/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
         },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        });
    });
