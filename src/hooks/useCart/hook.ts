import { create } from "zustand";
import type { ComboType, Item } from "../../pages/index";


type CartEntry =
  | ({ type: "item"; count: number } & Item)
  | ({ type: "combo"; count: number } & ComboType);

type CartStore = {
  cart: CartEntry[];
  addItem: (item: Item) => void;
  addCombo: (combo: ComboType) => void;
  removeItem: (id: number,full:boolean) => void;
  removeCombo: (id: number,full:boolean) => void;
};

const useCart = create<CartStore>((set) => ({
  cart: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.cart.find(
        (e) => e.type === "item" && e.id === item.id
      );

      if (existing) {
        return {
          cart: state.cart.map((e) =>
            e.type === "item" && e.id === item.id
              ? { ...e, count: e.count + 1 }
              : e
          ),
        };
      }

      return {
        cart: [...state.cart, { ...item, type: "item", count: 1 }],
      };
    }),

  addCombo: (combo) =>
    set((state) => {
      const existing = state.cart.find(
        (e) => e.type === "combo" && e.id === combo.id
      );

      if (existing) {
        return {
          cart: state.cart.map((e) =>
            e.type === "combo" && e.id === combo.id
              ? { ...e, count: e.count + 1 }
              : e
          ),
        };
      }

      return {
        cart: [...state.cart, { ...combo, type: "combo", count: 1 }],
      };
    }),

  removeItem: (id,full) =>
    set((state) => ({
      cart: state.cart.flatMap((e) => {
        if (e.type === "item" && e.id === id) {
          if (e.count > 1 && full == false) {
            return [{ ...e, count: e.count - 1 }];
          }
          return []; // remove completamente
        }
        return [e];
      }),
    })),

  removeCombo: (id,full) =>
    set((state) => ({
      cart: state.cart.flatMap((e) => {
        if (e.type === "combo" && e.id === id) {
          if (e.count > 1 && full == false) {
            return [{ ...e, count: e.count - 1 }];
          }
          return [];
        }
        return [e];
      }),
    })),
}));

export default useCart