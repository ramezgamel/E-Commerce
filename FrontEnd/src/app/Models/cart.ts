interface Item {
  name: string, 
  image:string, 
  id:string, 
  price:number, 
  quantity: number
}
export interface Cart {
  items: Item[],
  totalQuantity: number, 
  totalPrice: number
}
