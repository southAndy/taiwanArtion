import category1 from "./categoryicon1.png";
import category2 from "./categoryicon2.png";
import category3 from "./categoryicon3.png";
import category4 from "./categoryicon4.png";
import category5 from "./categoryicon5.png";
import category6 from "./categoryicon6.png";
import category7 from "./categoryicon7.png";
import category8 from "./categoryicon8.png";
import category9 from "./categoryicon9.png";
import category10 from "./categoryicon10.png";


const categoryList = []

function addImage(){
    for(let time =0;time<9;time++){
        categoryList.push(category[time+1])
    }
}

export {categoryList}