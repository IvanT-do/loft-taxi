import withAuth from "../../utils/withAuth";

function Home(){
    return (
        <div>
            Map
        </div>
    );
}

export default withAuth(Home)