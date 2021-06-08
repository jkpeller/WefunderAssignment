# WefunderAssignment

## Steps to run app

1. git clone git@github.com:jkpeller/WefunderAssignment.git
2. `docker build -t react-node-js .`
3. `docker run -d -p 3000:3000 --name react-node-js-app react-node-js`
4. Open browser and go to http://localhost:3000/
   - NOTE: give app a min or two after 'docker run' command to completely start
5. To upload new Pitch Deck, click 'Add Pitch Deck' button, select pdf file, and click ok.
   - NOTE: large presentations may take 10-20 seconds to finish uploading
7. To view Pitch Decks for Companies, select the "Projects" tab at the top of the page
