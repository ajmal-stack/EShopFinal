import { server } from '../server';
import axios from 'axios';
import { toast } from 'react-toastify';

export const handleMessageSubmit = async (
  data,
  user,
  seller = {},
  isAuthenticated,
  navigate
) => {
  console.log('USER_ID', user._id);
  console.log('SHOP_ID', seller._id);
  if (isAuthenticated) {
    const groupTitle = data._id + user._id;
    const userId = user._id;
    const sellerId = seller._id;
    // const sellerId = shop._id;
    // const sellerId = data.shop._id;
    await axios
      .post(`${server}/conversation/create-new-conversation`, {
        groupTitle,
        userId,
        sellerId,
      })
      .then((res) => {
        navigate(`/inbox?${res.data.conversation._id}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  } else {
    toast.error('Please login to create a conversation');
  }
};
