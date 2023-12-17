import Default from './Menues/Default.jsx';
import {
  NUM_SIDEBAR_CHANNEL,
  NUM_SIDEBAR_CONTACTS,
  NUM_SIDEBAR_DEFAULT,
  NUM_SIDEBAR_GROUP,
  NUM_SIDEBAR_SETTINGS
} from '../../utility/Constants.js';
import { useState } from 'react';
import Settings from './Menues/Settings.jsx';
import { UilArrowLeft } from '@iconscout/react-unicons';
import { useSelector } from 'react-redux';
import Avatar from '../ChatComps/Avatar.jsx';
import ContactsList from './ContactsList.jsx';
import GroupChannelAdd from './GroupChannelAdd.jsx';
export default function SidebarMenu({ profileImage, username, divref }) {
  // const [menu, setmenu] = useState(NUM_SIDEBAR_DEFAULT);
  const menu = useSelector((state) => state.rightsideMenues.ParentType);
  const {profile:profile , profColor:profColor }= useSelector((state) => state.profile.profileData);
  console.error(profile);
  const Menues = {
    [NUM_SIDEBAR_DEFAULT]: ['Defualt', <Default />],
    [NUM_SIDEBAR_SETTINGS]: ['تنظیمات', <Settings />],
    [NUM_SIDEBAR_CONTACTS]: ['مخاطبین', <ContactsList />],
    [NUM_SIDEBAR_CHANNEL]: ['ساخت کانال', <GroupChannelAdd type={'channel'} />],
    [NUM_SIDEBAR_GROUP]: ['ساخت گروه', <GroupChannelAdd type={'group'} />]
  };
  return (
    <div dir="rtl" ref={divref} className={`w-[100%]`}>
      {menu == NUM_SIDEBAR_DEFAULT ? (
        <>
          <div className=" w-[100%] h-[200px] flex flex-col justify-end gap-6 pt-0 ">
            <div
              className="flex w-[100%] object-cover h-[100%] flex-col justify-end place-items-end px-5 bg-gradient-to-r from-bghovor  to-[#005C4B] b pb-6  bg-cover  bg-center"
              // style={{ backgroundImage: 'var(backgroundPattern)', backgroundBlendMode:'soft-light' }}
            >
              {/* "{\"status\":\"200\",\"profile\":{\"id\":14,\"name\":\"zarp\",\"userName\":\"\",\"email\":\"z@gmail.com\",\"mediaId\":14,\"userId\":14},\"jwt\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiekBnbWFpbC5jb20iLCJpYXQiOjE3MDI4MDg5NDcsImV4cCI6MTcwMzQxMzc0N30.rDLQcj1drmrrbUMEXqVqfjXGWQ6QA8GZR-5fOGbnk8k\",\"profColor\":\"#123123\"}"
 */}
              <Avatar
                image={profile.name}
                size={90}
                imagecolor={profColor}
                char={profile.name[0]}
                // isOnline={true}
              />
              <p className="text-white text-end mt-4 m-6">{profile.name}</p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {Menues[menu][1]}
    </div>
  );
}
