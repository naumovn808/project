const { element } = require("prop-types")



export LayoutAuth = () => {

    return (
        <div>
            <Header />

            <Outlet />

            <Footer />
        </div >
    )
}

roter = [
    {
        pat: 'auth',
        element: <LayoutAuth/>
        children: [
            {
                path: '/register',
                element: <Register/>
      }, {

      }

        ]
     
        ]]