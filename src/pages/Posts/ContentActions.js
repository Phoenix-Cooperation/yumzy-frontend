/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { useMutation, useQuery, gql } from "@apollo/client";
import Modal from "react-bootstrap/Modal";
import { SAVE_CONTENT, UNSAVE_CONTENT } from "../../api/mutations";
import { CHECK_USER_SAVED_CONTENT } from "../../api/queries";
import Spinner from "react-bootstrap/Spinner";

const ContentActions = ({show, hide, contentDetail}) => {
  const [isContentSaved, setIsContentSaved] = useState(false)
  const { contentId, contentType, username } = contentDetail
  const [saveContent] = useMutation(SAVE_CONTENT)
  const [unSaveContent] = useMutation(UNSAVE_CONTENT)

  
  const { data: checkUserSavedContentData, loading, refetch: reCheck } = useQuery(CHECK_USER_SAVED_CONTENT, {variables: {
    contentId: contentId
  }})

  const GET_USER = gql`
    query GetUser {
      user @client
    }
  `

  const { data: { user }} = useQuery(GET_USER)


  useEffect(() => {
    if (checkUserSavedContentData !== undefined) {
      const { checkUserSavedContent } = checkUserSavedContentData

      if (checkUserSavedContent.message) {
        setIsContentSaved(true)
      } else {
        setIsContentSaved(false)
      }
    }

    if (contentId) {
      reCheck()
    }

  }, [loading, contentId, checkUserSavedContentData])
  
  const handleSaveContent = async () => {
    const { data: { contentSaved: { message }} } = await saveContent({
      variables: {
        contentSaveInput: { contentId, contentType }
      }
    })
    if (message) {
      setIsContentSaved(true)
    }
  }

  const handleUnsaveContent = async () => {
    const {data: { contentUnsaved: { message }} } = await unSaveContent({
      variables: {
        contentSaveInput: { contentId, contentType }
      }
    })

    if (message) {
      setIsContentSaved(false)
    }

  }


  const handleHide = () => {
    setIsContentSaved(false)
    hide()
  }

  return (
    <Modal
      className="ContentActionsModal"
      show={show}
      onHide={handleHide}
      dialogClassName="contentModal--width"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      {loading ? (<span className="d-flex justify-content-center align-center"><Spinner/></span>): (<>
        <div className="ContentActionsModal__container">
          <div className="ContentActionsModal__col">
            {isContentSaved ? (
              <span onClick={handleUnsaveContent}>
                Unsave Content
              </span>) : (
              <span onClick={handleSaveContent}>
                Save Content
              </span>)}
            <span>
            Report
            </span>
            {username === user.username && (
              <>
                <span>Delete</span>
              </>
            )}
           
            <span onClick={hide}>
            Close
            </span>
          </div>
        </div>
      
      </>)}
      
    </Modal>
  )
}

export default ContentActions