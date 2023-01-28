import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import PostComponent from "../../components/PostComponent/PostComponent";
import { GET_CONTENT } from "../../Graphql/Queries/getPostQueries"
import {useQuery} from "@apollo/client";

const PostPage = () => {

  const [postData,setPostData] = useState([]);
  const { data, fetchMore } = useQuery(GET_CONTENT, {variables: {pageSize: 2}});

  // const observer = useRef();
  // const lastElementRef = useCallback(
  //   (node) => {
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         const newData = useQuery(GET_CONTENT, {variables: {pageSize: 2,after: data.length}});
  //         setPostData([...postData,newData.data.getContent]);
  //         console.log("loading")
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },[]
  // );
  
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
      await fetchMore({
        variables: {after: postData.length}
      });
      // const newData = useQuery(GET_CONTENT, {variables: {pageSize: 2,after: 2}});
      // setPostData([...postData,newData.data.getContent]);
      // console.log(newData.data);
      console.log(postData);
    }
  }

  useEffect(() => {
    console.log(data);
    if(data !== undefined) {
      setPostData(data.getContent);
    }
  },[data])


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