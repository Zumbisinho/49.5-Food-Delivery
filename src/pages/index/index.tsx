import Header from "../../components/Header/Header";
import Card from "./components/card";
import Combo from "./components/combos";
import "./index.css";
import allSpr from "../../assets/aplicativos.svg";
import combosSpr from "../../assets/cesta-de-compras.svg";
import motoSpr from "../../assets/motoboy.png";
import seguroSpr from "../../assets/verificacao-de-escudo.svg";
import coraçãoSpr from "../../assets/coracao.svg";
import { useState } from "react";
import { ToastContainer, Bounce } from "react-toastify";

const _categories = [
    "Todos",
    "Lanches",
    "Acompanhamentos",
    "Bebidas",
    "Sobremesas",
] as const;

export type Item = {
    name: string;
    desc: string;
    imgUrl: string;
    price: number;
    category: (typeof _categories)[number];
    id: number;
};
export type ComboType = {
    itens: Array<Item>;
    name: string;
    finalPrice: number;
    id: number;
};
// ! Lista Vibe-codada pq ninguem merece :)
const items: Item[] = [
    // Lanches (8)
    {
        name: "Hambúrguer Clássico",
        desc: "Pão brioche, carne bovina 180g, queijo cheddar, alface e molho especial",
        imgUrl: "https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png",
        price: 28.9,
        category: "Lanches",
        id: 1,
    },
    {
        name: "Cheeseburger Duplo",
        desc: "Dois hambúrgueres, cheddar duplo e molho da casa",
        imgUrl: "https://png.pngtree.com/png-clipart/20250501/original/pngtree-double-decker-cheeseburger-savory-beef-tangy-pickles-delicious-meal-png-image_20923558.png",
        price: 34.9,
        category: "Lanches",
        id: 2,
    },
    {
        name: "X-Bacon",
        desc: "Hambúrguer 180g, bacon crocante, queijo e maionese especial",
        imgUrl: "https://s3-sa-east-1.amazonaws.com/deliveryon-uploads/products/mega/67_608e17a1013c4.png",
        price: 32.5,
        category: "Lanches",
        id: 3,
    },
    {
        name: "X-Salada",
        desc: "Hambúrguer, queijo, tomate, alface e maionese",
        imgUrl: "https://i.pinimg.com/originals/16/e4/09/16e409146a92ed32ee096285f1867825.png",
        price: 27.0,
        category: "Lanches",
        id: 4,
    },
    {
        name: "Chicken Crispy",
        desc: "Filé de frango empanado, alface e molho ranch",
        imgUrl: "https://www.bobs.com.br/media/filer_public_thumbnails/filer_public/06/fe/06fe6c25-aa2d-44df-a7e9-0ee0d2abb8f1/baconzudo-chicken-crispy-gergelim_x400.png__1200x630_subsampling-2_upscale.png",
        price: 29.9,
        category: "Lanches",
        id: 5,
    },
    {
        name: "Hambúrguer Vegano",
        desc: "Hambúrguer vegetal, tomate, alface e molho vegano",
        imgUrl: "https://www.bobs.com.br/media/filer_public_thumbnails/filer_public/4e/8b/4e8b180f-3b3a-42ea-91cd-7159b5f7b0bc/036_bobs_altualizacao_cardapio_site_610x400_bigbob_veggiecarne.png__1200x630_subsampling-2_upscale.png",
        price: 30.0,
        category: "Lanches",
        id: 6,
    },
    {
        name: "X-Tudo",
        desc: "Hambúrguer, bacon, ovo, queijo, presunto e salada",
        imgUrl: "https://padariasantacruz.loji.com.br/storage/uploads/NeDNbSzo4Uk2iSlSqLH2mArQq3JzZfHd7KNLyBAP.png",
        price: 36.9,
        category: "Lanches",
        id: 7,
    },
    {
        name: "Smash Burger",
        desc: "Hambúrguer prensado, queijo cheddar e molho especial",
        imgUrl: "https://streetsmash.com/wp-content/uploads/2025/09/Street_Smash_Burgers_Products_Street_Burger.png",
        price: 26.5,
        category: "Lanches",
        id: 8,
    },

    // Acompanhamentos (6)
    {
        name: "Batata Frita Grande",
        desc: "Porção generosa de batatas crocantes com sal",
        imgUrl: "https://petiscoseciaalimentos.com.br/wp-content/uploads/2021/10/batata-frita.png",
        price: 15.5,
        category: "Acompanhamentos",
        id: 9,
    },
    {
        name: "Batata com Cheddar e Bacon",
        desc: "Batata frita coberta com cheddar cremoso e bacon",
        imgUrl: "https://www.falkaolanches.com.br/wp-content/uploads/2022/05/FE509754-1.png",
        price: 22.0,
        category: "Acompanhamentos",
        id: 10,
    },
    {
        name: "Onion Rings",
        desc: "Anéis de cebola empanados e crocantes",
        imgUrl: "https://alloydeliveryimages.s3.sa-east-1.amazonaws.com/item_images/9809/662ad646592d3l5yzi.webp",
        price: 18.9,
        category: "Acompanhamentos",
        id: 11,
    },
    {
        name: "Nuggets",
        desc: "10 unidades de nuggets crocantes",
        imgUrl: "https://www.falkaolanches.com.br/wp-content/uploads/2022/05/2-2.png",
        price: 17.0,
        category: "Acompanhamentos",
        id: 12,
    },
    {
        name: "Batata Rústica",
        desc: "Batatas temperadas com ervas finas",
        imgUrl: "https://www.eatme.com.br/cdn/shop/files/LEGBATATAINGLESAPNG.png?v=1735483889",
        price: 19.5,
        category: "Acompanhamentos",
        id: 13,
    },
    {
        name: "Mandioca Frita",
        desc: "Mandioca crocante por fora e macia por dentro",
        imgUrl: "https://png.pngtree.com/png-clipart/20240318/original/pngtree-cheese-fried-cassava-png-image_14621507.png",
        price: 16.5,
        category: "Acompanhamentos",
        id: 14,
    },

    // Bebidas (4)
    {
        name: "Refrigerante Lata",
        desc: "Coca-Cola, Guaraná ou Fanta",
        imgUrl: "https://coopsp.vtexassets.com/arquivos/ids/249047-800-auto?v=638937351715370000&width=800&height=auto&aspect=true",
        price: 7.5,
        category: "Bebidas",
        id: 15,
    },
    {
        name: "Suco Natural",
        desc: "Laranja, limão ou maracujá",
        imgUrl: "https://redemix.vteximg.com.br/arquivos/ids/223324-1000-1000/945979-1-19-03-2025-11-35-09-974.png?v=638882643587670000",
        price: 9.0,
        category: "Bebidas",
        id: 16,
    },
    {
        name: "Milkshake",
        desc: "Chocolate, morango ou baunilha",
        imgUrl: "https://soleneve.com.br/wp-content/uploads/2024/09/sobremesas-milkshake-leite-trufado.webp",
        price: 14.9,
        category: "Bebidas",
        id: 17,
    },
    {
        name: "Água Mineral",
        desc: "Com ou sem gás",
        imgUrl: "https://fortatacadista.vteximg.com.br/arquivos/ids/161041-1000-1000/AGUA-MIN.DA-PEDRA-500ML-S-GAS-PET---1587285.jpg?v=637437439447630000",
        price: 5.0,
        category: "Bebidas",
        id: 18,
    },

    // Sobremesas (3)
    {
        name: "Brownie",
        desc: "Brownie de chocolate com calda",
        imgUrl: "https://ovomaltineprofissional.com.br/storage/produtos/56/avatar/jt70d2EdfRno2HjwTEV9oQVgdci16ZMZEyOHD6Qb.png",
        price: 12.0,
        category: "Sobremesas",
        id: 19,
    },
    {
        name: "Sorvete",
        desc: "1 Cone - chocolate, creme ou morango",
        imgUrl: "https://www.mrmixbrasil.com.br/arquivos-upload/produtos/casquinha-de-chocolate-05022021111624517024.png",
        price: 10.0,
        category: "Sobremesas",
        id: 20,
    },
    {
        name: "Petit Gateau",
        desc: "Bolo quente com recheio de chocolate e sorvete",
        imgUrl: "https://www.gebon.com.br/image/media/_00200/268/gmax-petit-gateau.png",
        price: 16.9,
        category: "Sobremesas",
        id: 21,
    },
];
const combos: ComboType[] = [
    {
        name: "Combo Clássico",
        itens: [items[0], items[8], items[14]], // Hambúrguer + Batata + Refri
        finalPrice: 47.0,
        id: 1,
    },
    {
        name: "Combo Duplo",
        itens: [items[1], items[9], items[14]], // Cheeseburger + Batata cheddar + Refri
        finalPrice: 58.0,
        id: 2,
    },
    {
        name: "Combo Bacon Lovers",
        itens: [items[2], items[8], items[16]], // X-Bacon + Batata + Milkshake
        finalPrice: 54.0,
        id: 3,
    },
    {
        name: "Combo Leve",
        itens: [items[3], items[15]], // X-Salada + Suco
        finalPrice: 33.0,
        id: 4,
    },
    {
        name: "Combo Frango",
        itens: [items[4], items[10], items[14]], // Chicken + Onion Rings + Refri
        finalPrice: 49.5,
        id: 5,
    },
    {
        name: "Combo Vegano",
        itens: [items[5], items[12], items[15]], // Vegano + Batata rústica + Suco
        finalPrice: 52.0,
        id: 6,
    },
    {
        name: "Combo Família",
        itens: [items[6], items[7], items[8], items[14]], // X-Tudo + Smash + Batata + Refri
        finalPrice: 78.0,
        id: 7,
    },
    {
        name: "Combo Doce Final",
        itens: [items[0], items[8], items[18]], // Hambúrguer + Batata + Brownie
        finalPrice: 50.0,
        id: 8,
    },
    {
        name: "Combo Completo",
        itens: [items[2], items[9], items[16], items[19]], // X-Bacon + Batata cheddar + Milkshake + Sorvete
        finalPrice: 69.0,
        id: 9,
    },
    {
        name: "Combo Econômico",
        itens: [items[7], items[14]], // Smash + Refri
        finalPrice: 31.0,
        id: 10,
    },
];

