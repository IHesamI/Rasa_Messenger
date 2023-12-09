/**
 * 
 * @param {MessageEvent} e 
 * @returns 
 */
function handleWorkerMessage(e) {
    const action = e.data;
    if (!action.type) return;
  }

function subscribeServiceWorker(){
    navigator.serviceWorker.removeEventListener('message', handleWorkerMessage);
    navigator.serviceWorker.addEventListener('message', handleWorkerMessage);
}