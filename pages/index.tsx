import { GetServerSideProps, NextPage } from "next";
import {  useState } from "react";
import styles from "./index.module.css";
type Props = {
    initialImageUrl: string;
}


const IndexPage: NextPage<Props>=({initialImageUrl})=>{
    const [catImageUrl, setCatImageUrl]=useState(initialImageUrl);
    const [loading, setLoading] = useState(false);

    // useEffect(()=>{
    //     fetchImage().then((newImage)=>{
    //         setImageUrl(newImage.url);
    //         setLoading(false);
    //     });
    // }, []);

    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setCatImageUrl(newImage.url);
        setLoading(false);
    }

//
    return (
        <div>
        <button
            onClick={handleClick}
            style={{
            backgroundColor: "#319795",
            border: "none",
            borderRadius: "4px",
            color: "white",
            padding: "4px 8px",
        }}
        >
            きょうのにゃんこ🐱
        </button>
        <div style={{ marginTop: 8, maxWidth: 500 }}>
            <img src={catImageUrl} width="100%" height="auto" alt="猫" />
        </div>
    </div>
  );
};
export default IndexPage;

const GetServerSideProps: GetServerSideProps<Props> = async ()=>{
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        }
    }
}

type Image = {
    id:string;
    url: string;
};

const fetchImage = async(): Promise<Image>=>{
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
}

