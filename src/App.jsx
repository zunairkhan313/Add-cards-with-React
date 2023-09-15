import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img from '../src/img/zunair.jpg'
import img1 from '../src/img/images.jpeg'
import img2 from '../src/img/images.png'
import { useState , useEffect } from 'react';
import { db } from './firebase'
import {getDocs,collection,addDoc,deleteDoc,doc, updateDoc} from 'firebase/firestore'

function App() {

  const [newUrl , setNewUrl] = useState("")
  const [newTitle , setNewTitle] = useState("")
  const [newDesc , setNewDesc] = useState("")
  const [newPrice , setNewPrice] = useState(0)

  const onSubmitMovie = async()=>{
    try {
      const docRef = await addDoc(collection(db, "Card"), {

       url : newUrl,
       title : newTitle,
       Desc : newDesc,
       price : newPrice
      });
      getMovieList();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
   }
  
  
  const [movieList,setMovieList] = useState([]);
  
  const moviesCollectionRef = collection(db , "Card");
  
  const getMovieList = async () =>{
  try{
    const data = await getDocs(moviesCollectionRef);
    const filteredData = data.docs.map((doc)=>({
      ...doc.data(),
      id :doc.id
    }));
    setMovieList(filteredData);
  }catch(err){
    console.error(err)
  }
  };
  useEffect(()=>{
  getMovieList();
  
  },[])


  const deleteTodo = async(id)=>{
    const movieDoc =  doc(db, "Card", id)
    // console.log(id);
    await deleteDoc(movieDoc);
    window.location.reload()
  }

  return (
      <>

    <div className='container-fluid'>

    <div style={{padding : 8}}>
     <h3 style={{fontWeight : "bold" , color : "green"}}>Products</h3>
    </div>
    <div>
     
   
        <div>
        <br />
        <center>
         

          <h2>Add Card</h2><br />
        <input onChange={(e)=>setNewUrl(e.target.value)}  style={{borderColor : "green" , borderRadius : 5 }} type="text" placeholder='image url..'/><br /><br />
        <input  onChange={(e)=>setNewTitle(e.target.value)} style={{borderColor : "green" , borderRadius : 5 }} type="text" placeholder='Title'/><br /><br />
        <input onChange={(e)=>setNewDesc(e.target.value)} style={{borderColor : "green" , borderRadius : 5 }} type="text" placeholder='Description'/><br /><br />
        <input  onChange={(e)=>setNewPrice(Number(e.target.value))} style={{borderColor : "green" , borderRadius : 5 }} type="text" placeholder='Price'/><br /><br />
        <button onClick={onSubmitMovie} style={{border : "none" , background : "green" , color : "white",paddingLeft : 10 , paddingRight : 10 , borderRadius : 5 }}>Add</button>
        <br /><br />

        </center>
        <br /><br />
        <div>
          
  <h2 className='text-center' style={{color : "black"}}>Cards</h2><br />


<div  style={{display : "flex" , flexWrap : "wrap",justifyContent : "space-around"}}>
    {movieList.map((card)=>(
    <>
        <br /><br /><br />
     

      <div style={{border : "1px solid black" ,  width : 230 , justifyContent : "center",borderRadius : 10,marginTop : 10}}>
        <img style={{borderRadius : 10}} src={card.url} alt="image" height={150} width={230}/>
        <center>
        <h1 style={{color : "red" , fontFamily : "cursive"}}>{card.title}</h1>

        <p style={{fontSize : 14 , color : "black" , fontWeight : "bold"}}>{card.Desc}</p>
        <p style={{fontWeight : "bold"}}>price : {card.price}</p>
        <button style={{border : "none" , background : "green" , color : "white", paddingLeft : 10,paddingRight : 10 , borderRadius : 5}} onClick={()=> deleteTodo(card.id)}>Delete</button>
        </center>
<br />
      </div>
      
     
    </>
      
    ))}
    </div>
      
    
  </div>
        </div>

    </div>
    </div>
    </>
    
  );
  
}

export default App;
