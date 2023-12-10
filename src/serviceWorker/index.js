self.addEventListener('install',(e)=>{

    console.error('here in the install');
});

self.addEventListener('activate',(e)=>{
    console.error('in the activation');
})


self.addEventListener('fetch',(e)=>{
    const {url}=e.request
})