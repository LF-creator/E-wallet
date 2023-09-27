import Card from "../card/Card";


const AddCard = () => {
  return (
    <>
      <h1 style={{
      display: "flex;",
      justifyContent:"center",
      color:"lightgrey",
      fontSize:"50px",
      fontFamily:"sans-serif",
      fontWeight:"bold",
      fontStyle:"italic",
      textShadow:"2px 2px 4px #000000",
      padding:"10px",
      margin:"10px",
      
      borderRadius:"10px",
      marginLeft:"35%",
      
      

      }}>
      
      ADD A NEW BANK CARD</h1>

      <Card  />
    </>
  );
};

export default AddCard;