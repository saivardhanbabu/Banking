import "./Home.css";
// import articleImage from "";

function Home() {
  return (
    <div className='articleHome'>
      {/* <img src={articleImage} alt="" className="artcleImage" /> */}
      <h1 style={{color:'var(--dark-green)', backgroundColor:'rgb(98, 160, 191)',fontFamily:'Fantasy',fontWeight:'bold',outline:''}}>Welcome to Swiss Bank</h1>
      <img src="https://thumbs.dreamstime.com/b/teller-providing-customers-basic-banking-services-such-as-cash-withdrawals-deposits-281085103.jpg" className="container" height="600px" width="50px"></img>
    </div>
  );
}

export default Home;