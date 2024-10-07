import Navbar from '../components/Navbar';

const Layout = ({children}) => {
    return (
        <div className="d-flex flex-column vh-100">
            <Navbar></Navbar>
            <div className="mb-3 mt-3 px-5">
                {children}
            </div>
        </div>
    )
}

export default Layout;