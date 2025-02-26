import { Exhibition } from './exhibition'
import { User } from './user'

// All slice states in one file
export interface CommonState {
   isShowModal: boolean
   isLoading: boolean
   openData: Exhibition[]
}

export interface MemberState {
   memberInfo: User
   isLogin: boolean
}

export interface DataState {
   filterRule: string
   exhibitionData: Exhibition[]
}
