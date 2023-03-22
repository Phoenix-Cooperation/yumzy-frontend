import photo from '../assets/images/photo.jpg';
import iconEdit from '../assets/images/iconEdit.png'

const ProfileInfo = () => {
    return (    <div className="mainContainer">
    <div className="container">
        <div className="row">
          <div className="col-sm-2" style={{paddingLeft: '30px'}}>
            <img className="profileImage" src={photo}/>
          </div>
          <div className="col-sm-7" style={{paddingLeft: '20px'}}>
            <h2>John Doe</h2>
            <p>I am foodie from Sri Lanka and i like to cook food as a hobby. I am foodie from Sri Lanka and i like to cook food as a hobby.</p>
            <span className="status">14 posts | 50 followers | 50 points</span>
          </div>
          <div className="col-sm-1" style={{paddingLeft: '10px'}}>
            <span><img src={iconEdit} className="editIcon"/></span>
          </div>
        </div>
      </div>
</div>  );

}

export default ProfileInfo;