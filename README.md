# STREAMit
A cross-platform app which helps users to run high specification applications on Low Specs Devices, by streaming our application on Client Devices and Processing all it in remote Cloud or local Servers

## The definition of the project that we are working on 
An application that helps users to stream complex applications in their local network, STREAMit primarily uses WebRtc and WebSockets protocol (as a fallback) to transfer streams between multiple devices.

## How are we trying to solve the problem like and our approach 
Generally when one tries to stream a high end application like game on a low spec device ,like heavy games needed a lot of data to be processed at once that requires faster processing CPUs ,which leads to terrible user experience.Our application works similar to SHAREit or Snapdrop  but uses web technologies to eliminate the process of installing native apps for different devices and operating systems,we have a progressive web app which helps  clients to use our product on all platforms or they can even use our electron app for streaming whatever they want.
Suppose wants to play Mario,so user can remotely play that using STREAMit or any cpu extensive application that can be done on client device,can be processed on the local or cloud server.

### The Tech stack used like Django,React,etc
React, node.js (Signalling Server), Electron Desktop/Lite React Server [ Similar to game server ],Socket.io,WebRTC

###### Video of the project and if it is ready completely you can deploy it that can help the judges to evaluate. It can also create a good impression
[Youtube Demo Link](https://www.youtube.com/watch?v=cg7w6DANMp0)



### Development Environment Installation Steps
##### Setup **Signalling server [ Main Server ] [ Standalone ]**
1. ``` npm install ``` inside directory named **SIGNALLING SERVER**
2. ``` node index.js``` to start the **SIGNALLING SERVER**
3. And move to ``` http://localhost:4000 ```

##### Setup Development Environment for **React Client Application** 
1. ``` npm install ``` inside directory named **pwa-app**
2. ``` npm start ``` to start PWA-APP
3. For Development for Web Host ( Peer 1)
    a. Go to ```/recorder``` route of the PWA_APP
4. For Development for Web Client (Peer 2)
    b. Go to ``` /remote ``` route of PWA_APP
5. And move to ``` http://localhost:3000 ```

##### Setup Developmentt Environment for **Electron Desktop Server**  
1. Run below command to install packages
    a. ``` yarn ``` or ``` npm install ```
2. Run below command to start Electron Desktop Server
    b. ``` yarn start ``` or ``` npm start ```
    
### Architectural Design

![image](https://user-images.githubusercontent.com/56792415/111175054-034bf980-85ce-11eb-92b3-457659afce72.png)



##### LinkedIn and GitHub profile url of all the team members 
1. Pushpendra Vishwakarma - [LinkedIn](https://www.linkedin.com/in/pushpendrahpx/) [Github](https://github.com/Pushpendrahpx/)
2. Harshit Chauhan - [LinkedIn](https://www.linkedin.com/in/harshit-chauhan-35a342197/) [Github](https://github.com/Harshit2929/)
3. Sarthak Pandey - [LinkedIn](https://www.linkedin.com/in/sarthak-pandey-b8201b194/?originalSubdomain=in) [Github](https://github.com/sarthakpandey001)
