import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import PostsList from './pages/PostsList';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import PostDetails from './pages/PostDetails';
function App() {
  return (
    <>

      <Router>
      <Navbar/>
        <Routes>
          {/* <Route path='/' element={<h1>hello</h1>} /> */}
          <Route path='/' element={<PostsList/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/post/:id' element={<PostDetails/>}/>
          <Route path='/create-post' element={
            <PrivateRoute>
              <CreatePost/>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
