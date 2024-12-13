// window.addEventListener('DOMContentLoaded', function () {
//     // Check if there is data in the local storage
//     if (localStorage.getItem('playlistData')) {
//       // Retrieve the playlist data from local storage
//       var playlistData = JSON.parse(localStorage.getItem('playlistData'));
  
//       // Get the playlist table
//       var table = document.getElementById('playlistTable');
  
//       // Loop through the playlist data and add rows to the table
//       playlistData.forEach(function (item) {
//         var newRow = table.insertRow();
//         newRow.innerHTML = `
//           <td>${item.song}</td>
//           <td>${item.duration}</td>
//           <td>${item.album}</td>
//           <td>${item.artist}</td>
//         `;
//       });
//     }
//   });
  
//   function addToPlaylist(song, duration, album, artist) {
//     var playlistData = [];
  
//     // Check if there is existing data in the local storage
//     if (localStorage.getItem('playlistData')) {
//       playlistData = JSON.parse(localStorage.getItem('playlistData'));
//     }
  
//     // Create a new object with the song details
//     var songData = {
//       song: song,
//       duration: duration,
//       album: album,
//       artist: artist,
//     };
  
//     // Push the song data to the playlist data array
//     playlistData.push(songData);
  
//     // Update the local storage with the new playlist data
//     localStorage.setItem('playlistData', JSON.stringify(playlistData));
//   }
// const defaultColor = '#eeeeee';

// const navLinks = document.querySelectorAll('.navbar a');

// navLinks.forEach(link => {
//     link.addEventListener('mouseover', () => {
//         link.style.color = '#040A66';
//     });

//     link.addEventListener('mouseout', () => {
//         link.style.color = defaultColor;
//     });
// });
fetch('http://localhost:8000/api')
  .then(response => response.json())
  .then(data => {
    const table = document.getElementsByClassName("table")[0];
    console.log(data.length);
    const tbody = table.getElementsByTagName("tbody")[0]; // Get the tbody element
    for (let i = 0; i < data.length; i++) {
      console.log(data);
      const row = document.createElement("tr");
      const name = document.createElement("td");
      const artist = document.createElement("td");
      const duration = document.createElement("td");
      const remove = document.createElement("td");
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('bt');
      removeBtn.id = data[i]['id'];
      remove.appendChild(removeBtn);
      name.textContent = data[i]['id'];
      artist.textContent = data[i]['artist'];
      duration.textContent = data[i]['duration'];
      row.appendChild(name);
      row.appendChild(artist);
      row.appendChild(duration);
      row.appendChild(remove);
      tbody.appendChild(row); // Append the row to the tbody element
      console.log(data[i]['id']);

      removeBtn.addEventListener('click', (event) => {
        const rowIndex = event.target.parentElement.parentElement.rowIndex;
        console.log(1);
        table.deleteRow(rowIndex);
        for (let j = rowIndex; j < table.rows.length; j++) {
          table.rows[j].rowIndex = j;
        }

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data[i])
        };

        fetch('http://localhost:8000/api/delete', options)
          .then(response => response.json())
          .then(data => {
            console.log("done");
          });
      });
    }
  })
  .catch(error => {
    console.error(error);
  });
