import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import ContentCard from "./ContentCard";
import { GET_CONTENT } from "../../Graphql/Queries/getPostQueries"
import { DELETE_CONTENT } from "../../api/mutations";
import {useQuery, useMutation } from "@apollo/client";
import ContentModal from "./ContentModal";
import ContentActions from "./ContentActions";
import { deleteFromS3 } from "../../utils/deleteFromS3";

const PostPage = () => {

  const pageSize = 3;
  const [postData,setPostData] = useState([]);
  const [after, setAfter] = useState(pageSize);
  const { data, fetchMore } = useQuery(GET_CONTENT, {variables: {pageSize: pageSize}});
  const [getMoreData, setGetMoreData] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [scroleCount, setScrolCount] = useState(0);
  const [showPost, setShowPost] = useState(false);
  // const [showRecipePost, setShowRecipePost] = useState(false);
  // const [showTipsPost, setShowTipsPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const [showConentActions, setShowContentActions] = useState(false)
  const [contentActionDetail, setContentActionDetail] = useState({
    contentId: null,
    contentType: null,
    images: [],
    username: null
  })

  const handleShowContentActions = (contentId, contentType, images, username) => {
    setContentActionDetail({contentId, contentType, images, username})
    setShowContentActions(true)
  }
  
  const handleHideContentActions = () => {
    setContentActionDetail({ contentId: null, contentType: null, images: [], username: null })
    setShowContentActions(false)
  }

  const [deleteContent] = useMutation(DELETE_CONTENT)

  const deleteContentAction = async () => {
    const { contentId, images } = contentActionDetail
    if (contentId) {
      console.log(contentId)
      const { data: { deleteContentById : { message }}} = await deleteContent({
        variables: {
          contentId
        }
      })

      if ( message === "success") {
        if (images.length > 0) {
          await deleteFromS3(images)
        }
        handlePostHide()
        let tempPostData = postData.filter((data) => data.id !== contentId)
        setPostData(tempPostData)
        handleHideContentActions()
      }

    }
  } 
  // console.log(contentActionDetail, "postpage")

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
    // console.log("loading....")
    // console.log(totalHeight, currentPosition);
    if (currentPosition > (0.95 * totalHeight)) {
      setScrolCount(scroleCount + 1);
      console.log("scrol down")
      if (!getMoreData) {
        console.log("get more data true")
        setGetMoreData(true)
      }
    }
  }

  useEffect(() => {
    const fetchMoreData = async () => {
      if (getMoreData && hasMore){
        setGetMoreData(false)
        const { data } = await fetchMore({
          variables: { after: after }
        })
        
        if (data !== undefined) {
          setPostData([...postData, ...data.getContent.content]);
          console.log("poasts", postData.length);
          setAfter(postData.length)
          setGetMoreData(false);
          setHasMore(data.getContent.hasMore);
        }
      }
    }
    console.log("fetching more data")
    fetchMoreData()
  }, [getMoreData])

  useEffect(() => {
    console.log(data);
    if(data !== undefined) {
      setPostData(prev => ([...prev, ...data.getContent.content]));
    }
  }, [data])

  const handlePostPopup = (data,index) => {
    console.log("Popup click",index)
    console.log(data);
    setSelectedPost(data);
    setShowPost(true);

    // if (data.type === "post") {
    //   setShowPost(true);
    // }
    // if (data.type === "recipe") {
    //   setShowRecipePost(true);
    // }
    // if (data.type === "tips") {
    //   setShowTipsPost(true);
    // }
  }

  const handlePostHide = () => {
    setSelectedPost({});
    setShowPost(false);
    console.log("clodsin");
    // if (selectedPost.type === "post") {
    //   setShowPost(false);
    // }
    // if (selectedPost.type === "recipe") {
    //   setShowRecipePost(false);
    // }
    // if (selectedPost.type === "tips") {
    //   setShowTipsPost(false);
    // }
  }

  return (
    <Row>
      <div>
        {postData.map((data, index) => (
          <div key={data.id+index}>
            <ContentCard 
              key={data.id + index} 
              data = {data} 
              handlePopup={() => handlePostPopup(data,index)}
              showConentActions = {showConentActions}
              handleShowContentActions = {handleShowContentActions}
            />
          </div>
        ))}
        {selectedPost && selectedPost.user && selectedPost.title &&
          <ContentModal 
            contentData={selectedPost} 
            show={showPost} 
            handleHide={handlePostHide}
            handleShowContentActions = {handleShowContentActions}
            handleHideContentActions = {handleHideContentActions}
            showConentActions={showConentActions}
          />
        }
        {showConentActions && (
          <ContentActions 
            show={showConentActions} 
            hide={handleHideContentActions} 
            contentDetail={contentActionDetail}
            deleteContent={deleteContentAction}
          />
        )}
      </div>
      {/*<RecipiePost title="Ramen Recipie" description="asdjaj ioajsdkasj aodjlasjd adasjkdj" time="10 minutes"/>*/}
    </Row>
  );
};

export default PostPage;