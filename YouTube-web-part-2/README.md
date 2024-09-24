<h1 align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3VkMXk5Z2l2Nmk4cmswNmhuc3AyZnpjdzY4d2QxdTYzemoyMzdubSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13Nc3xlO1kGg3S/giphy.gif" width="30%" alt="logo"/>
  <br/>
  Welcome to my youtube App
  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="5%" alt="waveEmoji"/>
</h1>

<h2 align="center">
   This is a responsive youtube web app built using html, css, bootstrap, javascript and react
    <br/>    <br/> 
</h2>
<br/>

This YouTube React app is a video player application that runs on the web. Its design and functionality are inspired by YouTube, created as a project for the Advanced Systems Programming course in the BIU Computer Science Department.
This branch contains part 2 of the project - make sure you first download the server repository to your computer, and run it before you start working on this.
Here is a link: https://github.com/AlonLivne007/Youtube-web-server.git

Download Instructions:

*first make sure to download the server and run its script to add videos and users.
1. Clone the repository into your IDE from this link into a new folder:  https://github.com/AlonLivne007/Youtube-web-app.git 
2. Open the terminal in your new React project and enter: npm install to add node_modules.
3. Enter in the terminal the command: npm start to open the project in localhost:3000 on the web.
4. Note that you should receive from the server 3 defualt users you can log into, and 20 defualt videos for you to enjoy.
5. Enjoy browsing the project!

The app contains six main pages: Sign In, Sign Up, Home, Watch a Video, Upload a New Video, and a profile page. Each page has functionality, and to experience the full experience, we recommend signing up for the app. You can also upload a photo of yourself!

This is a sample of the different pages, with their functionalities

**Home: **
Search bar. 
interactive opening menus from the avatar and from the left.
watch a video by clicking it.
![image](https://github.com/AlonLivne007/YouTube-project-/assets/120726615/ab2be7ba-94ac-4321-b6c7-e395b866934a)


**Watch a video: **
Like, comment, edit comment and video's title and description.
Logo leads back to home page.
Please notice, editing a video and comments require signing up to the app - token is required for it.
Video is being fetched from the server using a get request.
Comments of the video are being fetched using a get request.
![image](https://github.com/AlonLivne007/YouTube-project-/assets/120726615/c046997b-5fd5-4bdf-aeae-e01af51a959f)
![image](https://github.com/AlonLivne007/YouTube-project-/assets/120726615/0b0373af-6327-4ff4-9fda-9e6fefccbe7b)

Opening menus:
Details of the logged in user are presented.
Navigate to sign in, sign up and upload pages.
Change theme button - takes into account that the user has light mode - if he does not, takes two clicks to chang at first.
Delete user - sends a delete request to the server to delete the current user.
Edit user - opens a menu to edit a user's nickname and avatar. Changes are seen in the profile page.
![image](https://github.com/AlonLivne007/YouTube-project-/assets/120726615/2dbf91d9-ea09-4860-8518-3092b92e528e)

Sign in:
All fields need to be filled.
Username and password are cross referenced from the database of the app's users.
Using a get request we fetch the user.
CurrentUser is being set as the logged user, and stored in local storage.
A token is created in a post request and also being stored in the local storage.
![image](https://github.com/AlonLivne007/YouTube-project-/assets/120726615/57bcc423-f8bc-4a2c-baed-c5e658f1de00)

Sign up:
All fields need to be filled, an avatar is optional - if user did not add, he will receive a defualt avatar - see example in pictures of home page from the right.
Password must be in the required standrat.
All fields must be unique of the user.
Please notice that a defualt user is "logged in" when we are not signed in, with username = "username" and nickname = "nickname" - you can't create a new user with username = "username".
Using a post request we create a new user the is stored in the database.
![image](https://github.com/AlonLivne007/YouTube-project-/assets/120726615/cf00ab2e-ac0c-4141-9dab-02005f71089f)

Upload video: 
All fields are required.
The display picture of the video will be the frame of the video after 5 seconds.
Please notice that uploading a video requires signing up to the app - this page, and the upload button are protected by a token - it is required.
Sends a post request to the server with a new video object.
![image](https://github.com/AlonLivne007/YouTube-project-/assets/120726615/459c5eec-6416-47f9-ab0e-3a9d07f6e060)

Profile page:
Uses a get request to fetch the videos of the user we want to see.
![image](https://github.com/AlonLivne007/YouTube-project-/assets/120726615/d1054031-f9e9-4c0a-abbe-bdf8358dcf9e)




Enjoy! we would love to hear feedback on the project :)
