export default {
   preset: 'ts-jest', // Use ts-jest for TypeScript support
   transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
   },
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
}
