import Header from "../../components/Header/Header";

export default function Home({ onNavigate, name }){
    return (
        <div className="page page_vert">
            <Header onNavigate={onNavigate} currentPage={name} />
        </div>
    );
}