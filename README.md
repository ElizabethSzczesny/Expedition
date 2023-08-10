# THE EXPEDITION An Interactive Story for Children
#### Video Demo:  https://youtu.be/OOAsGlevHm8
#### Description:

This project was created to be an interactive, engaging reading experience for young learners. Effectively creating the experience of having a book being read to them, with additional learning reinforcement.

Relying on vivid visuals and highlighted vocabulary words, those words can then be moved into place over the correct item on the visual depiction. Upon matching the word to the correct place on the image the word is pronounced over the speaker. In addition, the page 'turns.'

To begin this project I first sourced the imagery I was going to use from the 'Heritage Library.' This is an online database of open source visuals that can be used in digital projects. After being inspired as to which story I wanted to tell, I wrote the simple story.

Next, began the coding. Because I chose to use a single HTML attribute id for the word which would be draggable I created 4 different HTML templates. This was a design choice. The idea was to use the HTML template for each page of the story, and change the content for the story in the HTML directly. However, because these were seperate entities I was still able to re-use the attribute id. This allowed me to avoid using a loop in the Javascript. I only had to initialize the variable one time. Then, I created else-if statements to check which page should be read at which time.

Arguably, this could de designed more dynamically. For instance, using one HTML template that is generated dynamically by looping through a series of HTML content adds in the Javascript. 
However, I chose this design because it allowed me to also customize the layout unique to each page with each having it's own particulars in style.css.

By streamlining this process to only have one layout across all the pages, it might have been another improvement worth considering. However, I created a single grid system across all the pages, and placed each pages unique content onto the same grid system. If I had streamlined the imaging process to have the same page placements across all the pages, I could have avoided some of this extra grid-work and manual layout.

By not using a loop in the Javascript I had great control over the features I wanted to implement into each page's text and images. For instance, I was able to create a single drag and drop function which encapsulated finding the right page target, the word being pronounced out loud over the speaker, and the page being turned. In order to do the speech I created a new SpeechSynthesis object in Javascript. This was then initialized with it's in-built array of voices. I then programmed it according to my preferences for tone, speed, etc by accessing the built-in pairs in the SpeechSynthesis object already available.

Other basic Javascript is utilized in my code - DOM manipulation features heavily to create the word dragging and dropping, Event Listeners trigger, the event object passes necessary data, and the window location is used rather than the aforementioned looping through only a single HTML template.





