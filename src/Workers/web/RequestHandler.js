
export function initalSocket(url, io) {
  // socket = io(url);
  self.postMessage({'status':'ok'})
}

export function updateHandler() {}

export default (e) => {
  self.onmessage = (msg) => {
    // importScripts('./manageMessages.js');
    console.error(msg);
    const { type, payload } = msg.data;
    switch (type) {
      case 'init': {
        // const { url, io } = payload;
        console.error('zarp');
        // initalSocket(url, io);
      }
      case 'zarp': {
        break;
      }
    }
  };
};
