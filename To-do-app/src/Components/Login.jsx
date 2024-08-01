import './Login.css'
import LoginForm from './LoginForm';
// import image from '../images/pexels-mart-production-7718707.jpg'

const Login = () => {
    return (
        <div className='wrapper'>
          <div className='container-left'>
            <div className="container-left-header">
               <div className="Logo-text"><p1><span className='W'>W</span><span className='E'>E</span><span  className='E-2'>E</span><span  className='K'>K</span><span  className='L'>L</span></p1></div>
               <p> <span className='Plan'>Plan</span>,<span className="Prepare">Prepare</span>,<span className="Do">Do!</span></p>
                {/* <div className="Logo"><img src={logo} alt="Logo"/>
            </div> */}
            </div>
            <div className="container-left-main">
               <h1>WANT TO BE EFFECIENT<br/> AND PERFORM AT YOUR PEAK! <br/> PLAN YOUR EFFORTS WITH WEEKLY-APP.</h1>
            </div>
            <div className="container-left-footer"></div>
          </div>
          <div className='container-right'>
            <LoginForm/>
          {/* <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
         <Button variant="contained">Contained<
          */}
         </div>
        </div>
     );
}
export default Login;