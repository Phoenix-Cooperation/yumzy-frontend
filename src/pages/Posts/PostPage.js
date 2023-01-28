import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import PostComponent from "../../components/PostComponent/PostComponent";
import { GET_CONTENT } from "../../Graphql/Queries/getPostQueries"
import {useQuery} from "@apollo/client";

const PostPage = () => {

  const [postData,setPostData] = useState([]);
  const { data, fetchMore } = useQuery(GET_CONTENT, {variables: {pageSize: 2}});

  // setPostData(data?.getContent)
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  // const handleScroll = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
  //
  //   setPostData(fetchMore({
  //     variables: {
  //       pageSize: 2,
  //       after: data.getContent.length
  //     },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) return prev;
  //       return Object.assign({}, prev, {
  //         data: [...postData, ...fetchMoreResult.data.getContent]
  //       });
  //     }
  //   }));
  // };

  const handleScroll = async ()  => {
    const totalHeight = window.innerHeight;
    const currentPosition = window.scrollY;
    console.log("loading....")
    console.log(totalHeight);
    console.log(currentPosition);
    if (currentPosition > (0.5 * totalHeight)) {
      console.log("loading....132")
      const { data: tempData } = await fetchMore({
        variables: {after: postData.length}
      });
      
      if(tempData !== undefined) {
        setPostData(prev => ([...prev, ...tempData.getContent]));
      }
    }
  }

  useEffect(() => {
    console.log(data);
    if(data !== undefined) {
      setPostData(prev => ([...prev, ...data.getContent]));
    }
  }, [data])


  return (
    <Row>
      <div>
        {postData.map((data) => (
          <PostComponent key={data.id} data = {data} />
        ))}
      </div>
      {/*<RecipiePost title="Ramen Recipie" description="asdjaj ioajsdkasj aodjlasjd adasjkdj" time="10 minutes"/>*/}
    </Row>
  );
};

export default PostPage;