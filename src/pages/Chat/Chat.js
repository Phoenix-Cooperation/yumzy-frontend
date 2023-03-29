import React from "react";

const Chat = () => {
  return (
    <div class="container">
    <div class="row clearfix">
        <div class="col-lg-12">
            <div class="card chat-app">
                <div id="plist" class="people-list">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-search"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Search..."/>
                    </div>
                    <ul class="list-unstyled chat-list mt-2 mb-0">
                        <li class="clearfix">
                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
                            <div class="about">
                                <div class="name">Sachintha Dilshan</div>
                                <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                            
                            </div>
                        </li>
                        <li class="clearfix active" style="background-color: #FF6666">
                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                            <div class="about">
                                <div class="name">Ravindu Senal</div>
                                <div class="status" style="color: #FFFFFF"> <i class="fa fa-circle online"></i> online </div>
                            </div>
                        </li>
                        <li class="clearfix">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar"/>
                            <div class="about">
                                <div class="name">Bimali</div>
                                <div class="status"> <i class="fa fa-circle online"></i> online </div>
                            </div>
                        </li>                                    
                        <li class="clearfix">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar"/>
                            <div class="about">
                                <div class="name">Ravindu</div>
                                <div class="status"> <i class="fa fa-circle offline"></i> left 1 hour ago </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="chat">
                    <div class="chat-header clearfix" style="background-color: #FF6666">
                        <div class="row">
                            <div class="col-lg-6">
                                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                                </a>
                                <div class="chat-about">
                                    <h6 class="m-b-0">Ravindu Senal</h6>
                                    <small>Online</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-history">
                        <ul class="m-b-0">
                            <li class="clearfix">
                                <div class="message other-message float-right" style="background-color: #FF6666"> Hi Eren, how are you? I tried your new pasta recipe. And I love it </div>
                            </li>
                            <li class="clearfix">
                                <div class="message-data">
                                    <span class="message-data-time">11:12 AM, Today</span>
                                </div>
                                <div class="message my-message">Hi. Thank you so much.</div>                                    
                            </li>                               
                            <li class="clearfix">
                                <div class="message-data">
                                    <span class="message-data-time">11:13 AM, Today</span>
                                </div>
                                <div class="message my-message">I did more recipes. Please check them out.</div>
                            </li>
                        </ul>
                    </div>
                    <div class="chat-message clearfix">
                        <div class="input-group mb-0">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fa fa-send"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="Enter text here..."/>                                    
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