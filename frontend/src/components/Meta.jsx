/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

function Meta({ title, description, keyword }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
    </Helmet>
  );
}
Meta.defaultProps = {
  title: "ProShop",
  description: "We sell best products for cheap",
  keyword: "electronics, buy electronics, cheap electronics",
};

export default Meta;
