import React from 'react';
import './NewHeader.css';
import {FaPhoneSquareAlt} from 'react-icons/fa';
import {RiFacebookFill} from 'react-icons/ri';
import {IoLogoTwitter} from 'react-icons/io';
import {TiSocialGooglePlus} from 'react-icons/ti'
import {TiSocialInstagram} from 'react-icons/ti';
import {IoIosMail} from 'react-icons/io';
// import mail from '../img/envelope-square-solid.svg''

const NewHeader = () => {
    return (
        <div className="header-container">
          
            <div className="social-container">
            <p className="email"> <IoIosMail/>Email: admin@gmail.com</p>
            
            <p className="phone"><FaPhoneSquareAlt/> phone: 0123456789</p>
            </div>
          
            <div className="social-icons">
            
            <RiFacebookFill class="first-r"/>
            <IoLogoTwitter class="second-r"/>
            <TiSocialGooglePlus class="third-r"/>
            <TiSocialInstagram class="fourth-r"/>
            
            </div>
        </div>
    )
}

export default NewHeader

{/* <MailOutlined />https://github.com/thirdessential/Lawyer-management-dashboard.git

<i class="fa fa-phone" aria-hidden="true"></i> */}