import { type Item, type ComboType } from "../../../pages/index";
import comboSpr from "../../../assets/bolsa-de-compras.svg";
import deleteSpr from "../../../assets/lixeira-xmark.svg";
import "./ItemDropList.css";
import { useCart } from "../../../hooks/useCart";

type props =
    | { type: "item"; count: number; obj: Item }
    | { type: "combo"; count: number; obj: ComboType };

function priceToFixedString(priceNum: number) {
    return `R$ ${priceNum.toFixed(2).replace(".", ",")}`;
}

function ItemDropList({ type, obj, count }: props) {
    const urlImg = type == "combo" ? comboSpr : obj.imgUrl;
    const value = type == "combo" ? obj.finalPrice : obj.price;
    const addItem = useCart((state) => state.addItem);
    const removeItem = useCart((state) => state.removeItem);
    const addCombo = useCart((state) => state.addCombo);
    const removeCombo = useCart((state) => state.removeCombo);
    return (
        <>
            <section className="DL-item">
                <img src={urlImg} alt="" />
                <div className="DL-item-info">
                    <h2>{obj.name}</h2>
                    <p>{priceToFixedString(value)}</p>
                </div>
            </section>
            <section className="DL-controls">
                <button onClick={() => {
                    const op = type == "item" ? addItem(obj) : addCombo(obj)
                    return op
                }}>+</button>
                <p className="DL-count">{count}</p>
                <button onClick={() => {
                    const op = type == "item" ? removeItem(obj.id,false) : removeCombo(obj.id,false)
                    return op
                }}>-</button>
                <button onClick={() => {
                    const op = type == "item" ? removeItem(obj.id,true) : removeCombo(obj.id,true)
                    return op
                }}>
                    <img className="DL-delete" src={deleteSpr} alt="" />
                </button>
            </section>
        </>
    );
}
export default ItemDropList;
