import React from "react";
import {useMemo} from "react";
import {Table} from "react-bootstrap";

interface Props {
  address: address[],
}

interface address {
  address1: string,
  address2: string,
  address3: string,
  kana1: string,
  kana2: string,
  kana3: string,
  prefcode: string,
  zipcode: string
}

const PostalCodeSearchTable = React.memo<Props>((props) => {


  const {address} = props;

  const table = useMemo(() => {
    return (
      <div className="PostalCodeSearchTable">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <td>郵便番号</td>
              <td>都道府県</td>
              <td>市区町村</td>
              <td>町域</td>
              <td>かな都道府県</td>
              <td>かな市区町村</td>
              <td>かな町域</td>
              <td>都道府県コード</td>
            </tr>
          </thead>
          <tbody>
            {address && address.length > 0 && address.map((address, index) => {
              return (<tr key={index}>
                <td>{address.zipcode}</td>
                <td>{address.address1}</td>
                <td>{address.address2}</td>
                <td>{address.address3}</td>
                <td>{address.kana1}</td>
                <td>{address.kana2}</td>
                <td>{address.kana3}</td>
                <td>{address.prefcode}</td>
              </tr>)
            })}

          </tbody>
        </Table>
      </div >
    );
  }, [address])

  return table;
});

export default PostalCodeSearchTable;
