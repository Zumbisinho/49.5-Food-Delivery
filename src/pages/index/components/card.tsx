import type { Item } from ".."
import addSpr from "../../../assets/adicionar.svg"
import { useCart } from "../../../hooks/useCart"
type CardProps = {
    item: Item
}


function Card({item}:CardProps){
    function priceToFixedString(priceNum:number){
        return `R$ ${priceNum.toFixed(2).replace('.',',')}`
    }
    
    const addItem = useCart(state => state.addItem)

    return (
        <>
            <section className="card">
                <img loading="lazy" src={item.imgUrl} alt="" className="card-img" />
                <h2>{item.name}</h2>
                <p>{item.desc}</p>
                <div>
                    <h4>{priceToFixedString(item.price)}</h4>
                    <button onClick={()=>{
                        addItem(item)
                    }}><img src={addSpr} alt="" /></button>
                </div>
            </section>
        </>
    )
}
export default Card