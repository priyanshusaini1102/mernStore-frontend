import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearErrors, sendContactMail } from '../../actions/userAction';
import { MAIL_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';

const Contact = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isSent, error, loading} = useSelector((state)=> state.contactMailState);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();

  const contactSubmitHandler = (e) => {
    e.preventDefault();
    
    const myForm = new FormData();

    myForm.set("firstName", firstName);
    myForm.set("lastName", lastName);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("message", message);
    dispatch(sendContactMail(myForm));
  }

  useEffect(()=>{
   
    if(isSent){
      dispatch({type:MAIL_RESET});
      
      alert.success("Mail Sent Successfully.");
      navigate("/");
    }

    if(error){
      alert.error(error);
      dispatch(clearErrors);
    }

  },[dispatch,alert,navigate,error,isSent]);

  return <Fragment>
    <MetaData title={`My Store | Contact`} />
    <div className="flex justify-center items-center w-full  h-full bg-white">
	<div className="container mx-auto my-4 px-4 lg:px-20">

		<div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
			<div className="flex">
				<h1 className="font-bold uppercase text-5xl">Send us a <br /> message</h1>
			</div>
      <form encType="application/json" onSubmit={contactSubmitHandler}  >
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text" placeholder="First Name*" onChange={(e)=>setFirstName(e.target.value)} required />
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text" placeholder="Last Name"  onChange={(e)=>setLastName(e.target.value)} />
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="email" placeholder="Email*" onChange={(e)=>setEmail(e.target.value)} required />
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="number" placeholder="Phone*" onChange={(e)=>setPhone(e.target.value)} required />
        </div>
				<div className="my-4">
					<textarea placeholder="Message*" className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" required  onChange={(e)=>setMessage(e.target.value)}></textarea>
				</div>
				<div className="my-2 w-1/2 lg:w-1/4">
					<button disabled={loading? true : false} type='submit' className="uppercase text-sm font-bold tracking-wide bg-gray-900 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline">
            {loading ? "Sending..." : "Send Message"}
          </button>
				</div>
        </form>
			</div>

			<div
				className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-black rounded-2xl">
				<div className="flex flex-col text-white">
					<h1 className="font-bold uppercase text-4xl my-4">Drop in our office</h1>
					<p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
						tincidunt arcu diam,
						eu feugiat felis fermentum id. Curabitur vitae nibh viverra, auctor turpis sed, scelerisque ex.
					</p>

					<div className="flex my-4 w-2/3 lg:w-1/2">
						<div className="flex flex-col">
							<i className="fas fa-map-marker-alt pt-2 pr-2" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl">Main Office</h2>
              <p className="text-gray-400">5555 Tailwind RD, Pleasant Grove, UT 73533</p>
            </div>
          </div>
          
          <div className="flex my-4 w-2/3 lg:w-1/2">
            <div className="flex flex-col">
              <i className="fas fa-phone-alt pt-2 pr-2" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl">Call Us</h2>
              <p className="text-gray-400">Tel: xxx-xxx-xxx</p>
              <p className="text-gray-400">Fax: xxx-xxx-xxx</p>
            </div>
          </div>
          
          <div className="flex my-4 w-2/3 lg:w-1/2">
            <a href="https://www.facebook.com/ENLIGHTENEERING/" target="_blank" rel="noreferrer" className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
              <i className="fab fa-facebook-f text-gray-900" />
            </a>
            <a href="https://www.linkedin.com/company/enlighteneering-inc-" target="_blank" rel="noreferrer" className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
              <i className="fab fa-linkedin-in text-gray-900" />
            </a>
          </div>
        </div>
      </div>
    </div>
</div></Fragment>
};

export default Contact;
