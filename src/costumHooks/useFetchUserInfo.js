import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo ,setAuthChecked} from "../redux/userSlice";
import { BASE_URL } from "../main";

const useFetchUserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data , setData] = useState(null);


const fetchUserInfo = async () => {
  if (!user) {
    dispatch(setAuthChecked(true)); // no user → checked
    return;
  }

  try {
    const res = await axios.post(
      `${BASE_URL}/api-v1/Client/client_profile`,
      {
        client_id: user.client_id,
        auth_key: user.auth_key,
      }
    );

    dispatch(setUserInfo(res.data.data));
  } catch (err) {
    console.log(err);
    dispatch(setAuthChecked(true)); // even on error
  }
};

  return { loading, error, refetch: fetchUserInfo };
};

export default useFetchUserInfo;