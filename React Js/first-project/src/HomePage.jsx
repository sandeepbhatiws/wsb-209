import Header from "./Header";

export default function HomePage() {

    const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur necessitatibus, laudantium ratione placeat accusamus nobis cumque quae sed culpa sint omnis, dolorum nam labore accusantium doloremque consectetur expedita repellendus iure.';

    var status = 0;

  return (
    <>
        {/* <Header/> */}
        {/* <Header></Header> */}


        {
            status == 1 
            ?
            <center>
                {description}
            </center> 
            : 
            <Header/>
        }
        
        {/* {
            status == 1
            ?
            <center>
                {description}
            </center>
            :
            ''
        } */}

        

        {/* <footer>Footer</footer>
        <div>
            Welcome
        </div>
        <div>
            WsCubeTech
        </div> */}
    </>
  )
}
