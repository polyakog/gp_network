import React from "react";
import './components/Profile';


const Profile = () => {
    
    return (
        <div className='content'>
            {/* Main pic */}
            <div className='main-pic-wrapper'>
                <img className='main-pic' src="https://media.istockphoto.com/vectors/molecules-or-dna-strand-genetic-engineering-neural-network-innovation-vector-id1200528971?k=20&m=1200528971&s=612x612&w=0&h=vOdPI_Rm5cpnIHssulc2Y89U2O0sN3P26Tb49JUVJiI=" alt="" /></div>
            <div className='avatar-description'>
                <div className='avatar'>
                    <img src="https://i.pinimg.com/originals/3e/9c/04/3e9c049cd8ffcbb3f0df3255fc1f47ee.png" alt="" />
                </div>
                <div className='description'>
                    <p className='user-name'>Gennadij Polyakov</p>
                    <br />
                    <p>Region: Russia</p>
                    <p>Position: AI</p>
                </div>

            </div>

            <div>My post</div>
            <div>New post</div>
            <div>post</div>
            <div>post</div>

        </div>
    );
}

export default Profile;