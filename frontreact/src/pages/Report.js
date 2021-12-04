import * as React from 'react';
import {FormattedMessage} from "react-intl";

import {Chart} from "../components/Chart";
import {getProductsService} from "../services/product";

export const Report = ({searchKey}) => {
  const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        const getProducts = async () => {
            const prods = await getProductsService(searchKey);
            setProducts(prods);
        };

        getProducts();
    }, [searchKey])

  return (
    <section id='report'>
      <div className='report-container'>
        <h1>
            <FormattedMessage id="unitsInStock"/>
        </h1>
        <br/>
        <div>
            <Chart data={products}/>
        </div>
      </div>
    </section>
  );
};
