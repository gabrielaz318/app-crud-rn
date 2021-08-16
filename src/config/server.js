import { Platform } from 'react-native'

const server = Platform.OS === 'ios' 
    ? 'http://192.168.137.1:3333' : 'http://192.168.137.1:3333'

export { server }