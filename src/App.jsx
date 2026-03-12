import { useEffect } from 'react'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import Hero from './components/Hero/Hero'
import ScrollToTop from "./helper/scroll-to-top";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Experience from './components/Experience/Experience'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Header from './components/Header/Header'
import Contact from './components/Contact/Contact'

function App() {

  useEffect(() => {
    document.title = "Pavan Budati | Java Full Stack Consultant"
  }, [])
  

  return (
	<main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
		<ToastContainer />
		<Header />
		<Hero />
		<About />
		<Experience />
		<Skills />
		<Projects />
		{/* <Education /> */}
		<Contact />
		{/* <BrowserRouter>
			<Routes>
				<Route path="/" >
					<Route path="/" element={<></>} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter> */}
		<Footer />
		<ScrollToTop />
      </main>
  )
}

export default App
