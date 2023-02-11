
import { logOut } from '../../../lib/firebase';
import { DummyComponent } from '../components/DummyComponent';

export const Dashboard = () => {

  return (
    <>
      you're logged in! 
      <br />
      <button onClick={logOut}>logout here</button>
      <DummyComponent propExample="Dashboard" />
    </> 
  )
}