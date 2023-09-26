how to install jest, run:

npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer

npm pkg set scripts.test=jest

how to make the concurrently package.json

cd ../
npm init -y
npm install --save-dev concurrently
npm pkg set scripts.dev="concurrently npm:dev:client npm:dev:server"
npm pkg set scripts.dev:client="cd client && npm run dev"
npm pkg set scripts.dev:server="cd server && npm run dev"
