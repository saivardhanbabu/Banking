import "./Home.css";
// import articleImage from "";

function Home() {
  return (
    <div className='articleHome'>
      {/* <img src={articleImage} alt="" className="artcleImage" /> */}
      <h1 style={{color:'var(--dark-green)', backgroundColor:'rgb(98, 160, 191)',fontFamily:'Fantasy',fontWeight:'bold',outline:''}}>Swiss Bank</h1>
      <div className="d-flex">
      <img src="https://img.freepik.com/premium-photo/online-banking-internet-payments-etransactions-generative-ai_431161-3318.jpg" className="rounded-circle mt-5" height="400px" width="400px"></img>
      <div>
      <h1 className="mt-3 text-primary" style={{fontFamily:'Fantasy',fontWeight:'bold'}}>Welcome to the world of Internet Banking</h1>
      <p style={{float:'right',fontFamily:"Fantasy",fontSize:"20px"}}>Our online banking system offers unparalleled convenience and accessibility, allowing you to manage your finances anytime, anywhere. With 24/7 access, you can effortlessly view account balances, transaction history, and statements, providing real-time updates on your financial status. Easily transfer funds between accounts or pay bills online, saving time and resources. Rest assured, our system employs robust security measures, including encryption and multi-factor authentication, to safeguard your financial information. Enjoy the flexibility of mobile banking with our intuitive app, and stay informed with customizable alerts and notifications. Our dedicated customer support team is always available to assist you with any questions or issues you may encounter. Plus, our commitment to paperless banking promotes environmental sustainability. Experience the future of banking with our comprehensive online banking platform.</p>
      </div>
      </div>
    </div>
  );
}

export default Home;