interface FactProps {
    name: string;
    desc: string;
    imgUrl: string;
}

function Fact({ desc, imgUrl, name }: FactProps) {
    return (
        <section className="fact-card">
            <img src={imgUrl} alt={name} />
            <div className="fact-info">
                <h2>{name}</h2>
                <p>{desc}</p>
            </div>
        </section>
    );
}
function AllItems() {
    const [categoriaAtiva, setCategoriaAtiva] = useState<
        "Todos" | "Lanches" | "Acompanhamentos" | "Bebidas" | "Sobremesas"
    >("Todos");
    const itensFiltrados = items.filter((item) => {
        if (categoriaAtiva === "Todos") return true;
        return item.category === categoriaAtiva;
    });
    return (
        <>
            <section className="select-menu enable-scroll">
                <span
                    className={categoriaAtiva === "Todos" ? "active" : ""}
                    onClick={() => setCategoriaAtiva("Todos")}
                >
                    <img src={allSpr} alt="" />
                    <p>Todos</p>
                </span>
                <span
                    className={categoriaAtiva === "Lanches" ? "active" : ""}
                    onClick={() => setCategoriaAtiva("Lanches")}
                >
                    <p>Lanches</p>
                </span>
                <span
                    className={
                        categoriaAtiva === "Acompanhamentos" ? "active" : ""
                    }
                    onClick={() => setCategoriaAtiva("Acompanhamentos")}
                >
                    <p>Acompanhamentos</p>
                </span>
                <span
                    className={categoriaAtiva === "Bebidas" ? "active" : ""}
                    onClick={() => setCategoriaAtiva("Bebidas")}
                >
                    <p>Bebidas</p>
                </span>
                <span
                    className={categoriaAtiva === "Sobremesas" ? "active" : ""}
                    onClick={() => setCategoriaAtiva("Sobremesas")}
                >
                    <p>Sobremesas</p>
                </span>
            </section>
            <section className="itens enable-scroll">
                {itensFiltrados.map((item) => (
                    <Card key={item.id} item={item} />
                ))}
            </section>
        </>
    );
}

function Index() {
    return (
        <>
            <Header />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
                
            />
            <main>
                <div className="select-wrapper">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                        alt=""
                    />
                    <h2>Selecione o seu pedido:</h2>
                </div>
                <span className="divisor"></span>
                <AllItems></AllItems>
                <div className="select-wrapper">
                    <img src={combosSpr} alt="" />
                    <h2>Combos Econômicos:</h2>
                </div>
                <span className="divisor"></span>
                <section className="combos enable-scroll">
                    {combos.map((item)=>{
                        return <Combo obj={item} key={item.id}/>
                    })}
                </section>
                <section className="facts">
                    <Fact
                        name="Entrega rápida"
                        desc="Chega rápido e quentinho em sua casa"
                        imgUrl={motoSpr}
                    />
                    <Fact
                        name="Compra segura"
                        desc="Dados protegidos e pedido entregue"
                        imgUrl={seguroSpr}
                    />
                    <Fact
                        name="Feito com carinho"
                        desc="Ingredientes selecionados pela qualidade"
                        imgUrl={coraçãoSpr}
                    />
                </section>
            </main>
            <footer>
                <p>© 2026 49,5 Food - Todos os direitos reservados</p>
            </footer>
        </>
    );
}
export default Index;
