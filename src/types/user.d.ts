export interface User {
   uid: string
   name: string
   email: string
   photoIndex: number
   favorite: string[]
   gender?: 'male' | 'female' | 'other'
   birthday?: string
   interests?: string[]
}
