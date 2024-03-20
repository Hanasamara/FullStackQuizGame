/**
 * Necessary Redux imports
 */
import { useDispatch, useSelector } from 'react-redux';
// import { setPerson, logoutPerson, storeCookie} from '../reducers/personReducer';
import personServices from '../services/person';
import login from '../services/login';
import { setPerson, logoutPerson, storeCookie, getCookie  } from '../reducers/personReducer';




const Login = () => {
  // For dispatching actions
  const dispatch = useDispatch()

  // Handle either button click
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Grab relevant values
    const user = {
      name: e.target.name.value,
      password: e.target.password.value
    }

    // distinguish button click
    const clickType = e.nativeEvent.submitter.value
    if (clickType === 'login') {
        const loginPerson = await login(user)
        if(loginPerson == undefined){
            window.alert("login failed")
            return
        }
        dispatch(setPerson(loginPerson))
        window.alert("Successfully Login ")
        dispatch(storeCookie(loginPerson))

      
    } else {
        const people = await  personServices.getPeople()
        const nameReserved = people.find(person =>person.name.toLowerCase() === user.name.toLowerCase())
        if(nameReserved){
          window.alert("Username already reserved")
          return
        }
        else{
          const newUser = await personServices.addPerson(user)
          window.alert("create new user")
          dispatch(setPerson(newUser))
          dispatch(storeCookie(newUser))
          return
        }
       
    }
  }

  return (
    <div className="login-container">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label-name">Username:</label>
            <input className="input-name" placeholder="username" name="name" />
          </div>
          <div className="form-group">
            <label className="label-password">Password:</label>
            <input className="input-password" placeholder="password" name="password" type="password" />
          </div>
          <div className='divbutton'>
            <button className="login-btn" type="submit" name="submitType" value="login">Login</button>
            <button className="create-btn" type="submit" name="submitType" value="create">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login