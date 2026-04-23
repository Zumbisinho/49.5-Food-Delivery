import addSpr from "../../../assets/adicionar.svg"
import { useCart } from "../../../hooks/useCart";
import {type ComboType} from "../index"

function priceToFixedString(priceNum:number){
        return `R$ ${priceNum.toFixed(2).replace('.',',')}`
}

function Combo({obj}:{obj:ComboType}){
    const desc = obj.itens.reduce((acc, item, i) => {
        const lastChar = i !== obj.itens.length - 1 ? ' + ' : '';
        return acc + item.name + lastChar; 
    }, "");
    const originalPrice = obj.itens.reduce((acc,item)=> acc + item.price, 0)
    const urlList = obj.itens.map(item => item.imgUrl)
    const addItem = useCart(state => state.addCombo)
    
    return(
        <>
            <section className="combo">
                <section className="img-sum">
                    {urlList.map((url,index) => <>
                        <img src={url} loading="lazy"></img>
                        {
                            index != urlList.length-1 && <h3>+</h3> // Fix unwanted plus
                        } 
                        
                    </>)}
                </section>
                <h2>{obj.name}</h2>
                <p>{desc}</p>
                <div>
                    <div>
                        <h5>{priceToFixedString(originalPrice)}</h5>
                        <h4>{priceToFixedString(obj.finalPrice)}</h4>
                    </div>
                    <button onClick={()=>{addItem(obj)}}><img src={addSpr} alt="" /></button>
                </div>
            </section>
        </>
    )
}
export default Combo