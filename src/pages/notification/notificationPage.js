import {POST_CREATE_SUBSCRIPTION} from "../../Graphql/Queries/notificationQueries.js";
import {useSubscription} from "@apollo/client";
import React, {useEffect, useState} from "react";

const NotificationPage = () => {
  const [postData, setPostData] = useState([]);
  const {data} = useSubscription(POST_CREATE_SUBSCRIPTION);
  console.log("SUBSCRIPTION" + data);
  useEffect(() => {
    console.log("SUBSCRIPTION 2" + data);
    if (data !== undefined) {
      setPostData(prev => ([...prev, ...data]));
    }
  }, [data]);
  return (
    <div> hello</div>
  );
};

export default NotificationPage;