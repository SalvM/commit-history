# The goal
This test assignment aims to create and deploy an application that shows the git
commit history of the master (main) branch of the repository where the code is located.

In order to display commits, the application should receive a Personal Access Key. We will address it by adding an input field that will ask the user to insert the Key for the first time. After a page refresh, the key must remain stored in the browser.
Once the list of commits is displayed, let’s add more interactivity to it. The application should have a “Refresh” button, which will re-fetch and render the list of commits.

Finally, as an extra kick to the application, we might want to add a countdown (30 seconds) which will be displayed next to the button and refresh the list of commits automatically. When the list of commits is received, the countdown starts over.