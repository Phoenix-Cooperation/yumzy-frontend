import React from "react";

const PrivacyPanel = () => {
  return (
    <div className="setting-panel">
      <div className="setting-panel__header">
        Who can see what I share
      </div>
      <div className="setting-panel__table">
        <div className="setting-panel__table__row">
          <div className="setting-panel__table__row__left_privacy" style={{flexGrow: 1}}>
            Post
          </div>
          <div style={{flexGrow: 3}} className="setting-panel__table__row__middle_privacy">
            <div>Fiends Only</div>
          </div>
          <div style={{flexGrow: 4}} className="setting-panel__table__row__right_privacy">
            <button className="setting-panel__submit">Change</button>
          </div>
        </div>
        <div className="setting-panel__table__row">
            <div className="setting-panel__table__row__left_privacy" style={{flexGrow: 1}}>
              Receipt and Tips
            </div>
            <div style={{flexGrow: 3}} className="setting-panel__table__row__middle_privacy">
              <div>Public</div>
            </div>
            <div style={{flexGrow: 4}} className="setting-panel__table__row__right_privacy">
              <button className="setting-panel__submit">Change</button>
            </div>
        </div>
      </div>
      <div className="setting-panel__header">
        Who Can see my notification
      </div>
      <div className="setting-panel__table">
        <div className="setting-panel__table__row">
          <div className="setting-panel__table__row__left_privacy" style={{flexGrow: 1}}>
            My Profile Photo
          </div>
          <div style={{flexGrow: 3}} className="setting-panel__table__row__middle_privacy">
            <div>Fiends Only</div>
          </div>
          <div style={{flexGrow: 4}} className="setting-panel__table__row__right_privacy">
            <button className="setting-panel__submit">Change</button>
          </div>
        </div>
        <div className="setting-panel__table__row">
          <div className="setting-panel__table__row__left_privacy" style={{flexGrow: 1}}>
            My Bio
          </div>
          <div style={{flexGrow: 3}} className="setting-panel__table__row__middle_privacy">
            <div>Public</div>
          </div>
          <div style={{flexGrow: 4}} className="setting-panel__table__row__right_privacy">
            <button className="setting-panel__submit">Change</button>
          </div>
        </div>
      </div>
      <div className="setting-panel__header">
        Privacy Terms
      </div>
    </div>
  );
}

export default PrivacyPanel;