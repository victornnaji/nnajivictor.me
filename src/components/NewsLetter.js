import React, { useState }  from 'react'
import styled from 'styled-components';
import { Heading } from '../styles';
import addToMailchimp from "gatsby-plugin-mailchimp";
import { media } from '@styles';

const NewsLetter = () => {
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async event =>{
        event.preventDefault();
        setDisabled(true);

        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            setMessage("Please Enter a Valid Email Address");
            setDisabled(false)
        }else{
            setMessage("Sending...")
            const response = await addToMailchimp(email)
            if (response.result === "error") {
                if (response.msg.toLowerCase().includes("already subscribed")) {
                    setMessage("You're already on the list!");
                    setEmail("");
                } else {
                    setMessage("Some error occured while subscribing you to the list.")
                }
                setDisabled(false)
                } else {
                setMessage("Thanks and welcome! You have successfully joined the Newsletter 🥳.")
                setEmail("");
            }
        }
    };

    return (
        <NewsLetterContent>
            <Heading> Join The NewsLetter</Heading>
            <p className="newsletter-content">
                Once a week or two, I send out newsletter about interesting findings and latest posts. Subscribe to stay in the loop
            </p>

            <form className="form" onSubmit={handleSubmit}>
                <div className="form-contents">
                    <input x-model="email" type="email" 
                        required 
                        placeholder="Enter your email" 
                        className="emailInput"
                        onChange={event => setEmail(event.target.value)}
                     />
                    <button className="button" disabled={disabled}>
                        Join Now
                    </button>

                    {/* Non Human Bait */}
                    {/* <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true">
                        <input type="text" name="b_f3590c43eb3e748b56b8dab8c_03386aaa36" tabIndex="-1" value=""/>
                    </div> */}
                    {/* Non Human Bait */}
                    
                </div>
            </form>
            <div className="message-box">{message}</div>
        </NewsLetterContent>
    )
};

const NewsLetterContent = styled.div`
   position: relative;
   border: 1px solid var(--secondary-color) ;
   border-radius: .5rem;
   padding: 2rem;

   ${media.tablet`padding: 1.5rem 1.5rem`}
   ${media.thone`padding: 1rem 1rem`}

   .newsletter-content{
       margin-top: -30px;
   }

   .form{
    .form-contents{
       display: flex;

       ${media.thone`display: block;`}

       .emailInput{
           display: block;
           max-width:320px;
           width: 100%;
           padding-left: 1rem;
           padding-right: 1rem;
           padding-top: .75rem;
           padding-bottom: .75rem;
           font-size: 1rem;
           border-radius: .375rem;
           border: 1px solid var(--secondary-color);
           background: transparent;
           color: var(--primary-color);

           ${media.thone`max-width: 100%;`}

           &:focus{
               box-shadow: 0 0 0 3px rgba(164,202,254,.45);
           };
       }

       .button{
        margin-left: 1rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        padding-top: .75rem;
        padding-bottom: .75rem;
        line-height: 1.375;
        border-radius: .375rem;
        border: 1px solid var(--secondary-color);
        background-color: transparent;
        color: var(--secondary-color);
        font-weight: 600;
        font-size:16px;
        cursor: pointer;

        &:hover{
            background: var(--btn-hover-color);
        }
        ${media.thone`margin-left: 0; 
          width: 100%;
          margin-top: 10px;
          font-size: 14px;
        `}
       }
    }
   }

   .message-box{
    margin-top: 10px;
    font-size: 16px;
   }


`;

export default NewsLetter
