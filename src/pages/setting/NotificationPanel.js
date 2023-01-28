import React, {useEffect, useState} from "react";

const NotificationPanel = () => {
  return (
    <div className="setting-panel">
      <div className="setting-panel__header">
        Notification Mode
      </div>
      <div className="setting-panel__table">
        <div className="setting-panel__table__row">
          <div className="setting-panel__table__row__name" style={{flexGrow: 1}}>
            Email Notifications
          </div>
          <div style={{flexGrow: 8}}>
            <label className="setting-switch">
              <input type="checkbox"/>
              <span className="setting-slider round"/>
            </label>
          </div>
        </div>
        <div className="setting-panel__table__row">
          <div className="setting-panel__table__row__name" style={{flexGrow: 1}}>
            Pop up
          </div>
          <div style={{flexGrow: 8}}>
            <label className="setting-switch">
              <input type="checkbox"/>
              <span className="setting-slider round"/>
            </label>
          </div>
        </div>
      </div>
      <div className="setting-panel__header">
        Notify Me
      </div>
      <div className="setting-panel__table">
        <div className="setting-panel__table__row">
          <div className="setting-panel__table__row__name" style={{flexGrow: 1}}>
            New Messages
          </div>
          <div style={{flexGrow: 8}}>
            <label className="setting-switch">
              <input type="checkbox"/>
              <span className="setting-slider round"/>
            </label>
          </div>
        </div>
        <div className="setting-panel__table__row">
          <div className="setting-panel__table__row__name" style={{flexGrow: 1}}>
            Friend requests
          </div>
          <div style={{flexGrow: 8}}>
            <label className="setting-switch">
              <input type="checkbox"/>
              <span className="setting-slider round"/>
            </label>
          </div>
        </div>
        <div className="setting-panel__table__row">
          <div className="setting-panel__table__row__name" style={{flexGrow: 1}}>
            Interact With my post
          </div>
          <div style={{flexGrow: 8}}>
            <label className="setting-switch">
              <input type="checkbox"/>
              <span className="setting-slider round"/>
            </label>
          </div>
        </div>
        <div className="setting-panel__table__row">
          <div className="setting-panel__table__row__name" style={{flexGrow: 1}}>
            New Share Content
          </div>
          <div style={{flexGrow: 8}}>
            <label className="setting-switch">
              <input type="checkbox"/>
              <span className="setting-slider round"/>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationPanel;