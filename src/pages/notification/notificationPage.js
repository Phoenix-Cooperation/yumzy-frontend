import {POST_CREATE_SUBSCRIPTION, POST_NOTIFICATION_GET} from "../../Graphql/Queries/notificationQueries.js";
import {useSubscription} from "@apollo/client";
import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";


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

  const {notificationDataList, loading, error, subscribeToMore} = useQuery(POST_NOTIFICATION_GET);
  useEffect(() => {
    subscribeToMore({
      document: POST_CREATE_SUBSCRIPTION,
      updateQuery: (prev, {subscriptionData}) => {
        console.log(subscriptionData);
        if (!subscriptionData.data) return prev;
        const contentCreateSubscription = subscriptionData.data.contentCreateSubscription;
        return {
          ...prev,
          getNotification: [...prev.getNotification, contentCreateSubscription]
        };
      }
    });
  }, [subscribeToMore]);
  console.log("SUBSCRIPTION 3 " + notificationDataList);
  return (
    <div> hello</div>
  );
};

export default NotificationPage;