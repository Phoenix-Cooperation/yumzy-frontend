import React from "react";

const Chat = () => {
  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-search"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="Search..."/>
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
                <li className="clearfix">
                  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
                  <div className="about">
                    <div className="name">Sachintha Dilshan</div>
                    <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
                  </div>
                </li>
                <li className="clearfix active" style="background-color: #FF6666">
                  <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                  <div className="about">
                    <div className="name">Ravindu Senal</div>
                    <div className="status" style="color: #FFFFFF"> <i className="fa fa-circle online"></i> online </div>
                  </div>
                </li>
                <li className="clearfix">
                  <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar"/>
                  <div className="about">
                    <div className="name">Bimali</div>
                    <div className="status"> <i className="fa fa-circle online"></i> online </div>
                  </div>
                </li>                                    
                <li className="clearfix">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar"/>
                  <div className="about">
                    <div className="name">Ravindu</div>
                    <div className="status"> <i className="fa fa-circle offline"></i> left 1 hour ago </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="chat">
              <div className="chat-header clearfix" style="background-color: #FF6666">
                <div className="row">
                  <div className="col-lg-6">
                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                    </a>
                    <div className="chat-about">
                      <h6 className="m-b-0">Ravindu Senal</h6>
                      <small>Online</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-history">
                <ul className="m-b-0">
                  <li className="clearfix">
                    <div className="message other-message float-right" style="background-color: #FF6666"> Hi Eren, how are you? I tried your new pasta recipe. And I love it </div>
                  </li>
                  <li className="clearfix">
                    <div className="message-data">
                      <span className="message-data-time">11:12 AM, Today</span>
                    </div>
                    <div className="message my-message">Hi. Thank you so much.</div>                                    
                  </li>                               
                  <li className="clearfix">
                    <div className="message-data">
                      <span className="message-data-time">11:13 AM, Today</span>
                    </div>
                    <div className="message my-message">I did more recipes. Please check them out.</div>
                  </li>
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-send"></i></span>
                  </div>
                  <input type="text" className="form-control" placeholder="Enter text here..."/>                                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;