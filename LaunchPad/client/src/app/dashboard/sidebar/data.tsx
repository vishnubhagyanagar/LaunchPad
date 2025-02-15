import { HomeIcon } from './icons/HomeIcon';
import { ProfileIcon } from './icons/ProfileIcon';
import { ChatIcon } from './icons/ChatIcon';
import { SettingsIcon } from './icons/SettingsIcon';


export const data = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    title: 'Chat',
    icon: <ChatIcon />,
    link: '/chat',
  },
  {
    title: 'Profile',
    icon: <ProfileIcon />,
    link: '/profile',
  },
 {
    title: 'Follow Requests',
    icon: <SettingsIcon />,
    link: '/followrequests',
  },
 
];