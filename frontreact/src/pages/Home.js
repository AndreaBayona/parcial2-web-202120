import * as React from 'react';
import {getProductsService} from "../services/product";
import {Card} from "../components/Card";
import {FormattedMessage} from "react-intl";

export const Home = ({ searchKey }) => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
      const getProducts = async () => {
          const prods = await getProductsService(searchKey);
          setProducts(prods);
      };

      getProducts();
  }, [searchKey])

  return (
    <section id='home'>
      <div className='home-container'>
        <h1><FormattedMessage id="gallery"/></h1>
        <div className='home-card'>
            {products.map((p, index) =>
                <Card
                    key={index}
                    name={p.name}
                    picture={p.picture}
                    price={p.price}
                    isActive={p.isActive === "true"}
                />
                )}
        </div>
      </div>
    </section>
  );
};
