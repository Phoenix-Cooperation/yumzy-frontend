import React from "react"
// import { Container,  } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

// eslint-disable-next-line react/prop-types
const ContentActions = ({show, hide}) => {
  return (
    <Modal
      className="ContentActionsModal"
      show={show}
      onHide={hide}
      dialogClassName="contentModal--width"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <div className="ContentActionsModal__container">
        <div className="ContentActionsModal__col">
          <span>
            Save Content
          </span>
          <span>
            Report
          </span>
          <span onClick={hide}>
            Close
          </span>
        </div>
      </div>
    </Modal>
  )
}

export default ContentActions