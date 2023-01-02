export interface IProduct {
  _id:string
  name: string
  quantity: number
  category: string
  desc: string
  price: number
  /////////
  brand?: string
  sold?: number
  subCategories?: string[]
  // Optional
  colors?: string[],
  images?: string[],
  coverImage?: string
  priceAfterDiscount?: number
  ratingAverage?: number
  ratingQuantity?: number

}
