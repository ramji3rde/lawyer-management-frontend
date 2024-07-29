import React, { useState, useEffect } from 'react';
import Navigation from '../components/HomePage/navigation'
import Header from '../components/HomePage/header';
import Features from '../components/HomePage/features';
import Blog from '../components/HomePage/Blog';
import Contact from '../components/HomePage/contact';
import Footer from '../components/HomePage/footer';
import Subscription from '../components/HomePage/subscription'
import api from '../../resources/api'
import Testimonial from '../components/HomePage/testimonials'
import  WelcomeContainer from '../components/welcomeContainer/WelcomeContainer';
import NewFaq from '../components/newfaq/NewFaq';
import NewClient from '../components/newClient/NewClient';
import Frequntly from '../components/FrequnetlyAskedQuestion/Frequntly';

function Home(props) {
  console.log(props)
  const [state, setstate] = useState({
    list: [],
    list2: [],
    description: '',
    address: '',
    socialMedia: [
      { item: "Facebook", url: '' },
      { item: "Twitter", url: '' },
      { item: "Youtube", url: '' },
      { item: "Instagram", url: '' },
      { item: "LinkedIn", url: '' }
    ],
    imageFile: '',
    header: [],
    logo: "",
    banner: ["WE SUPPORT  ATTORNEYS, CASE MANAGEMENT MADE EASY"],
  })

  const fetchdata = () => {
    api.get(`/footer/showall/`).then((res) => {
      console.log(res)
      setstate(res.data.data[res.data.data.length - 1])
      //  this.setState(res.data.data)
    })
  }
  useEffect(() => {
    fetchdata()
  }, [])
  const handleRoute = (route) => {
    console.log(route)
    props.history.push(route)
  }
  const handleSubscription = () => {
    props.history.push('/login')
  }
  return (
    <div className="Home">
      <Navigation state={state} handleRoute={handleRoute} />
      <Header state={state} handleRoute={handleRoute} />
    
      <WelcomeContainer/>
      <Features state={state} handleRoute={handleRoute} />
      {/* <NewFaq/> */}
      <Frequntly/>
      <NewClient/>
      {/* <Subscription state={state} handleSubscription={handleSubscription} handleRoute={handleRoute} /> */}
      {/* <Blog state={state} handleRoute={handleRoute} /> */}
      {/* <Testimonial state={state} handleRoute={handleRoute} /> */}
      {/* <Contact state={state} handleRoute={handleRoute} /> */}
      <Footer state={state} handleRoute={handleRoute} />
    </div>
  );
}

export default Home;
