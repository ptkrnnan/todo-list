import { app } from "./app.js"

app.listen({
    port: 3000,
    host: '0.0.0.0'
}).then(() => {
    console.log("Server Running!")
})