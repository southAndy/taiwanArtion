// open source api
export interface ExhibitionResponse {
   id: number
   name: string
   description: string
   startDate: string
   endDate: string
   imageUrl: string
   location: string
   artist: string
   price: number
   status: string
   createdAt: string
   updatedAt: string
}

// firebase phone's auth api
export interface PhoneAuthResponse {
   idToken: string
}

// firebase sign in api
export interface SignInResponse {}

// google map api
export interface GoogleMapResponse {}
