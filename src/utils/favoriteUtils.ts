import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase.config'

const STORAGE_KEY = 'favoriteExhibitions'

// 獲取收藏列表
export const getFavorites = () => {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    return []
  }

  try {
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error getting favorites:', error)
    return []
  }
}

// 檢查是否已收藏
export const isFavorited = exhibitionId => {
  const favorites = getFavorites()
  return favorites.includes(exhibitionId)
}

// 新增收藏
export const addToFavorites = exhibitionId => {
  try {
    const favorites = getFavorites()

    if (favorites.includes(exhibitionId)) {
      console.log('該展覽已收藏過了！')
      return false
    }

    favorites.push(exhibitionId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    console.log('展覽已加入收藏！')
    return true
  } catch (error) {
    console.error('Error adding to favorites:', error)
    return false
  }
}

// 移除收藏
export const removeFromFavorites = exhibitionId => {
  try {
    const favorites = getFavorites()
    const updatedFavorites = favorites.filter(id => id !== exhibitionId)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites))
    console.log('展覽已移除收藏！')
    return true
  } catch (error) {
    console.error('Error removing from favorites:', error)
    return false
  }
}

// 切換收藏狀態
export const toggleFavorite = exhibitionId => {
  return isFavorited(exhibitionId)
    ? removeFromFavorites(exhibitionId)
    : addToFavorites(exhibitionId)
}

// 同步到 Firebase
export const syncToFirebase = async (userId, exhibitionId, action = 'add') => {
  try {
    const userDoc = doc(db, 'users', userId)

    if (action === 'add') {
      await updateDoc(userDoc, {
        favorite: arrayUnion(exhibitionId),
      })
    } else {
      await updateDoc(userDoc, {
        favorite: arrayRemove(exhibitionId),
      })
    }

    return true
  } catch (error) {
    console.error('Error syncing to Firebase:', error)
    return false
  }
}

// 完整的切換收藏 (localStorage + Firebase)
export const toggleFavoriteWithSync = async (exhibitionId, userId = null) => {
  const wasAdded = !isFavorited(exhibitionId)
  const localSuccess = toggleFavorite(exhibitionId)

  if (localSuccess && userId) {
    await syncToFirebase(userId, exhibitionId, wasAdded ? 'add' : 'remove')
  }

  return localSuccess
}

// 根據收藏列表過濾展覽資料
export const filterFavoriteExhibitions = allExhibitions => {
  const favorites = getFavorites()
  return allExhibitions.filter(exhibition => favorites.includes(exhibition.UID))
}
