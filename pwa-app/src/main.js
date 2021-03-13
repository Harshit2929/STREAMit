//import React from 'react';

export default function swDev(){
  const divInstall = document.getElementById('installContainer');
  const butInstall = document.getElementById('butInstall');
  
    
if('serviceWorker' in navigator){
  let swUrl=`${process.env.PUBLIC_URL}/sw.js`;
    window.addEventListener('load',()=>{
    navigator.serviceWorker.register(swUrl)
    .then(reg =>{
        console.log('Registered',reg);
    }).catch(err =>{
        console.log('registeration failed',err);
    });


    });
    //navigator.serviceWorker.register('./sw').then((resp) =>)
}



  function getPWADisplayMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (document.referrer.startsWith('android-app://')) {
      return 'twa';
    } else if (navigator.standalone || isStandalone) {
      return 'standalone';
    }
    return 'browser';
  }
//app install check
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container
  divInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
  console.log('👍', 'butInstall-clicked');
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  const result = await promptEvent.userChoice;
  console.log('👍', 'userChoice', result);
  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;
  // Hide the install button.
  divInstall.classList.toggle('hidden', true);
});
};
//to Track when the display mode changes 

// window.matchMedia('(display-mode: standalone)').addEventListener((evt) => {
//   let displayMode = 'browser';
//   if (evt.matches) {
//     displayMode = 'standalone';
//   }
//   // Log display mode change to analytics
//   console.log('DISPLAY_MODE_CHANGED', displayMode);
// });
// }
 // "screenshots": [
    //   {
    //     "src": "/images/screenshot1.png",
    //     "type": "image/png",
    //     "sizes": "540x720"
    //   },
    //   {
    //     "src": "/images/screenshot2.jpg",
    //     "type": "image/jpg",
    //     "sizes": "540x720"
    //   }
    // ]

    // "shortcuts": [
    //     {
    //       "name": "How's weather today?",
    //       "short_name": "Today",
    //       "description": "View weather information for today",
    //       "url": "/today?source=pwa",
    //       "icons": [{ "src": "/images/today.png", "sizes": "192x192" }]
    //     },
    //     {
    //       "name": "How's weather tomorrow?",
    //       "short_name": "Tomorrow",
    //       "description": "View weather information for tomorrow",
    //       "url": "/tomorrow?source=pwa",
    //       "icons": [{ "src": "/images/tomorrow.png", "sizes": "192x192" }]
    //     }
    //   ]];