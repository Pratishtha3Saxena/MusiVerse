# MusiVerse
```
Our website consists of several webpages linked together with hyperlinks.

The major ones include:
- index.html
- artists.html
- about.html
- spotlight.html
- search.html
- playlist.html

There are also webpages for each of the artists with 5 albums per artist. Clicking on an album redirects the user to an album page with the songs.

The website should first be accessed by opening the index.html file, as it effectively functions as a home page. Here you can see top charts for albums, artists as well as songs.  Clicking on the artists or albums will take you to the corresponding artist or album.

Each artist page has been designed in accordance to their albums and picture. Clicking on an album in an artists page will open up a page showing all the songs of that album.

Apart from access of top albums and artists, you can access other artists through the artists page as well. This can be done using the navigation bar, by clicking on artists.

The navigation bar can also be used to go back home or to the about page from any page.
It also shows on which page the user is on in the right in italics.
Additionally, it has the musiverse site logo on the left side.

The footer also displays the name of the site, a brief description and a link to the about page.

The about page is a standard about page detailing purpose of the site and its creators.

Another file
- index.css
has css for some style specifications used in the index.html (home page), but also common for all pages, hence it has been linked to all pages. Apart from that css within the <style> tag aand inline css has been used.

There is a search page for songs and a spotlight page for the spotlight artist.
On the search page, you can search for the name of any song and it shows you more details about it, a few filters , such as time constraints and children friendly language or not,  are provided to help optimise your search.
On the spotlight page, there is a current artists which has been spotlight. It includes the feature of allowing reviews to be put.
There is also the playlist functionality, which enables users to create, update or delete songs for playlists
Also, next to each song in the song page, there is an add to playlist button. This allows you to directly add to the playlist, which can be accessed using the navbar. On the playlist page a song can be removed using the appropriate button. 

Running the site:
The site must be run by running app.py in the terminal first. This should be kept running, for the playlist page functionality to work. Then open the page by either directly clicking the buttons on the page or putting file path for any one page in a browser. The python is kept running for playlist page, termination of app.py means only parts of the website excluding this will work.