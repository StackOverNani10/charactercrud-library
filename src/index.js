const express = require('express');
const v1CharacterRouter = require("./v1/routes/characterRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/characters", v1CharacterRouter);

app.listen(PORT, () => { 
    console.log(`🚀 Server listening on port ${PORT}`); 
});
