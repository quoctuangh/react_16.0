const { v4: uuidv4 } = require('uuid');
let items = [
        {
            id : uuidv4(),
            name: "Abc",
            level: 0 // 0 small 1 medium 2 high
        },
         {
            id : uuidv4(),
            name: "Def",
            level: 1 // 0 small 1 medium 2 high
        },
        {
            id : uuidv4(),
            name: "Ghj",
            level: 2 // 0 small 1 medium 2 high
        },
        {
            id : uuidv4(),
            name: "Ghj",
            level: 2 // 0 small 1 medium 2 high
        }
    ];

export default items;
