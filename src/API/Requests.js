import { TYPE_GROUP } from '../utility/Constants';
import API from './API';
import { BASE_URL, HEADER } from './consts';
// import { useSelector } from 'react-redux';

export default function Requests(body) {
  // const token = useSelector((state) => state.profile.jwt);
  // console.log(JSON.parse(localStorage.getItem('persist:profile')).jwt);
  console.log();
  const AutorizeHeader = {
    ...HEADER,
    Authorization: `${localStorage.getItem('token')}`
  };
  // Register
  // check Duplicate Email - GET

  async function checkDuplicateEmail(email) {
    try {
      console.log('Sending request to check duplicate email...');

      const requestData = {
        email // Use the email value from state
      };

      const res = await API().GET('access/signup', requestData, HEADER);
      if (res.data === 'fail') {
        return false;
      }
      return true;
    } catch (err) {
      console.log(err);
    }
  }

  // Sign Up - POST
  async function Register(body) {
    try {
      // console.log('Sending request to sign up...');
      const res = await API().POST('access/signup', body, HEADER);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  // Login - POST
  async function Login(body) {
    console.log(body);
    try {
      // console.log('Sending request to login...');
      const res = await API().POST('access/login', body, HEADER);
      localStorage.setItem('token', res.data.jwt);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  // eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJpZCI6MTAwMCwiZXhwIjoxNjkyMTY0NDM4fQ.wbxoM2ylQRZwFGNnh8-qI3XLya9z4bgDxlNkHQsSJHM\""
  // profileData

  async function GetChat(receiverID, params) {
    console.log(receiverID);
    try {
      const res = await API().GET(receiverID, params, AutorizeHeader);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  async function UpdateChat(receiveID) {
    try {
      const res = await API().GET(receiveID, {}, AutorizeHeader);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  async function GetChatList(limit) {
    const body = { limit };
    try {
      const res = await API().GET('/', body, AutorizeHeader);
      return res;
    } catch (err) {
      console.error(err);
    }
  }
  async function SearchAll(text) {
    const body = { search_entry: text };

    try {
      const res = await API().GET('search/', body, AutorizeHeader);
      return res;
    } catch (err) {
      console.error(err);
    }
  }
  async function UpdateSeen(MsgID) {
    await API()
      .POST(`seen/${MsgID}`, {}, AutorizeHeader)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  async function sendText(endpoint, text, styles) {
    const body = { text, styles };
    console.log(body);
    // console.log(text);
    // console.log(text)
    try {
      const res = await API().POST(`${endpoint}`, body, AutorizeHeader);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  // async function UpdateSeen(MsgID) {
  //   try {
  //     await API()
  //       .POST(`seen/${MsgID}`, {}, AutorizeHeader)
  //       .then((res) => res.json())
  //       .then((data) => console.log(data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  async function GetProfileMedium(chatid) {
    console.log(chatid);
    await API()
      .GET(`profile/compressed-profile/${chatid}`, {}, AutorizeHeader)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  async function EditMessage(messageId, text) {
    const body = {
      text: text
    };
    await API()
      .POST(`edit-message/${messageId}`, body, AutorizeHeader)
      .then((res) => res.json());
    // .then((data) => console.log(data))
    // .catch((err) => console.log(err));
  }
  async function GetContacts() {
    try {
      const res = await API().GET('contacts', {}, AutorizeHeader);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  async function CreateChat(name, members, type) {
    const body = {
      type: type,
      members: members,
      name: name
    };
    await API()
      .POST('create-chat', body, AutorizeHeader)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
  return {
    CreateChat,
    GetContacts,
    EditMessage,
    GetProfileMedium,
    checkDuplicateEmail,
    Register,
    Login,
    GetChatList,
    GetChat,
    SearchAll,
    sendText,
    UpdateSeen
  };
}
