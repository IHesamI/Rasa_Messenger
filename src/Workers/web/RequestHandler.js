// import Requests from '../../API/Requests';
export default (e) => {
  self.onmessage = (msg) => {
    let interval;
    if (!msg.data.shoulddead) {
      interval = setInterval(async () => {
        fetch(
          `http://185.60.136.206:8080?` +
            new URLSearchParams({
              active_chat: 0
            }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              Authorization: `${msg.data.token}`
            },
            method: 'GET'
          }
        )
          .then((resp) => resp.json())
          .then((data) => postMessage(data));
      }, 1000);
    }
  };
};
