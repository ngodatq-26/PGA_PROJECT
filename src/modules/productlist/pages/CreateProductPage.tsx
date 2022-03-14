import React from 'react';
import MenuHeaderComponent from '../../common/components/MenuHeaderComponent';
import CreateProductForm from '../components/CreateProduct/CreateProductForm';
import '../styles/styleCreateProduct.css'

const CreateProductPage = () =>{
    return (
        <div style ={{display : 'flex',marginTop:'80px'}}>
           <MenuHeaderComponent />  
           <div style={{maxWidth : '100%',display:'flex',flex :'8'}}>
               <CreateProductForm />
            </div>
        </div>
    )
}

export default React.memo(CreateProductPage);